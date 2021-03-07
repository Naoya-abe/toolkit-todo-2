import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Header from './components/header/Header';
import TaskForm from './features/task/taskForm/TaskForm';
import TaskList from './features/task/taskList/TaskList';
import { fetchTasks } from './features/task/taskSlice';
import { AppDispatch } from './app/store';
import styles from './App.module.scss';

import { auth } from './firebase';

const App: React.FC<RouteComponentProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // 現在サインインしているかの確認
    auth.onAuthStateChanged((user) => {
      // サインインしていないならばhistory.pushを用いて強制的に'/user-auth'に遷移させる
      !user && props.history.push('user-auth');
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchTasks());
    };
    getData();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header history={props.history} />
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
