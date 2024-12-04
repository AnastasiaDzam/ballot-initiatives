import React, { useState } from 'react';
import UsersForm from '../../widgets/UsersForm/UsersForm';
import UsersList from '../../widgets/UsersList/UsersList';

const initialUsersState = [
  { id: 1, name: 'Biba', needlesCount: 1 },
  { id: 2, name: 'Boba', needlesCount: 10 },
  { id: 3, name: 'Pupa', needlesCount: 100 },
  { id: 4, name: 'Lupa', needlesCount: 1000 },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsersState);

  console.log(users);

  return (
    <div>
      <UsersForm setUsers={setUsers} users={users} />
      <UsersList setUsers={setUsers} users={users} />
    </div>
  );
}
