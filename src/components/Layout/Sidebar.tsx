import React, { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import SidebarItems from '@/components/Layout/SidebarItems';

const Sidebar: FC = () => {
    return (
        <>
            <AnimatePresence>
                <div className="top-0 fixed left-0 z-20 h-full bg-secondary-500 w-1/4 max-w-md min-w-max">
                    <div className="h-full w-full text-neutral-light py-4 px-4">
                        <SidebarItems />
                    </div>
                </div>
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
