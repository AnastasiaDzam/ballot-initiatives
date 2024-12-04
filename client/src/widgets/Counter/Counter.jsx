import { useState } from 'react';
import Button from '../../shared/ui/Button/Button';

export default function Counter() {
  // let count = 0;
  const [count, setCount] = useState(0);
  // const userState = useState(initialState);
  // console.log(userState);

  function increment() {
    setCount(count + 1);
    // console.log(count);
  }

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <Button
        // text='-'
        color='red'
        disabled={count === 0}
        onClick={decrement}
        onMouseEnter={() => console.log('Зашли')}
        onMouseLeave={() => console.log('Вышли')}
      >
        <span>-</span>
      </Button>
      <span>{count}</span>
      <Button
        // text='-'
        color='green'
        disabled={count === 20}
        onClick={increment}
        onMouseEnter={() => console.log('Зашли')}
        onMouseLeave={() => console.log('Вышли')}
      >
        <span style={{ color: 'black' }}>+</span>
      </Button>
      {count > 10 ? <p>Ого, как много</p> : <p>Блин, как мало</p>}
    </div>
  );
}
