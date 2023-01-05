import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

const envKeys = ["PRIVATE_KEY", "WALLET_ADDRESS", "ALCHEMY_API_URL"];

const hasError = envKeys.some((key) => {
  !!!process.env[key] || process.env[key].length === 0;
});

if (hasError) {
  console.log(
    "Environmental variables do not exist. Please check your dotenv file."
  );
}

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env[envKeys[0]],
  process.env[envKeys[2]]
);

const main = async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("SDK initialized by address:", address);
  } catch (error) {
    console.log("error while getting address: ", error);
    process.exit(1);
  }
};

main();

export default sdk;
