import { useEffect, useState } from "react";
import { useTetris } from "@/hooks/useTetris";
import { LeaderboardContainer, ScoresContainer, ScoreRow } from "./styles";

const medals = {
  0: "🥇",
  1: "🥈",
  2: "🥉",
} as { [key in number]: string };

const Leaderboard = (): JSX.Element => {
  const gameState = useTetris();

  return (
    <LeaderboardContainer>
      <h2 style={{ marginBottom: 16 }}>Gameboard</h2>
      <h2>{gameState.gameOver ? 'Game Over！' : gameState.started ? 'Started~~' : 'Unstarted~~'}</h2>
      {/* <ScoresContainer>
        {scores.map((score: any, index) => (
          <ScoreRow
            isHighlighted={score.id === gameState.scoreId}
            key={score.id}
          >
            <div>
              {medals[index] && `${medals[index]} `}
              {score.name}
            </div>
            <div>{score.score}</div>
          </ScoreRow>
        ))}
      </ScoresContainer> */}
    </LeaderboardContainer>
  );
};

export default Leaderboard;
