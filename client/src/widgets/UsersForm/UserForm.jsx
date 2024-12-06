import React, { useState } from 'react';
import Button from '../../shared/ui/Button/Button';

export default function UsersForm({ setUsers, users }) {
  // const [inputName, setInputName] = useState('');
  // const [inputNeedlesCount, setInputNeedlesCount] = useState('');

  // function createUserHandler() {
  //   const newUsers = [...users];
  //   newUsers.push({
  //     id: users.length + 1,
  //     name: inputName,
  //     needlesCount: inputNeedlesCount,
  //   });
  //   setUsers(newUsers);
  //   setInputName('');
  //   setInputNeedlesCount('');
  // }

  // return (
  //   <div>
  //     <input
  //       value={inputName}
  //       onChange={(e) => setInputName(e.target.value)}
  //       placeholder='Имя ежиное'
  //     />
  //     <input
  //       value={inputNeedlesCount}
  //       onChange={(e) => setInputNeedlesCount(e.target.value)}
  //       placeholder='Количество иголок'
  //     />
  //     <Button onClick={createUserHandler} text='Cъежить' />
  //   </div>
  // );
}
