import React, { useState } from "react";
import { ethers } from "ethers";
import styled from "styled-components";

const network = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const connectWallet = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...network["polygon"],
          },
        ],
      });
      const account = provider.getSigner();
      const Address = await account.getAddress();
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setAddress(Address);
      setBalance(Balance);
    }
  };
  return (
    <WalletWrapper onClick={connectWallet}>
      {balance === "" ? (
        <Balance />
      ) : (
        <Balance>{balance.slice(0, 4)} Matic</Balance>
      )}
      {address === "" ? (
        <Address>Connect Wallet</Address>
      ) : (
        <Address>
          {address.slice(0, 6)}...${address.slice(39)}
        </Address>
      )}
    </WalletWrapper>
  );
};

export default Wallet;

const WalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 0 9px;
  height: 100%;
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  margin-right: 15px;
  font-weight: bold;
  font-size: small;
  font-family: "Roboto";
`;

const Address = styled.h2`
  background-color: ${(props) => props.theme.bgSubDiv};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  border-radius: 10px;
`;

const Balance = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin-right: 10px;
`;
