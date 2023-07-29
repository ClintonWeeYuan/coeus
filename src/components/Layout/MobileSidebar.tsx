import React, { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { MdLibraryBooks } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';
import { AiFillSchedule } from 'react-icons/ai';
import useUser from '@/components/hooks/useUser';
import { trpc } from '@/utils/trpc';
import MenuIcon from '@/components/common/MenuIcon';
import OutsideDetecter from '@/components/hooks/useOutsideDetect';
import SidebarItems from '@/components/Layout/SidebarItems';

const links = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: <RiDashboardFill className="text-xl" />,
    },
    {
        name: 'Schedule',
        link: '/schedule',
        icon: <AiFillSchedule className="text-xl" />,
    },
    {
        name: 'Homework Assistant',
        link: '/homework',
        icon: <MdLibraryBooks className="text-xl" />,
    },
];

const MobileSidebar: FC = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleOutsideClick = () => {
        setOpenSidebar(false);
    };

    return (
        <OutsideDetecter
            callback={() => {
                console.log('HEY');
                handleOutsideClick();
            }}
        >
            <button
                onClick={() => setOpenSidebar(!openSidebar)}
                className="md:hidden btn btn-primary btn-circle absolute bottom-4 right-4"
            >
                <MenuIcon isOpen={openSidebar} />
            </button>
            <AnimatePresence>
                {openSidebar && (
                    <motion.aside
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        transition={{ ease: 'linear' }}
                        className="top-0 fixed left-0 z-20 h-full bg-secondary-500 w-3/5 md:w-1/3 lg:w-1/5"
                    >
                        <SidebarItems />
                    </motion.aside>
                )}
            </AnimatePresence>
        </OutsideDetecter>
    );
};

export default MobileSidebar;
