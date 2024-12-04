import React from 'react';
import styles from './Navigation.module.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import UserApi from '../../entities/user/UserApi';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import Footer from '../Footer/Footer';

export default function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  //NOTE - метод для выхода юзера (чистит куку, сбрасывает состояние юзера)
  const signOutHandler = async () => {
    try {
      const { statusCode, error, message } = await UserApi.signOut();
      if (error) {
        antMessage.error(error);
        return;
      }

      antMessage.success(message);
      if (statusCode === 200) {
        setAccessToken('');
        setUser(null);
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    }
  };

  //NOTE - в верстке есть опциональное отражение элементов в зависимости от наличия юзера в стейте
  return (
    <div>
      <div className={styles.container}>
        {/* <Button text='main' onClick={() => navigate('/')} /> */}

        {user && (
          <>
            <span>{user.username}</span>{' '}
            <Button text='signOut' onClick={signOutHandler} />{' '}
            <Link to='/tasks'>
              <Button text='Tasks' />
            </Link>
          </>
        )}

        <Link to='/initiatives'>
          <Button text='Initiatives' />
        </Link>

        {!user && (
          <>
            <Link to='/signin'>
              <Button text='Signin' />
            </Link>

            <Link to='/signup'>
              <Button text='Signup' />
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to='/signOut'>
              <Button text='SignOut' />
            </Link>
          </>
        )}
      </div>
      <Outlet />
      
      <Footer/>
    </div>
  );
}
