import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// historyの型をimport
import * as H from 'history';
import { auth } from '../../firebase';
import styles from './Header.module.scss';

interface PropTypes {
  history: H.History;
}

// historyのみをpropsから抜き出す場合にinterfaceにてhistoryの型を定義する
const Header: React.FC<PropTypes> = ({ history }) => {
  const handleSignOut = async () => {
    try {
      // サインアウト処理
      await auth.signOut();
      history.push('user-auth');
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className={styles.root}>
      <AppBar position='static' className={styles.app_bar}>
        <Toolbar className={styles.tool_bar}>
          <Typography variant='h6' className={styles.title}>
            Redux Toolkit Todo
          </Typography>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
