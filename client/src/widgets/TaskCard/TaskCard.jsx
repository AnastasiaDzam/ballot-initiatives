import styles from './TaskCard.module.css';
import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import TaskApi from '../../entities/task/TaskApi';
import TaskUpdateForm from '../TaskUpdateForm/TaskUpdateForm';
import { useNavigate } from 'react-router-dom';

export default function TaskCard({ task, setTasks, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  async function deleteTaskHandler(title) {
    if (user.id !== task.userId) {
      antMessage.error(`No rights to delete task with id ${task.id}`);
      return;
    }
    setLoading(true);
    try {
      // const response = await fetch(`/api/tasks/${task.id}`, {
      //   method: 'DELETE',
      // });

      // const { data, message, error, statusCode } = await response.json();
      const { data, message, error, statusCode } = await TaskApi.deleteTaskById(
        task.id
      );

      console.log(data);

      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 200) {
        setTasks((prev) => [...prev].filter((el) => el.id !== data.id));
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
    navigate(`/tasks/${task.id}`);
  }

  return (
    <div className={styles.container} key={task.title}>
      <span>{task.title}</span>
      <span>{task.body}</span>
      <Button text='Подробнее' color='blue' onClick={redirectButtonHandler} />
      {user.id === task.userId && (
        <>
          <Button
            text='Удалить'
            color='red'
            onClick={() => deleteTaskHandler(task.title)}
          />
          <Button
            text={showUpdateForm ? 'Скрыть' : 'Изменить'}
            color='orange'
            onClick={() => setShowUpdateForm((prev) => !prev)}
          />
        </>
      )}
      {showUpdateForm && user.id === task.userId && (
        <TaskUpdateForm
          user={user}
          task={task}
          setTasks={setTasks}
          setLoading={setLoading}
          setShowUpdateForm={setShowUpdateForm}
        />
      )}
    </div>
  );
}
