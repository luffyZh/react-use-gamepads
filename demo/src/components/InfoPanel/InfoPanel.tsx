import { useTetris, useTetrisActions } from "@/hooks/useTetris";
import {
  Key,
  Center,
  Content,
  ControlRow,
  ControlsContainer,
  InfoPanelContainer,
} from "./styles";
import ActiveGame from "@/components/InfoPanel/ActiveGame/ActiveGame";
import Leaderboard from "@/components/InfoPanel/Leaderboard/Leaderboard";
import { PlayButton } from "../styles";

const InfoPanel = (): JSX.Element => {
  const gameState = useTetris();
  const { toggleHint } = useTetrisActions();

  return (
    <InfoPanelContainer>
      <Content>{gameState.started ? <ActiveGame /> : <Leaderboard />}</Content>
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
