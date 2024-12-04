import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import TaskApi from '../../entities/task/TaskApi';

export default function TaskUpdateForm({
  user,
  task,
  setTasks,
  setLoading,
  setShowUpdateForm,
}) {
  const [inputs, setInputs] = useState({ title: task.title, body: task.body });

  const isEmptyFormData =
    inputs.title.trim().length === 0 || inputs.body.trim().length === 0;

  function changeInputsHandler({ target }) {
    const { value, name } = target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  async function sendUpdatedTask() {
    if (user.id !== task.userId) {
      antMessage.error(`No rights to update task with id ${task.id}`);
      return;
    }
    if (isEmptyFormData) {
      antMessage.error('Все поля обязательны к заполнению');
      return;
    }
    setLoading(true);
    try {
      const { data, message, error, statusCode } = await TaskApi.updateTaskById(
        task.id,
        inputs
      );
      if (error) {
        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 200) {
        setTasks((prev) => prev.map((el) => (el.id === data.id ? data : el)));
        setInputs({ title: '', body: '' });
        setShowUpdateForm(false);
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        name='title'
        value={inputs.title}
        placeholder='title'
        onChange={changeInputsHandler}
      />
      <input
        name='body'
        value={inputs.body}
        placeholder='body'
        onChange={changeInputsHandler}
      />
      <Button text='Сохранить' onClick={sendUpdatedTask} />
    </div>
  );
}
