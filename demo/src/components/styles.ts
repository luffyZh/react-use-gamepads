import styled from "styled-components";

export const Layout = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  height: 100vh;
  gap: 20px;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const BoardContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex: 1;
`;

export const Board = styled.div`
  width: 100%;
  height: 100%;
`;

export const RightSideContainer = styled.div`
  margin-left: 4px;
  width: 260px;
  height: 100%;
  text-align: left;
`;

export const RightSide = styled.div`
  color: #6473ff;
  height: 100%;
  position: relative;
`;

export const BlueBackground = styled.div`
  background-color: #6473ff;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const StartGameContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  > div {
    text-align: center;
  }
`;

export const PlayButton = styled.div`
  border: 1px solid #6473ff;
  color: #6473ff;
  background-color: transparent;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  width: fit-content;

  &:hover {
    background-color: #6473ff;
    color: #fff;
  }
`;

export const NoMobile = styled.div`
  margin-top: 50px;
`;
