import {
  ChainId,
  ConnectWallet,
  useAddress,
  useContract,
  useNetwork,
  useNFTBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { retirementClipart } from "./assets";
import env from "react-dotenv";
import TimelineIcon from "@mui/icons-material/Timeline";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FaceIcon from "@mui/icons-material/Face";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import Summary from "./components/Summary";
import Proposals from "./components/Proposals";

const App = () => {
  const { CONTRACT_ADDRESS } = env;

  const [activeMenu, setActiveMenu] = useState(0);

  const address = useAddress();
  const network = useNetwork();
  const { contract: editionDrop } = useContract(
    CONTRACT_ADDRESS,
    "edition-drop"
  );
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");

  useEffect(() => {
    if (address && network?.[0].data.chain.id !== ChainId.Goerli) {
      alert("Please connect to Goerli network and Click OK!");
    }
  }, [network, address]);

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0);
  }, [nftBalance]);
  console.log("Has claimed NFT: ", hasClaimedNFT);

  const menuItems = useMemo(() => {
    return [
      { icon: TimelineIcon, label: "Summary" },
      { icon: SwapHorizIcon, label: "Transactions" },
      { icon: HowToVoteIcon, label: "Proposals" },
      { icon: FaceIcon, label: "Profile" },
    ];
  }, []);

  const claimNFTAction = useCallback(async (contract) => {
    await contract.erc1155.claim(0, 1);
  }, []);

  const onMenuItemClick = useCallback((ind) => {
    setActiveMenu(ind);
  }, []);

  if (!address) {
    return (
      <div className="landing">
        <img src={retirementClipart} className="logo" />
        <h1>
          Your life will be safe here!
          <br />
          Welcome!
        </h1>
        <ConnectWallet />
      </div>
    );
  }

  if (!hasClaimedNFT) {
    return (
      <div className="landing">
        <img src={retirementClipart} className="logo" />
        <h1>We have been expecting you!</h1>
        <br />
        <h2 className="welcome-text">✨ Welcome to Life Insurance DAO ✨</h2>
        <Web3Button
          contractAddress={CONTRACT_ADDRESS}
          action={claimNFTAction}
          onSuccess={() =>
            console.log(
              `Successfully minted the NFT! Check it out here: https://testnets.opensea.io/assets/goerli/${editionDrop.getAddress()}/0`
            )
          }
          onError={(error) => {
            console.log("Error on minting the NFT:", error);
          }}
        >
          Mint the membership NFT now (FREE)!
        </Web3Button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="dashboard">
        <div className="dashboard-body">
          <div className="dashboard-menu">
            <div className="user-info">
              <div className="profile-pic"></div>
              <div className="info">
                <div className="info name">Mahdieh</div>
                <div className="info address">
                  {address.slice(0, 10) + "..."}
                </div>
              </div>
            </div>
            <div className="menu-items">
              {menuItems.map((el, ind) => {
                const MenuIcon = el.icon;
                return (
                  <div
                    key={ind}
                    onClick={() => onMenuItemClick(ind)}
                    className={
                      activeMenu === ind ? "menu-item active" : "menu-item"
                    }
                  >
                    <MenuIcon />
                    <p
                      className={
                        activeMenu === ind
                          ? "menu-item active label"
                          : "menu-item label"
                      }
                    >
                      {el.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="menu-content">
            {activeMenu === 0 && (
              <Summary hasClaimedNFT={hasClaimedNFT} address={address} />
            )}
            {activeMenu === 2 && (
              <Proposals hasClaimedNFT={hasClaimedNFT} address={address} />
            )}
          </div>
        </div>
        <div className="member-page-footer"></div>
      </div>
    );
  }
};

export default App;
