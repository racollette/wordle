import { useTileStyle } from "../hooks/useTileStyle";

interface BoardProps {
  board: string[];
  word: string;
  currentRow: number;
}

const Board = ({ board, word, currentRow }: BoardProps) => {
  return (
    <div className="lg:max-w-2xl md:max-w-xl">
      <div className={`grid grid-rows-5 gap-4 md:gap-4`}>
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={`grid grid-cols-5 gap-2 md:gap-2`}>
              {row.split("").map((col, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className={`transition-colors ease-in duration-300 p-4 w-16 md:w-28 md:aspect-square rounded-lg flex items-center justify-center ${useTileStyle(
                      col,
                      colIndex,
                      word,
                      currentRow,
                      rowIndex,
                      board[rowIndex]
                    )}`}
                  >
                    <div className="text-2xl md:text-4xl font-extrabold uppercase">
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
