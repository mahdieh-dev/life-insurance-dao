import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();
const { LINS_TOKEN_CONTRACT_ADDRESS } = process.env;

const main = async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "LifeInsurance DAO Voting Contract",
      voting_token_address: LINS_TOKEN_CONTRACT_ADDRESS,
      voting_delay_in_blocks: 0,
      voting_period_in_blocks: 6570,
      voting_quorum_fraction: 0,
    });
    console.log("✅ Voting contract created: ", voteContractAddress);
  } catch (error) {
    console.log("Error while creating voting contract: ", error);
  }
};

main();
