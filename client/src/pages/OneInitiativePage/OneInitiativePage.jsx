import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InitiativeApi from '../../entities/initiative/InitiativeApi';
import { message as antMessage } from 'antd';

export default function OneInitiativePage() {
  const { id } = useParams();
  const [initiative, setInitiative] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    InitiativeApi.getInitiativeById(+id)
      .then(({ statusCode, data, error, message }) => {
        if (error) {
          antMessage.error(error);
          return;
        }
        antMessage.success(message);
        if (statusCode === 200) {
          setInitiative(data);
        }
      })
      .catch((err) => {
        console.log(err);
        antMessage.error(err.message);
      })
      .finally(() => {
        antMessage.info('Загрузка завершена');
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading && <h3>Загрузка...</h3>}
      {initiative && <div>{initiative.title}</div>}
    </div>
  );
}
