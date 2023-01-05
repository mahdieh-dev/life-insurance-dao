import { AddressZero } from "@ethersproject/constants";
import { Button } from "@mui/material";
import { useContract } from "@thirdweb-dev/react";
import { useCallback, useEffect, useState } from "react";
import env from "react-dotenv";

export default function Proposals({ hasClaimedNFT, address }) {
  const { VOTING_CONTRACT_ADDRESS, LINS_TOKEN_CONTRACT_ADDRESS } = env;
  const { contract: vote } = useContract(VOTING_CONTRACT_ADDRESS, "vote");
  const { contract: token } = useContract(LINS_TOKEN_CONTRACT_ADDRESS, "token");

  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState([]);

  const getAllProposals = useCallback(async () => {
    try {
      const allProposals = await vote.getAll();
      setProposals(allProposals);
    } catch (error) {
      console.log("Error while getting all the proposals: ", error);
    }
  }, [vote]);

  const checkIfUserHasVoted = useCallback(
    async (id) => {
      try {
        const voted = await vote.hasVoted(id, address);
        setHasVoted((prev) => [...prev, { proposalId: id, hasVoted: voted }]);
      } catch (error) {
        console.log("Error while checking if user has voted: ", error);
      }
    },
    [address, vote]
  );

  const checkTokenDelegationOfUser = useCallback(async () => {
    try {
      const delegation = await token.getDelegationOf(address);
      if (delegation === AddressZero) {
        token.delegateTo(address);
      }
    } catch (error) {
      console.log("Error delegating token to the user: ", error);
    }
  }, [token, address]);

  const onVoteClick = useCallback(
    async (proposalId, voteType) => {
      try {
        setIsVoting(true);
        await checkTokenDelegationOfUser();
        let proposal = await vote.get(proposalId);
        if (proposal.state === 1) {
          await vote.vote(proposalId, voteType);
          let hasVotedCopy = hasVoted.slice();
          const hasVotedIndex = hasVotedCopy.findIndex(
            (el) => el.proposalId === proposalId
          );
          if (hasVotedIndex !== -1) {
            hasVotedCopy[hasVotedIndex] = { proposalId, hasVoted: true };
            setHasVoted(hasVotedCopy);
          }
        }
        setIsVoting(false);
      } catch (error) {
        setIsVoting(false);
        console.log("Error casting vote: ", error);
      }

      try {
        const proposal = await vote.get(proposalId);
        if (proposal.state === 4) {
          await vote.execute(proposalId);
        }
      } catch (error) {
        console.log("Error while executing proposal: ", error);
      }
    },
    [vote, checkTokenDelegationOfUser, hasVoted]
  );

  useEffect(() => {
    if (!hasClaimedNFT || !!!vote) {
      return;
    }
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  useEffect(() => {
    if (!hasClaimedNFT || !!!vote) {
      return;
    }
    for (let item of proposals) {
      checkIfUserHasVoted(item.proposalId);
    }
  }, [hasClaimedNFT, vote, proposals]);

  return (
    <div>
      <h3 className="heading1">{"Active Proposals"}</h3>
      {proposals.map((proposal) => {
        const hasVotedForThisProposal = hasVoted.find(
          (el) => el.proposalId === proposal.proposalId
        )?.hasVoted;
        return (
          <div className="card proposal" key={proposal.proposalId}>
            <p className="card-desc">{proposal.description}</p>
            {!hasVotedForThisProposal && !isVoting && (
              <div className="vote-row">
                {proposal.votes.map((el) => {
                  const labelChage = {
                    0: "Against",
                    1: "Approve",
                    2: "Abstain",
                  };
                  const colorChange = {
                    0: "error",
                    1: "success",
                    2: "secondary",
                  };
                  return (
                    <div key={el.type}>
                      <Button
                        disabled={isVoting}
                        onClick={() =>
                          onVoteClick(proposal.proposalId, el.type)
                        }
                        variant="contained"
                        color={colorChange[el.type]}
                      >
                        {labelChage[el.type]}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
            {hasVotedForThisProposal && (
              <p className="info-text">
                You've already voted for this proposal.
              </p>
            )}
            {isVoting && !hasVotedForThisProposal && (
              <p className="info-text white">
                {`Voting in progress, please wait...`}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
