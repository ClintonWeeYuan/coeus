import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onClick: () => void;
}
const Backdrop: FC<Props> = ({ children, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            style={{ opacity: 0.1 }}
            className="fixed w-screen h-screen px-4 bg-gray-800 bg-opacity-50 top-0 left-0 z-50 md:inset-0 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default Backdrop;
