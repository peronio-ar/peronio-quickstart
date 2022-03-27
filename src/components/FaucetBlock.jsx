import React from "react";
import { Button } from "../components/Button";
import { AddToken } from "./AddToken";

import usdcImage from "../static/usdc.png";
import peImage from "../static/pe.png";

// async function handleClaimPE(address) {
//   console.info("address", address);

//   const data = {
//     address,
//   };
//   const response = await fetch("/api/claim", {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   const result = await response.json();
//   console.dir(result);
// }

async function linkToBeta() {
  window.location.href = "https://beta.peronio.ar";
}

export const FaucetBlock = ({ address }) => {
  return (
    <div>
      <AddToken
        address={"0xc2768beF7a6BB57F0FfA169a9ED4017c09696FF1"}
        symbol={"PE"}
        decimals={6}
        image={peImage}
      />
      <br />
      <AddToken
        address={"0x2791bca1f2de4661ed88a30c99a7a9449aa84174"}
        symbol={"USDC"}
        decimals={6}
        image={usdcImage}
      />
      <br />
      <Button
        type='button'
        buttonStyle='btn--primary--outline'
        buttonSize='btn--large'
        onClick={linkToBeta}
      >
        Entrar a la Beta
      </Button>
    </div>
  );
};
