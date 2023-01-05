import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  try {
    const editionDrop = await sdk.getContract(
      process.env.CONTRACT_ADDRESS,
      "edition-drop"
    );
    const token = await sdk.getContract(
      process.env.LINS_TOKEN_CONTRACT_ADDRESS,
      "token"
    );

    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "No one has claimed the membership NFT yet! we should advertise more widely!"
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );

      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
      return airdropTarget;
    });

    console.log("Starting to transfer airdrops...");

    await token.transferBatch(airdropTargets);
  } catch (error) {
    console.log("error on transferring the airdrops: ", error);
  }
};

main();
