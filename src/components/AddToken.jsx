/* global ethereum */
import React from "react";
import { useState } from "react";
import { Button } from "./Button";

export const AddToken = ({ address, symbol, decimals, image, onAdded }) => {
  const [addedToken, setAddedToken] = useState(false);
  const handleAddToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: address, // The address that the token is at.
            symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: decimals, // The number of decimals in the token
            image: image, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        setAddedToken(true);
      } else {
        console.log("Tenes que aceptar en Metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!addedToken ? (
        <Button
          type='button'
          buttonStyle='btn--primary--outline'
          buttonSize='btn--large'
          onClick={handleAddToken}
        >
          Agregar {symbol} a Metamask
        </Button>
      ) : (
        <div>Token ({symbol}) agregado a Metamask!</div>
      )}
    </>
  );
};
