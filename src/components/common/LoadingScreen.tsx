import { FC } from 'react';

const LoadingScreen: FC = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    );
};

export default LoadingScreen;
