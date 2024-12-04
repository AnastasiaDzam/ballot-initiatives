import { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { message as antMessage } from 'antd';
import InitiativeApi from '../../entities/initiative/InitiativeApi';

export default function InitiativeForm({ setInitiatives, setLoading }) {
  const [inputs, setInputs] = useState({ title: '', body: '' });

  function onChangeHandler(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const isEmptyFormData =
    inputs.title.trim().length === 0 || inputs.body.trim().length === 0;

  console.log(isEmptyFormData);

  async function createInitiativeHandler() {
    if (isEmptyFormData) {
      antMessage.error('Все поля обязательны к заполнению');
      return;
    }
    setLoading(true);
    try {
      const { data, message, error, statusCode } = await InitiativeApi.createInitiative(
        inputs
      );
      // const response = await fetch('/api/initiatives', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   body: JSON.stringify(inputs),
      // });
      // const { data, message, error, statusCode } = await response.json();

      if (error) {
        antMessage.error(error);
        return;
      }
      // console.log(data);
      antMessage.success(message);
      if (statusCode === 201) {
        setInitiatives((prev) => [...prev, data]);
        setInputs({ title: '', body: '' });
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
      <input value={inputs.title} name='title' onChange={onChangeHandler} />
      <input value={inputs.body} name='body' onChange={onChangeHandler} />
      <Button
        text='Создать'
        color='green'
        onClick={createInitiativeHandler}
        disabled={isEmptyFormData}
      />
    </div>
  );
}
