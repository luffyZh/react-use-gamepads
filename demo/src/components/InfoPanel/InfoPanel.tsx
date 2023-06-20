import { useTetris, useTetrisActions } from "@/hooks/useTetris";
import {
  Key,
  Center,
  Content,
  ControlRow,
  ControlsContainer,
  InfoPanelContainer,
  GamepadContainer,
} from "./styles";
import ActiveGame from "@/components/InfoPanel/ActiveGame/ActiveGame";
import Leaderboard from "@/components/InfoPanel/Leaderboard/Leaderboard";
import { PlayButton } from "../styles";

const InfoPanel = ({ gamepads, pressedButton }: any): JSX.Element => {
  const gameState = useTetris();
  const { toggleHint } = useTetrisActions();
  return (
    <InfoPanelContainer>
      <Content>{gameState.started ? <ActiveGame /> : <Leaderboard />}</Content>
      <GamepadContainer>
        <h2>Gamepad Status</h2>
        {
          !gamepads?.length ? (
            <ControlRow style={{ justifyContent: 'center', alignItems: 'center' }}>
              <h3>未检测到手柄连接</h3>
            </ControlRow>
          ) : gamepads.map((_: any, index: number) => (
            <ControlRow key={index}>
              <h4>Gamepad {index + 1} <span style={{ color: 'green' }}>Connected</span></h4>
              <Center>
                <Key>{pressedButton?.[0]}</Key>
              </Center>
            </ControlRow>
          ))
        }
      </GamepadContainer>
      <ControlsContainer>
        <h2>Controls</h2>
        <ControlRow>
          <h4>Start</h4>
          <Center>
            <Key>A</Key>
            <Key>↵</Key>
          </Center>
        </ControlRow>
        <ControlRow>
          <h4>Rotate</h4>
          <Center>
            <Key>Z</Key>
            <Key>X</Key>
          </Center>
        </ControlRow>
        <ControlRow>
          <h4>Move</h4>
          <Center>
            <Key>←</Key>
            <Key>→</Key>
          </Center>
        </ControlRow>
        <ControlRow>
          <h4>Fast Drop</h4>
          <Key>↓</Key>
        </ControlRow>
        <ControlRow>
          <h4>Hard Drop</h4>
          <Key>↑</Key>
        </ControlRow>
        <ControlRow style={{ display: 'flex', justifyContent: 'center' }}>
          <PlayButton onClick={toggleHint}>{!gameState.hint ? 'Show Hint' : 'Close Hint'}</PlayButton>
        </ControlRow>
      </ControlsContainer>
    </InfoPanelContainer>
  );
};

export default InfoPanel;
