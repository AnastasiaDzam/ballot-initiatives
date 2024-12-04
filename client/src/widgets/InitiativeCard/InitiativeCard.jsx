import styles from './InitiativeCard.module.css';
import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import InitiativeApi from '../../entities/initiative/InitiativeApi';
import InitiativeUpdateForm from '../InitiativeUpdateForm/InitiativeUpdateForm';
import { useNavigate } from 'react-router-dom';

export default function InitiativeCard({ initiative, setInitiatives, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  async function deleteInitiativeHandler(title) {
    if (user.id !== initiative.userId) {
      antMessage.error(`No rights to delete initiative with id ${initiative.id}`);
      return;
    }
    setLoading(true);
    try {
      // const response = await fetch(`/api/initiatives/${initiative.id}`, {
      //   method: 'DELETE',
      // });

      // const { data, message, error, statusCode } = await response.json();
      const { data, message, error, statusCode } = await InitiativeApi.deleteInitiativeById(
        initiative.id
      );

      console.log(data);

      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 200) {
        setInitiatives((prev) => [...prev].filter((el) => el.id !== data.id));
        antMessage.success(message);
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      antMessage.info('Загрузка завершена');
      setLoading(false);
    }
  }

  function redirectButtonHandler() {
    navigate(`/initiatives/${initiative.id}`);
  }

  return (
    <div className={styles.container} key={initiative.title}>
      <span>{initiative.title}</span>
      <span>{initiative.body}</span>
      <Button text='Подробнее' color='blue' onClick={redirectButtonHandler} />
      {user.id === initiative.userId && (
        <>
          <Button
            text='Удалить'
            color='red'
            onClick={() => deleteInitiativeHandler(initiative.title)}
          />
          <Button
            text={showUpdateForm ? 'Скрыть' : 'Изменить'}
            color='orange'
            onClick={() => setShowUpdateForm((prev) => !prev)}
          />
        </>
      )}
      {showUpdateForm && user.id === initiative.userId && (
        <InitiativeUpdateForm
          user={user}
          initiative={initiative}
          setInitiatives={setInitiatives}
          setLoading={setLoading}
          setShowUpdateForm={setShowUpdateForm}
        />
      )}
    </div>
  );
}
