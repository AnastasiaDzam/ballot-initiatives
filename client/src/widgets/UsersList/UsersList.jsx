import React from 'react';
import UserCard from '../UserCard/UserCard';

export default function UsersList({ users, setUsers }) {
  return (
    <div>
      {users.map((el) => (
        <UserCard key={el.id} user={el} setUsers={setUsers} />
      ))}
    </div>
  );
}
