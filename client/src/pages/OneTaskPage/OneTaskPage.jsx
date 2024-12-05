import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskApi from '../../entities/task/TaskApi';
import { message as antMessage } from 'antd';

export default function OneTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TaskApi.getTaskById(+id)
      .then(({ statusCode, data, error, message }) => {
        if (error) {
          antMessage.error(error);
          return;
        }
        antMessage.success(message);
        if (statusCode === 200) {
          setTask(data);
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
      {task && <div>{task.title}</div>}
    </div>
  );
}
