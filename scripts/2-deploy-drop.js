import { AddressZero } from "@ethersproject/constants";
import { readFileSync } from "fs";
import sdk from "./1-initialize-sdk.js";

const main = async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "InsuranceDAO Membership",
      image: readFileSync("scripts/assets/santa-claus.jpg"),
      description: "A DAO for the people who need a safe life soon!",
      primary_sale_recipient: AddressZero,
    });
    console.log("✅ contract deployed to: ", editionDropAddress);
    const editionDrop = await sdk.getContract(
      editionDropAddress,
      "edition-drop"
    );
    const metadata = await editionDrop.metadata.get();
    console.log("✅ contract metadata:", metadata);
    {
      /*
        Metadata:
        {
            name: 'InsuranceDAO Membership',
            description: 'A DAO for the people who need a safe life soon!',
            image: 'https://gateway.ipfscdn.io/ipfs/QmRc2AQ5JVfffma8Md8NnNdXTV8Lvn6TcBxsRztZpAj861/0',
            seller_fee_basis_points: 0,
            fee_recipient: '0x0000000000000000000000000000000000000000',
            merkle: {},
            symbol: ''
        }
     */
    }
  } catch (error) {
    console.log("error on deployment process: ", error);
    process.exit(1);
  }
};

main();
