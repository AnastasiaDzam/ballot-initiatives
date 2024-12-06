
import styles from './InitiativeCard.module.css';
import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import InitiativeApi from '../../entities/initiative/InitiativeApi';
import InitiativeUpdateForm from '../InitiativeUpdateForm/InitiativeUpdateForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function InitiativeCard({ initiative, setInitiatives, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isVote, setIsVote] = useState(false);

  async function deleteInitiativeHandler(title) {

    if (user.id !== initiative?.user_id) {
      antMessage.error(
        `У вас нет прав на удаление инициативы с id ${initiative?.id}`
      );
      return;
    }
    setLoading(true);
    try {
      const { data, message, error, statusCode } =
        await InitiativeApi.deleteInitiativeById(initiative?.id);

      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 200) {
        setInitiatives((prev) => [...prev].filter((el) => el.id !== data?.id));
        antMessage.success(message);
      }
    } catch (err) {
      antMessage.error(err.message);
      console.error(err);
    } finally {
      antMessage.info("Загрузка завершена");
      setLoading(false);
    }
  }

  function redirectButtonHandler() {
    navigate(`/initiatives/${initiative?.content}/`);
    // antMessage.success(initiative.content)
  }

  const handleToggleVote = async () => {
    try {
      if (isVote) {
        await InitiativeApi.deleteFromVote(initiative.id);
      } else {
        await InitiativeApi.addToVote(initiative.id);
      }
      setIsVote((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    navigate(`/initiative/${initiative.id}`);
  };

useEffect(()=> {
  InitiativeApi.getVoteByInitiativeId(initiative.id)
  .then (({statusCode})=> {
    if (statusCode === 200){
      setIsVote(true)
    }
  })
},[])


  return (
    <div className={styles.container} key={initiative?.id}>
      <span>{initiative?.title}</span>

      <span>{initiative?.content}</span>
      <Button text='Подробнее' color='blue' onClick={redirectButtonHandler} />
      <div>
      <a onClick={handleClick}>
      </a>
      <button onClick={handleToggleVote}>{isVote ? "✔️" : "➕"}</button>
    </div>



      {user?.id === initiative?.user_id && (
        <>
          <Button
            text="Удалить"
            color="red"
            onClick={deleteInitiativeHandler}
            loading={loading} // Чтобы показать индикатор загрузки на кнопке
          />
          <Button
            text={showUpdateForm ? "Скрыть" : "Изменить"}
            color="#1a1a68"
            onClick={() => setShowUpdateForm((prev) => !prev)}
          />
        </>
      )}

      {showUpdateForm && user?.id === initiative?.user_id && (
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

