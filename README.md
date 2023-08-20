# Life Insurance DAO

![LifeInsuranceDAO dashboard](https://github.com/mahdieh-dev/life-insurance-dao/blob/main/src/assets/dashboard.png)

Life Insurance DAO is a DAO on the Ethereum blockchain and is created to make insurance more trustable, easier, and decentralized.

This repository contains the full scripts for creating an `ERC1155 contract`, `ERC20 contract`, and a `Governance contract` (which is needed to let the members of the DAO vote for the proposals).

## Built With

- React.js
- Web3.js
- Ethers

## Live Demo

Click [here](life-insurance-dao.vercel.app) to view the live demo.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- A web browser (e.g. Mozilla Firefox, Google Chrome etc.)
- git: This is a version control system used for source code management.
- A text editor (e.g Visual Studio Code (recommended), Sublime Text, Atom etc.)
- Browser Engine on your terminal preferably NodeJs
- Knowledge of HTML, CSS, JavaScript and Next.js

### Setup

- With git, clone the code to your machine, or download a ZIP of all the files directly.
- [Download the ZIP file from this location](https://github.com/mahdieh-dev/life-insurance-dao/archive/refs/heads/main.zip) or run the following [git](https://git-scm.com/) command to clone the files to your machine:

```
git clone https://github.com/mahdieh-dev/life-insurance-dao.git
```

- Once the files are on your machine, open the **life-insurance-dao** folder in [Visual Studio Code](https://code.visualstudio.com/download).
- Create a `.env` file with the following information:

- `PRIVATE_KEY`: The private key of your wallet
- `WALLET_ADDRESS`: The public key of your wallet
- `ALCHEMY_API_URL`: The API URL for the Goerli network from Alchemy
- `CONTRACT_ADDRESS`: The address of the ERC1155 contract after deployment
- `LINS_TOKEN_CONTRACT_ADDRESS`: The address of your ERC20 contract (You can change the name with your own token symbol, make sure to change it on every file it is used)
- `VOTING_CONTRACT_ADDRESS`: The address of the governance contract

## Install

- Open the **VS Code** integrated terminal and run the following commands:

```
npm install
```

This will install all the packages and dependencies used in the project.

## Usage

- Run the following command to start a live server on your computer:

```
npm start
```

This will open up the project on a browser on `localhost:3000`.

- To run the scripts of the Blockchain:

```
node path/to/filename.js
```

## Screenshots

A screenshot of the Proposals tab, where members can vote:
![LifeInsuranceDAO Proposals tab image](https://github.com/mahdieh-dev/life-insurance-dao/blob/main/src/assets/proposals.png)

## Authors

👩🏻‍💼 **Mahdieh Shavandi**

- GitHub: [@mahdieh-dev](https://github.com/mahdieh-dev)
- StackOverFlow: [@mahdieh-shavandi](https://stackoverflow.com/users/8898138/mahdieh-shavandi)
- LinkedIn: [Mahdieh Shavandi](https://www.linkedin.com/in/mshvnd/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!
