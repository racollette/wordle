type ToastProps = {
  message: string;
};

const Toast = ({ message }: ToastProps) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -45%) rotate(0deg)",
      top: "45%",
      left: "50%",
    }}
    className={`text-white bg-neutral-700 p-6 text-2xl rounded-xl`}
  >
    <div>{message}</div>
  </div>
);

export default Toast;
