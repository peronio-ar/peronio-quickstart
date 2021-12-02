import React from "react";
import { Button } from "../components/Button";
import { AddToken } from "./AddToken";

import tokenImage from "../static/erc20.png";

function handleClaimPE(e) {
  console.dir(e);
}

export const FaucetBlock = ({ address }) => {
  return (
    <div>
      <div>
        <AddToken
          address={"0x2374300c9ee9486Da16a479a503da0b48cAB497a"}
          symbol={"PER"}
          decimals={6}
          image={tokenImage}
        />
      </div>
      <br />
      <div>
        <Button
          type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--large"
          onClick={handleClaimPE}
        >
          Recibir Peronios
        </Button>
      </div>
    </div>
  );
};
