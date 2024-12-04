import React, { useState } from 'react';
import HedgehogsForm from '../../widgets/HedgehogsForm/HedgehogsForm';
import HedgehogsList from '../../widgets/HedgehogsList/HedgehogsList';

const initialHedgehogsState = [
  { id: 1, name: 'Biba', needlesCount: 1 },
  { id: 2, name: 'Boba', needlesCount: 10 },
  { id: 3, name: 'Pupa', needlesCount: 100 },
  { id: 4, name: 'Lupa', needlesCount: 1000 },
];

export default function HedgehogsPage() {
  const [hedgehogs, setHedgehogs] = useState(initialHedgehogsState);

  console.log(hedgehogs);

  return (
    <div>
      <HedgehogsForm setHedgehogs={setHedgehogs} hedgehogs={hedgehogs} />
      <HedgehogsList setHedgehogs={setHedgehogs} hedgehogs={hedgehogs} />
    </div>
  );
}
