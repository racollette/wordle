type AlertProps = {
  type: string;
  resetGame: () => void;
  word: string;
};

const Alert = ({ type, resetGame, word }: AlertProps) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -42.5%) rotate(0deg)",
      top: "42.5%",
      left: "50%",
    }}
    className="bg-neutral-900 p-8 text-4xl rounded-lg w-96 drop-shadow-lg cursor-pointer"
  >
    <div>You {type === "win" ? "won" : "lost"}!</div>
    {type === "lose" && (
      <div className="mt-4 text-base">
        The word was{"  "}
        <span className="text-xl font-bold">{word.toUpperCase()}</span>
      </div>
    )}
    <button
      className={`${
        type === "win" ? " border-green-700" : " border-red-600"
      } text-2xl mt-4 rounded-lg border-2 p-4 w-full uppercase`}
      onClick={() => resetGame()}
    >
      Restart
    </button>
  </div>
);

export default Alert;
