import { useEffect } from "react";
import useSound from "use-sound";
import Sound from "react-sound";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

import { useTetrisActions, useTetris } from "@/hooks/useTetris";
import {
  Board,
  Center,
  NoMobile,
  RightSide,
  PlayButton,
  BoardContainer,
  StartGameContainer,
  RightSideContainer,
  BlueBackground,
} from "./styles";
import Layout from "@/components/Layout";
import BoardCells from "@/components/BoardCells/BoardCells";
import InfoPanel from "@/components/InfoPanel/InfoPanel";
import GameOver from "@/components/GameOver/GameOver";
import useGamepads from "@/hooks/useGamepads";

let pressedKeys: { [key in string]: boolean } = {};
let moveCooldown = false;
let moveCooldownTimeout: NodeJS.Timeout;
const INPUT_INTERVAL = 50;
const MOVE_COOLDOWN = 200;

const TitleContainer = styled.div`
  position: absolute;
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  color: #6473ff;
  font-size: 32px;
  width: 100%;
  justify-content: center;
  letter-spacing: 10px;

  img {
    margin-right: 10px;
  }
`;


const Tetris = (): JSX.Element => {
  const [playMoveSFX] = useSound("/audio/move.wav", { volume: 0.25 });
  const [playRotateSFX] = useSound("/audio/rotate.wav", { volume: 0.25 });
  const [playPlaceSFX] = useSound("/audio/place.wav", { volume: 0.25 });
  const [playHardDropSFX] = useSound("/audio/hard-drop.wav", { volume: 0.25 });
  const [playLineClearSFX] = useSound("/audio/clear.wav", { volume: 0.25 });
  const [playGameOverSFX] = useSound("/audio/game-over.wav", { volume: 0.25 });
  const [playSRSTrickSFX] = useSound("/audio/srs-trick.wav", { volume: 0.25 });
  const [playTetrisSFX] = useSound("/audio/tetris.wav", { volume: 0.25 });

  const gamepads = useGamepads();

  console.log(gamepads, 3232323);

  const gameState = useTetris();
  const { rotate, move, start, fastDrop, hardDrop, toggleHint, registerCallback } = useTetrisActions();

  useEffect(() => {
    registerCallback("onMove", () => {
      playMoveSFX();
    });
    registerCallback("onRotate", () => {
      playRotateSFX();
    });
    registerCallback("onHardDrop", () => {
      playHardDropSFX();
    });
    registerCallback("onPlace", () => {
      playPlaceSFX();
    });
    registerCallback("onClear", () => {
      playLineClearSFX();
    });
    registerCallback("onGameOver", () => {
      playGameOverSFX();
    });
    registerCallback("onSRSTrick", () => {
      playSRSTrickSFX();
    });
    registerCallback("onTetris", () => {
      playTetrisSFX();
    });
  }, [
    registerCallback,
    playHardDropSFX,
    playMoveSFX,
    playRotateSFX,
    playLineClearSFX,
    playGameOverSFX,
    playSRSTrickSFX,
    playTetrisSFX,
    playPlaceSFX,
  ]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (pressedKeys["ArrowLeft"] && !moveCooldown) move("left");
      if (pressedKeys["ArrowRight"] && !moveCooldown) move("right");
    }, INPUT_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [rotate, start, move, fastDrop, hardDrop, toggleHint]);

  // 键盘操作
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" && !e.repeat) start();
      if (e.code === "ArrowLeft" && !e.repeat) {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = true;
        moveCooldownTimeout = setTimeout(() => {
          moveCooldown = false;
        }, MOVE_COOLDOWN);
        move("left");
      }
      if (e.code === "ArrowRight" && !e.repeat) {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = true;
        moveCooldownTimeout = setTimeout(() => {
          moveCooldown = false;
        }, MOVE_COOLDOWN);
        move("right");
      }
      if (e.code === "KeyZ" && !e.repeat) rotate("left");
      if (e.code === "KeyX" && !e.repeat) rotate("right");
      if (e.code === "ArrowDown") fastDrop(true);
      if (e.code === "ArrowUp" && !e.repeat) hardDrop();
      if (e.code === "KeyH" && !e.repeat) toggleHint();
      pressedKeys[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys[e.code] = false;
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = false;
      }
      if (e.code === "ArrowDown") fastDrop(false);
    };
    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("keyup", handleKeyUp, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("keydown", handleKeyUp, false);
    };
  }, [rotate, start, move, fastDrop, hardDrop]);

  // 手柄操作

  const handleStartClick = () => start();

  if (isMobile)
    return (
      <Layout>
        <NoMobile>
          <div>Sorry, this game only works on desktop</div>
        </NoMobile>
      </Layout>
    );

  return (
    <Layout>
      <TitleContainer>
        <img src="/logo.svg" />
        <h1>童年游戏厅</h1>
      </TitleContainer>
      <BoardContainer>
        <Board>
          {!gameState.started ? (
            <StartGameContainer>
              <BlueBackground />
              {gameState.gameOver && <GameOver />}
              <Center>
                <PlayButton onClick={handleStartClick}>
                  {gameState.gameOver ? "Play Again" : "Play Or Start"}
                </PlayButton>
              </Center>
            </StartGameContainer>
          ) : (
            <>
              <Sound
                url="/audio/BGM.mp3"
                playStatus={"PLAYING"}
                loop
                volume={20}
              />
              <BoardCells />
            </>
          )}
        </Board>
      </BoardContainer>
      <RightSideContainer>
        <RightSide>
          <BlueBackground />
          <InfoPanel />
        </RightSide>
      </RightSideContainer>
    </Layout>
  );
};

export default Tetris;
