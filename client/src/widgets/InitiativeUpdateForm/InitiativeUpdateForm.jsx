import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import InitiativeApi from '../../entities/initiative/InitiativeApi';

export default function InitiativeUpdateForm({
  user,
  initiative,
  setInitiatives,
  setLoading,
  setShowUpdateForm,
}) {
  const [inputs, setInputs] = useState({ title: initiative?.title, body: initiative?.body });

  const isEmptyFormData =
    inputs.title.trim().length === 0 || inputs.body.trim().length === 0;

  function changeInputsHandler({ target }) {
    const { value, name } = target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  async function sendUpdatedInitiative() {
    if (user.id !== initiative?.userId) {
      antMessage.error(`No rights to update initiative with id ${initiative?.id}`);
      return;
    }
    if (isEmptyFormData) {
      antMessage.error('Все поля обязательны к заполнению');
      return;
    }
    setLoading(true);
    try {
      const { data, message, error, statusCode } = await InitiativeApi.updateInitiativeById(
        initiative.id,
        inputs
      );
      if (error) {
        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 200) {
        setInitiatives((prev) => prev.map((el) => (el.id === data.id ? data : el)));
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
      <Button text='Сохранить' onClick={sendUpdatedInitiative} />
    </div>
  );
}
