import styled from 'styled-components';

const StyledLayout = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const GamepadContainer = styled.div`
  position: relative;
  width: 1280px;
  height: 800px;
  display: flex;
  border: 40px solid #333333;
  box-sizing: content-box;
  border-radius: 120px;
`;

const GameLeftContainer = styled.div`
  position: relative;
  display: flex;
  width: 260px;
  height: 100%;
  flex-direction: column;
  background: rgba(100, 115, 255, 0.2);
  border-radius: 80px 0 0 80px;
  border-right: 10px solid #333;
  align-items: center;
  justify-content: center;
`;

const GameRightContainer = styled.div`
  position: relative;
  display: flex;
  width: 260px;
  height: 100%;
  flex-direction: column;
  background: rgba(100, 115, 255, 0.2);
  border-radius: 0 80px 80px 0;
  border-left: 10px solid #333;
  align-items: center;
  justify-content: center;
`;

const GameCenterContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 100%;
`;

const LAxisContainer = styled.div`
  position: relative;
  display: flex;
  width: 120px;
  height: 120px;
  background: rgba(100, 115, 255, 0.6);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;

  .center-axis {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(100, 115, 255, 0.8);
  }
`;

const RAxisContainer = styled.div`
  position: relative;
  display: flex;
  width: 120px;
  height: 120px;
  background: rgba(100, 115, 255, 0.6);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  margin-top: 60px;

  .center-axis {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(100, 115, 255, 0.8);
  }
`;

const OrientationContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;

  .item {
    width: 40px;
    height: 40px;
  }

  .btn {
    cursor: pointer;
    background: rgba(100, 115, 255, 0.6);
    border: 1px solid rgba(100, 115, 255, 0.8);
  }

  .btn:hover {
    background: rgba(100, 115, 255, 1);
  }

  .noborder {
    cursor: default;
    border: none;
  }

  .noborder: hover {
    background: rgba(100, 115, 255, 0.6);
  }

  .noborder-right {
    border-right: none;
  }

  .noborder-bottom {
    border-bottom: none;
  }

  .noborder-left {
    border-left: none;
  }

  .noborder-top {
    border-top: none;
  }
`;

const ActionContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;

  .item {
    width: 40px;
    height: 40px;
    color: #fff;
    font-weight: bold;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #141414;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6);
  }

  .orange {
    background: #ff8c16;
    box-shadow: 0 0 0 1px #d46b08;
  }
`;

export default function Layout({ children }: any) {
  return (
    <StyledLayout>
      <GamepadContainer>
        <GameLeftContainer>
          <LAxisContainer>
            <div className="center-axis"/>
          </LAxisContainer>
          <OrientationContainer>
            <div className="item" />
            <div className="item btn noborder-bottom" />
            <div className="item" />
            <div className="item btn noborder-right" />
            <div className="item btn noborder" />
            <div className="item btn noborder-left" />
            <div className="item" />
            <div className="item btn noborder-top" />
            <div className="item" />
          </OrientationContainer>
        </GameLeftContainer>
        <GameCenterContainer>{children}</GameCenterContainer>
        <GameRightContainer>
          <ActionContainer>
            <div className="item" />
            <div className="item cell orange">Y</div>
            <div className="item" />
            <div className="item cell">X</div>
            <div className="item" />
            <div className="item cell orange">B</div>
            <div className="item" />
            <div className="item cell">A</div>
            <div className="item" />
          </ActionContainer>
          <RAxisContainer>
            <div className="center-axis"/>
          </RAxisContainer>
        </GameRightContainer>
      </GamepadContainer>
    </StyledLayout>
  )
}