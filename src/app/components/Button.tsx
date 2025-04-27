import { FC } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
