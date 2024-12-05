import React, { useState } from "react";
import UsersForm from "../../widgets/UsersForm/UserForm";
import UsersList from "../../widgets/UsersList/UsersList";

export default function UsersPage() {
  return (
    <div>
      <UsersForm setUsers={setUsers} users={users} />
      <UsersList setUsers={setUsers} users={users} />
    </div>
  );
}
