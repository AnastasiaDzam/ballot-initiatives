/* eslint-disable react/prop-types */
import styles from "./InitiativeCard.module.css";
import React, { useEffect, useState } from "react";
import Button from "../../shared/ui/Button/Button";
import { message as antMessage } from "antd";
import InitiativeApi from "../../entities/initiative/InitiativeApi";
import UserApi from "../../entities/user/UserApi";
import InitiativeUpdateForm from "../InitiativeUpdateForm/InitiativeUpdateForm";
import { useNavigate } from "react-router-dom";

export default function InitiativeCard({ initiative, setInitiatives, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  async function deleteInitiativeHandler() {
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

  return (
    <div className={styles.container} key={initiative?.id}>
      <span>{initiative?.title}</span>
      {/* <span>{initiative?.content}</span> */}
      <span>{initiative?.level}</span>
      <Button text="Подробнее" color="blue" onClick={redirectButtonHandler} />

      {user && user.id === initiative?.user_id && (
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
