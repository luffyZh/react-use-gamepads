import { useTetris } from "@/hooks/useTetris";
import { GameOverContainer } from "./styles";

const GameOver = (): JSX.Element => {
  const gameState = useTetris();

  return (
    <GameOverContainer>
      <h1>Game Over!</h1>
      <h2>Score: {gameState.score}</h2>
    </GameOverContainer>
  );
};

export default GameOver;
