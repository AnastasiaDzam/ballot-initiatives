import React from 'react';
import Button from '../../shared/ui/Button/Button';

export default function UserCard({ user, setUsers }) {
  function userDeleteHandler() {
    setUsers((prev) => prev.filter((el) => el.id !== user.id));
  }
  return (
    <div>
      <p>{user.userName}</p>
      <p>{user.userLastName}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
      <p>{user.registration}</p>
      <Button color='red' onClick={userDeleteHandler}>
        <span>Удалить</span>
      </Button>
    </div>
  );
}
