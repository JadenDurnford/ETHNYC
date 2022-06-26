import { ConnectWallet } from "@3rdweb/react";
import { useWeb3 } from "@3rdweb/hooks";
const ThirdwebConnect = () => {
  const { address, chainId, provider } = useWeb3();
  return (
    <div className="container" style={{ marginRight: "10px" }}>
      {/* <h2>Connection</h2> */}
      <ConnectWallet style={{ backgroundColor: "white", color: "black" }} />
      {/* <p style={{ fontSize: "10px" }}>
        Address: {address}
      </p> */}
      {/* <p style={{ fontSize: "10px" }}>
        Chain ID: {chainId}
      </p> */}
    </div>
  );
};
export default ThirdwebConnect;