import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();

const { CONTRACT_ADDRESS } = process.env;

const main = async () => {
  try {
    const editionDrop = await sdk.getContract(CONTRACT_ADDRESS, "edition-drop");
    await editionDrop.createBatch([
      {
        image: readFileSync("scripts/assets/beard.png"),
        name: "White beard for the Insured memebers",
        description: "This beard allows you to join the ranks of retirees!",
      },
    ]);
    console.log("✅ Beard NFT created in the drop");
  } catch (error) {
    console.log("Failed to create the Beard NFT:", error);
  }
};

main();
