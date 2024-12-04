import React from 'react';
import Button from '../../shared/ui/Button/Button';
import TaskCard from '../TaskCard/TaskCard';

export default function TasksList({ tasks, setTasks, user }) {
  return (
    <div>
      {tasks?.length !== 0 ? (
        tasks?.map((task) => (
          <TaskCard key={task.id} task={task} setTasks={setTasks} user={user} />
        ))
      ) : (
        <h3>Нет данных по задачам</h3>
      )}
    </div>
  );
}
