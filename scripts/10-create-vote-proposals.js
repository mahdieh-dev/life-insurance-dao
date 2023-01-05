import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
import { ethers } from "ethers";
dotenv.config();
const { VOTING_CONTRACT_ADDRESS, LINS_TOKEN_CONTRACT_ADDRESS, WALLET_ADDRESS } =
  process.env;

const main = async () => {
  const vote = await sdk.getContract(VOTING_CONTRACT_ADDRESS, "vote");
  const token = await sdk.getContract(LINS_TOKEN_CONTRACT_ADDRESS, "token");
  try {
    const amount = 420_000;
    const description = `Should the DAO mint an additional ${amount} $LINS to the treasury to increase the core team's salary?`;
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0, // ETH
        transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 20),
        ]),
      },
    ];
    await vote.propose(description, executions);
    console.log("✅ successfully created the minting more $LINS proposal");
  } catch (error) {
    console.log("Error while creating the minting more $LINS proposal:", error);
    process.exit(1);
  }

  try {
    const amount = 6_900;
    const description = `Should we transfer ${amount} $LINS to the ${WALLET_ADDRESS} for being an awesome developer?`;
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode("transfer", [
          WALLET_ADDRESS,
          ethers.utils.parseUnits(amount.toString(), 20),
        ]),
      },
    ];
    await vote.propose(description, executions);
    console.log("✅ successfully created the transfer proposal");
  } catch (error) {
    console.log("Error while creating the transfer proposal: ", error);
    process.exit(1);
  }
};

main();
