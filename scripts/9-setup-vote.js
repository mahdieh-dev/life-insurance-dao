import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

const { VOTING_CONTRACT_ADDRESS, LINS_TOKEN_CONTRACT_ADDRESS, WALLET_ADDRESS } =
  process.env;

const main = async () => {
  const vote = await sdk.getContract(VOTING_CONTRACT_ADDRESS, "vote");
  const token = await sdk.getContract(LINS_TOKEN_CONTRACT_ADDRESS, "token");
  try {
    await token.roles.grant("minter", vote.getAddress());
    console.log("✅ Successfully gave the minter role to the vote contract");
  } catch (error) {
    console.log("error while setting up minter role: ", error);
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await token.balanceOf(WALLET_ADDRESS);
    const ownedAmount = ownedTokenBalance.displayValue;
    const treasuryAmount = (Number(ownedAmount) * 50) / 100;
    await token.transfer(vote.getAddress(), treasuryAmount);
    console.log("✅ Successfully transferred tokens to the treasury");
  } catch (error) {
    console.log("Error while transferring token to the treasury: ", error);
    process.exit(1);
  }
};

main();
