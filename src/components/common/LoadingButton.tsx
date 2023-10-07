import { FC } from 'react';

interface Props {
    isLoading: boolean;
    text: string;
    onClick?: () => void;
    className?: string;
    isSubmit? : boolean;
}
const LoadingButton: FC<Props> = ({ isLoading, text, className, onClick, isSubmit }) => {
    return (
      <button  type={isSubmit ? "submit" : "button"}  className={`${className} btn btn-primary btn-block`} onClick={onClick}>
          {isLoading && <span className="absolute loading loading-spinner loading-md"></span>}
          <p className={`${isLoading ? "opacity-0" : "opacity-100"}`}>{text}</p>
      </button>
    );
};

export default LoadingButton;
