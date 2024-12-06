/* eslint-disable react/prop-types */
import React from "react";
import Button from "../../shared/ui/Button/Button";
import InitiativeCard from "../InitiativeCard/InitiativeCard";
import styles from "../InitiativeCard/InitiativeCard.module.css";

export default function InitiativesList({ initiatives, setInitiatives, user, setViewInit }) {

  return (
    <div className={styles.container_in}>
      {/* {console.log(initiatives)} */}
      {initiatives?.length !== 0 ? (
        initiatives?.map((initiative) => (
          <InitiativeCard
            key={initiative?.id}
            initiative={initiative}
            setInitiatives={setInitiatives}
            user={user}
            setViewInit={setViewInit}
          />
        ))
      ) : (
        <h3>Нет данных по задачам</h3>
      )}
    </div>
  );
}
