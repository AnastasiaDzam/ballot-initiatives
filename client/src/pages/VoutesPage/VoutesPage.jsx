import React, { useContext, useEffect, useState } from "react";
// import { axiosRequest } from "../../shared/lib/axiosInstance";
import OneInitiativePage from "../OneInitiativePage/OneInitiativePage";
// import { AppContext } from "../../app/AppContext";
import "./VoutesPage.css";
import { Link } from "react-router-dom";

function VotesPage({ initiatives, setInitiatives, user }) {
  return (
    <div className="favorite">
      <h1 className="favorite__title">Ваши голоса</h1>
      {user ? (
        <div className="initiatives-page-card-container">
          {initiatives &&
            initiatives.map((initiative) => {
              const isLiked = initiative.InitiativeLikes?.some(
                (t) => t.userId === user?.id || false
              );
              if (isLiked) {
                return (
                  <OneInitiativePage
                    initiative={initiative}
                    key={initiative.id}
                    setInitiatives={setInitiatives}
                    user={user}
                    flag={isLiked}
                    className="initiative-card"
                  />
                );
              }
              return null;
            })}
        </div>
      ) : (
        <div>
          <h2>Голосов нет</h2>
          <p>
            {`Давай `}
            <Link to={`/signUp`}>Зарегистриуемся?</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default VotesPage;
