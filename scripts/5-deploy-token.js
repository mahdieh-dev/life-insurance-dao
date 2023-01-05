import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

const main = async () => {
  try {
    const tokenAddress = await sdk.deployer.deployToken({
      name: "LifeInsuranceDAO Governance Token",
      symbol: "LINS",
      primary_sale_recipient: AddressZero,
    });
    console.log("Airdrop token created: ", tokenAddress);
  } catch (error) {
    console.log("error on creating airdrop token: ", error);
  }
};

main();
