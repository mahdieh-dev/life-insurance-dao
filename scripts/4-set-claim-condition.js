import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
import { MaxUint256 } from "@ethersproject/constants";
dotenv.config();

const { CONTRACT_ADDRESS } = process.env;

const main = async () => {
  try {
    const editionDrop = await sdk.getContract(CONTRACT_ADDRESS, "edition-drop");
    const claimConditions = [
      {
        maxClaimablePerWallet: 1,
        startTime: new Date(),
        price: 0,
        maxClaimableSupply: 100_000,
        waitInSeconds: MaxUint256,
      },
    ];
    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("✅ Claim conditions set successfully!");
  } catch (error) {
    console.log("error on setting claim conditions: ", error);
  }
};

main();
