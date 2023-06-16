import { useTetris } from "@/hooks/useTetris";
import { HIDDEN_ROWS } from "@/helpers/tetris.constants";
import { isTetriminoInPosition } from "@/helpers/tetris.helpers";
import { ContainerDiv, RowDiv, CellDiv } from "./styles";
import Cell from "@/components/BoardCells/Cell";

const BoardCells = (): JSX.Element => {
  const gameState = useTetris();

  return (
    <ContainerDiv>
      {gameState.placedTetrominos.map((row, rowIndex) => {
        if (rowIndex < HIDDEN_ROWS) return;
        return (
          <RowDiv key={`row-${rowIndex}`}>
            {row.map((cell, colIndex) => {
              const point = { row: rowIndex, col: colIndex } as BoardPoint;
              // 当前位置
              if (
                isTetriminoInPosition(gameState.activeTetromino.position, point)
              ) {
                return (
                  <CellDiv key={`active-tetromino-${rowIndex}-${colIndex}`}>
                    <Cell tetromino={gameState.activeTetromino.type} />
                  </CellDiv>
                );
              } else {
                // 目标位置
                if (
                  isTetriminoInPosition(
                    gameState.activeTetromino.projectedPlacePosition,
                    point
                  )
                ) {
                  return gameState.hint ? (
                    <CellDiv
                      key={`projected-place-position-${rowIndex}-${colIndex}`}
                    >
                      <Cell
                        tetromino={gameState.activeTetromino.type}
                        isProjection
                      />
                    </CellDiv>
                  ) : (
                    <CellDiv key={`cell-${rowIndex}-${colIndex}`}>
                      <Cell tetromino={cell.tetromino} />
                    </CellDiv>
                  );
                } else {
                  return (
                    <CellDiv key={`cell-${rowIndex}-${colIndex}`}>
                      <Cell tetromino={cell.tetromino} />
                    </CellDiv>
                  );
                }
              }
            })}
          </RowDiv>
        );
      })}
    </ContainerDiv>
  );
};

export default BoardCells;
