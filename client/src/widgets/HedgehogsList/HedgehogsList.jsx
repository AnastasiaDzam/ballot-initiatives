import React from 'react';
import HedgehogCard from '../HedgehogCard/HedgehogCard';

export default function HedgehogsList({ hedgehogs, setHedgehogs }) {
  return (
    <div>
      {hedgehogs.map((el) => (
        <HedgehogCard key={el.id} hedgehog={el} setHedgehogs={setHedgehogs} />
      ))}
    </div>
  );
}
