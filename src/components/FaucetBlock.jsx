import React from 'react';
import { Button } from '../components/Button';
import { AddToken } from './AddToken';

import tokenImage from '../static/erc20.png';

async function handleClaimPE(address) {
  console.info('address', address);

  const data = {
    address,
  };
  const response = await fetch('/api/claim', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const result = await response.json();
  console.dir(result);
}

export const FaucetBlock = ({ address }) => {
  return (
    <div>
      <AddToken
        address={'0x2374300c9ee9486Da16a479a503da0b48cAB497a'}
        symbol={'PER'}
        decimals={6}
        image={tokenImage}
      />
      <br />
      <Button
        type='button'
        buttonStyle='btn--primary--outline'
        buttonSize='btn--large'
        onClick={() => handleClaimPE(address)}
      >
        Recibir Peronios
      </Button>
    </div>
  );
};
