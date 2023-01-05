import { useContract } from "@thirdweb-dev/react";
import { useCallback, useMemo, useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Groups3Icon from "@mui/icons-material/Groups3";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import env from "react-dotenv";
import { linsGraph } from "../assets/index";

export default function Summary({ hasClaimedNFT, address }) {
  const { LINS_TOKEN_CONTRACT_ADDRESS, CONTRACT_ADDRESS } = env;
  const [membersAddresses, setMembersAddresses] = useState([]);
  const [memberTokenAmount, setMemberTokenAmount] = useState([]);

  const { contract: token } = useContract(LINS_TOKEN_CONTRACT_ADDRESS, "token");
  const { contract: editionDrop } = useContract(
    CONTRACT_ADDRESS,
    "edition-drop"
  );

  const getAllMemberAddresses = useCallback(async () => {
    const claimerAddresses = await editionDrop.history.getAllClaimerAddresses(
      0
    );
    console.log("All claimer addresses: ", claimerAddresses);
    setMembersAddresses(claimerAddresses);
  }, [editionDrop]);

  const getTokenHolders = useCallback(async () => {
    const tokenHolders = await token.history.getAllHolderBalances(0);
    console.log("All token holders: ", tokenHolders);
    setMemberTokenAmount(tokenHolders);
  }, [token]);

  useEffect(() => {
    if (!hasClaimedNFT || !!!editionDrop) {
      return;
    }
    getAllMemberAddresses();
  }, [hasClaimedNFT, editionDrop]);

  useEffect(() => {
    if (!hasClaimedNFT || !!!token) {
      return;
    }
    getTokenHolders();
  }, [hasClaimedNFT, token]);

  const memberList = useMemo(() => {
    return membersAddresses.map((address) => {
      const member = memberTokenAmount.find((el) => el.holder === address);
      return {
        address,
        tokenAmount: member?.balance.displayValue || "0",
      };
    });
  }, [membersAddresses, memberTokenAmount]);
  console.log("All members of the DAO: ", memberList);

  const userBalance = useMemo(() => {
    return memberList.find((el) => el.address === address)?.tokenAmount || "0";
  }, [memberList, address]);

  return (
    <div>
      <div className="quick-access">
        <div className="card purple">
          <p className="purple-card-title">Referral team</p>
          <Groups3Icon className="card-big-icon right" />
        </div>
        <div className="card purple">
          <p className="purple-card-title">Your insurees</p>
          <Diversity1Icon className="card-big-icon right" />
        </div>
        <div className="card purple">
          <p className="purple-card-title">Your insurees</p>
          <WorkspacesIcon className="card-big-icon right" />
        </div>
      </div>
      <div className="menu-content-top">
        <div className="card balance">
          <p className="balance-label">Your balance:</p>
          <p className="balance-value">{`$LINS ${userBalance}`}</p>
          <div className="variation-footer">
            <div className="variation-row">
              <ArrowDropUpIcon className="arrow up" />
              <p>USD 120000</p>
            </div>
            <div className="variation-row">
              <ArrowDropDownIcon className="arrow down" />
              <p>USD 120000</p>
            </div>
          </div>
        </div>
        <img className="graph" src={linsGraph} />
      </div>
      <table class="table">
        <thead>
          <p className="heading1">All token holders</p>
        </thead>
        <tbody>
          {memberList.map((el, ind) => {
            return (
              <tr key={ind} className="table-row">
                <td className="column number">{"# " + ind}</td>
                <td className="column left">
                  {el.address.slice(0, 20) + "..."}
                </td>
                <td className="column right">{el.tokenAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
