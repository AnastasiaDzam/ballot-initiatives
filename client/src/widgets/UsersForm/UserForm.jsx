import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';
import { Descriptions } from 'antd';

export default function UsersForm({ setUsers, users }) {
  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputRegistration, setInputRegistration] = useState('');

  function createUserHandler() {
    const newUsers = [...users];
    newUsers.push({
      id: users.length + 1,
      name: inputName,
      needlesCount: inputNeedlesCount,
    });
    setUsers(newUsers);
    setInputName('');
    setInputNeedlesCount('');
  }

  // function createBookHandler() {
  //   setBooks((prev) => [...prev, {title, descriptions}])
  //   setInputName('');
  //   setInputNeedlesCount('');
  // }

  return (
    <div>
      <input
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder='Имя'
      />
      <input
        value={inputNeedlesCount}
        onChange={(e) => setInputNeedlesCount(e.target.value)}
        placeholder='Количество иголок'
      />
      <Button onClick={createUserHandler} text='Cъежить' />
    </div>
  );
}
