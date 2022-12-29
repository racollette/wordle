import { useTileStyle } from "../hooks/useTileStyle";

interface BoardProps {
  board: string[];
  word: string;
  currentRow: number;
}

const Board = ({ board, word, currentRow }: BoardProps) => {
  return (
    <div className="mb-12">
      <div className={`grid grid-rows-${board.length} gap-6`}>
        {board.map((row, rowIndex) => {
          return (
            <div
              key={rowIndex}
              className={`grid grid-cols-${board.length} gap-4`}
            >
              {row.split("").map((col, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    // style={{
                    //   transition: "transform 1s",
                    //   transform: "rotateY(360deg)",
                    // }}
                    className={`transition-colors ease-in duration-300 aspect-square border-4 rounded-lg flex items-center justify-center ${useTileStyle(
                      col,
                      colIndex,
                      word,
                      currentRow,
                      rowIndex,
                      board[rowIndex]
                    )}`}
                  >
                    <div className="text-5xl font-extrabold uppercase">
                      {col}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
