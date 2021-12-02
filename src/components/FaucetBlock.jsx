import React from "react";
import { Button } from "../components/Button";

function handleClaimPE(e) {
  console.dir(e);
}

function handleAddPEToken(e) {
  console.dir(e);
}

export const FaucetBlock = ({ address }) => {
  return (
    <div>
      <div>
        <Button
          type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--large"
          onClick={handleAddPEToken}
        >
          Agregar Token a Metamask
        </Button>
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
