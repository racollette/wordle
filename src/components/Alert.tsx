type AlertProps = {
  type: string;
};

const Alert = ({ type }: AlertProps) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -35%) rotate(0deg)",
      top: "35%",
      left: "50%",
    }}
    className={`${
      type === "win" ? " border-green-700" : " border-red-600"
    } bg-neutral-900 border-4 p-8 pl-12 pr-12 text-4xl rounded-lg drop-shadow-lg cursor-pointer`}
  >
    <div>You {type === "win" ? "won" : "lost"}!</div>
    <button
      className="text-2xl mt-8 rounded-lg border-inherit border-2 p-4"
      onClick={() => console.log("reset game")}
    >
      Restart
    </button>
  </div>
);

export default Alert;
