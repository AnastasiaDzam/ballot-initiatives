// import UserPage from "../pages/UserPage/UserPage";
import InitiativesPage from "../pages/InitiativesPage/InitiativesPage.jsx";
import MainPage from "../pages/MainPage/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "../widgets/Navigation/Navigation";
import OneInitiativePage from "../pages/OneInitiativePage/OneInitiativePage";
import SignInPage from "../pages/SignInPage/SignInPage.jsx";
import SignUpPage from "../pages/SignUpPage/SignUpPage.jsx";
import { useEffect, useState } from "react";
import UserApi from "../entities/user/UserApi.js";
import { setAccessToken } from "../shared/lib/axiosInstance.js";
import VotesPage from "../pages/VoutesPage/VoutesPage.jsx";

function App() {
  const [user, setUser] = useState(null);
  // const [vote, setVote] = useState(null);
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
      path: "/",
      element: <Navigation user={user} setUser={setUser} />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/signin", element: <SignInPage setUser={setUser} /> },
        { path: "/signup", element: <SignUpPage setUser={setUser} /> },
<<<<<<< HEAD
        { path: "/initiatives", element: <InitiativesPage user={user} /> },
=======
        {
          path: "/votes",
          element: <VotesPage user={user}/>,
        },
        {
          path: "/initiatives",
          element: <InitiativesPage user={user}/>,
        },
>>>>>>> c515e38e950fb8a3b514a727d898259e88945556
        { path: "/initiatives/:id", element: <OneInitiativePage /> },
        // { path: "/user", element: <UserPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
