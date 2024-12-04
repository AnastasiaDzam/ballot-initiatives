import { useState } from 'react';
import Button from '../../shared/ui/Button/Button';

const initialState = [
  { title: '11', body: '1111111' },
  { title: '22', body: '222222' },
  { title: '33', body: '333333' },
  { title: '44', body: '444444' },
];

const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  border: '2px solid white',
};

export default function Tasks() {
  const [tasks, setTasks] = useState(initialState);
  // const [titleInput, setTitleInput] = useState('');
  // const [bodyInput, setBodyInput] = useState('');
  const [inputs, setInputs] = useState({ title: '', body: '' });

  function onChangeHandler(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  console.log(inputs);

  function deleteTaskHandler(title) {
    setTasks((prev) => [...prev].filter((el) => el.title !== title));
  }

  function createTaskHandler() {
    setTasks((prev) => [...prev, inputs]);
    setInputs({ title: '', body: '' });
  }

  return (
    <div style={styles}>
      <input value={inputs.title} name='title' onChange={onChangeHandler} />
      <input value={inputs.body} name='body' onChange={onChangeHandler} />
      <Button text='Создать' color='green' onClick={createTaskHandler} />
      {/* <input
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <input
        value={bodyInput}
        onChange={(e) => setBodyInput(e.target.value)}
      /> */}
      {tasks.map((task) => (
        <div style={{ display: 'flex', gap: '20px' }} key={task.title}>
          <span>{task.title}</span>
          <span>{task.body}</span>
          <Button
            text='Удалить'
            color='red'
            onClick={() => deleteTaskHandler(task.title)}
          />
        </div>
      ))}
    </div>
  );
}
