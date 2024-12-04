import HedgehogsPage from '../pages/HedgehogsPage/HedgehogsPage';
import TasksPage from '../pages/TasksPage/TasksPage';
import MainPage from '../pages/MainPage/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from '../widgets/Navigation/Navigation';
import OneTaskPage from '../pages/OneTaskPage/OneTaskPage';
import SignInPage from '../pages/SignInPage/SignInPage.jsx';
import SignUpPage from '../pages/SignUpPage/SignUpPage.jsx';
import { useEffect, useState } from 'react';
import UserApi from '../entities/user/UserApi.js';
import { setAccessToken } from '../shared/lib/axiosInstance.js';

function App() {
  //NOTE - состояние user заведено в корневом компоненте, чтобы иметь возможность прокинуть его в любую точку приложения
  const [user, setUser] = useState(null);

  //NOTE - постоянный перезапрос данных по юзеру и токену
  useEffect(() => {
    UserApi.refreshTokens()
      .then(({ error, data, statusCode }) => {
        if (error) {
          setUser(null);
          return;
        }
        if (statusCode === 200) {
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);

  //NOTE - юзера можно прокидывать вниз по роутингу
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation user={user} setUser={setUser} />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/signin', element: <SignInPage setUser={setUser} /> },
        { path: '/signup', element: <SignUpPage setUser={setUser} /> },
        {
          path: '/tasks',
          element: user ? (
            <TasksPage user={user} />
          ) : (
            <SignInPage setUser={setUser} />
          ),
        },
        { path: '/tasks/:id', element: <OneTaskPage /> },
        { path: '/hedgehogs', element: <HedgehogsPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
