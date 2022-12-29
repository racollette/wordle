type ToastProps = {
  message: string;
};

const Toast = ({ message }: ToastProps) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -35%) rotate(0deg)",
      top: "35%",
      left: "50%",
    }}
    className={`text-white bg-neutral-900 border-4 p-8 text-3xl rounded-lg w-1/2`}
  >
    <div>{message}</div>
  </div>
);

export default Toast;
