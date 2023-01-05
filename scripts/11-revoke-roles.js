import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();
const { LINS_TOKEN_CONTRACT_ADDRESS } = process.env;

const main = async () => {
  try {
    const token = await sdk.getContract(LINS_TOKEN_CONTRACT_ADDRESS, "token");
    const allRoles = await token.roles.getAll();
    console.log("All roles before revoking access: ", allRoles);
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "All roles after removing admin power: ",
      await token.roles.getAll()
    );
  } catch (error) {
    console.log("Error while revokin super power!: ", error);
    process.exit(1);
  }
};

main();
