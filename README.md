# Life Insurance DAO

![LifeInsuranceDAO dashboard](https://github.com/mahdieh-dev/life-insurance-dao/blob/main/src/assets/dashboard.png)

This DAO is inspired by the [Buildspace community](https://buildspace.so) DAO course and contains the full scripts for creating `ERC1155 contract`, `ERC20 contract` and a `Governance contract` (which is needed to let the members of the DAO vote for the proposals).
The contracts of this project are created using the Thirdweb SDK.

To get started with this project, you need to setup a `.env` file with the following information:

- `PRIVATE_KEY`: The private key of your wallet
- `WALLET_ADDRESS`: The public key of your wallet
- `ALCHEMY_API_URL`: The API URL for Goerli network from Alchemy
- `CONTRACT_ADDRESS`: The address of the ERC1155 contract after deployment
- `LINS_TOKEN_CONTRACT_ADDRESS`: The address of your ERC20 contract (You can change the name with you own token symbol, make sure to change it on every file it is used)
- `VOTING_CONTRACT_ADDRESS`: The address of the governance contract


Here is a screenshot of the Proposals tab, where members can vote:
![LifeInsuranceDAO Proposals tab image](https://github.com/mahdieh-dev/life-insurance-dao/blob/main/src/assets/proposals.png)
