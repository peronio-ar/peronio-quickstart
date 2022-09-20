import React from "react";
import { Button } from "../components/Button";
import { AddToken } from "./AddToken";

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
        address={"0x78a486306D15E7111cca541F2f1307a1cFCaF5C4"}
        symbol={"P"}
        decimals={6}
        image="https://raw.githubusercontent.com/peronio-ar/branding/main/logo/v2/200.png"
      />
      <br />
      <AddToken
        address={"0x2791bca1f2de4661ed88a30c99a7a9449aa84174"}
        symbol={"USDC"}
        decimals={6}
        image="https://polygonscan.com/token/images/centre-usdc_32.png"
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
