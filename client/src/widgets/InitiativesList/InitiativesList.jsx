import React from 'react';
import Button from '../../shared/ui/Button/Button';
import InitiativeCard from '../InitiativeCard/InitiativeCard';

export default function InitiativesList({ initiatives, setInitiatives, user }) {
  return (
    <div>
      {console.log(initiatives)}
      {initiatives?.length !== 0 ? (
        initiatives?.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} setInitiatives={setInitiatives} user={user} />
        ))
      ) : (
        <h3>Нет данных по задачам</h3>
      )}
    </div>
  );
}
