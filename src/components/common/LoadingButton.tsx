import { FC } from 'react';

interface Props {
    isLoading: boolean;
    text: string;
    className?: string;
}
const LoadingButton: FC<Props> = ({ isLoading, text, className }) => {
    return (
        <button
            type="submit"
            className={`${className} btn btn-primary btn-block`}
        >
            {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
            ) : (
                text
            )}
        </button>
    );
};

export default LoadingButton;
