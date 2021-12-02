import React, { useState } from "react";
import "./styles.css";

import { Button } from "./components/Button";
import { OnBoarding } from "./components/OnBoarding";

export default function App() {
  const ethereum = window.ethereum;

  const [addr, setAddr] = useState("");
  const [chainId, setChainId] = useState(parseInt(window.ethereum.chainId, 16));

  const handleGetAcount = async (e) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    setAddr(account);
  };

  if (ethereum) {
    ethereum.on("accountsChanged", function (accounts) {
      setAddr(accounts[0]);
    });
    ethereum.on("chainChanged", function (_chainId) {
      setChainId(parseInt(_chainId, 16));
    });
  }

  return (
    <div className="App">
      <h1>Quick Start del Peronio</h1>
      <h3>Tenes Metamask instalado!</h3>
      <div>
        <p>
          Tu billetera vive en el explorador, podes acceder a ella desde el
          ícono arriba a la derecha
        </p>
        {!addr ? (
          <p>Hacé click en Conectar a Metamask</p>
        ) : (
          "Ya estas conectado!"
        )}
      </div>
      <br />
      <br />

      {ethereum && (
        //<a href="https://metamask.online/" target="_blank">
        <>
          {!addr ? (
            <Button
              type="button"
              buttonStyle="btn--primary--outline"
              buttonSize="btn--large"
              onClick={handleGetAcount}
            >
              Conectar a Metamask
            </Button>
          ) : (
            <OnBoarding addr={addr} chainId={chainId} />
          )}
        </>
      )}
      <br />
      {!ethereum && (
        <p style={{ color: "red" }}>
          <h1>Testeo de Peornio</h1>
          <h3>Primero bajate Metamask</h3>
          <div>
            <a target="blank" href="https://metamask.io/">
              Descargar Metamask
            </a>
          </div>
          <p>Configurá la billetera y refrescá esta página</p>
        </p>
      )}
    </div>
  );
}
