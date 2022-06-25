import { ConnectWallet } from "@3rdweb/react";
import { useWeb3 } from "@3rdweb/hooks";
const ThirdwebConnect = () => {
  const { address, chainId, provider } = useWeb3();
  return (
    <div className="container">
      <h1>ThirdWeb Button</h1>
      <ConnectWallet />
      <h2>
        Address:<b> {address}</b>
      </h2>
      <h2>
        ChainId:<b> {chainId}</b>
      </h2>
    </div>
  );
};
export default ThirdwebConnect;