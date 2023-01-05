import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  try {
    const token = await sdk.getContract(
      process.env.LINS_TOKEN_CONTRACT_ADDRESS,
      "token"
    );
    const amount = 10_000_000;
    await token.mint(amount);
    const totalSupply = await token.totalSupply();
    console.log(
      "There are now " + totalSupply.displayValue + " $LINS in circulation!"
    );
  } catch (error) {
    console.log("error when minting the tokens:", error);
  }
};

main();
