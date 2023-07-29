import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { MdLibraryBooks } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';
import { AiFillSchedule } from 'react-icons/ai';
import useUser from '@/components/hooks/useUser';
import { trpc } from '@/utils/trpc';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import MenuIcon from '@/components/common/MenuIcon';
import OutsideDetecter from '@/components/hooks/useOutsideDetect';

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

const Sidebar: FC = () => {
    const router = useRouter();
    const { user } = useUser();

    const { mutateAsync } = trpc.session.logout.useMutation();

    const [openSidebar, setOpenSidebar] = useState(false);

    const windowSize = useWindowSize();

    useEffect(() => {
        if (windowSize.width && windowSize.width > 1024) {
            setOpenSidebar(true);
        } else {
            setOpenSidebar(false);
        }
    }, [windowSize]);

    const logout = async (): Promise<void> => {
        await mutateAsync();
        await router.push('/login');
    };

    return (
        <OutsideDetecter callback={() => setOpenSidebar(false)}>
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
                        <div className="h-full w-full text-neutral-light py-4 px-4">
                            <div className="flex justify-center">
                                <Image
                                    src="/logo-white-high-res.png"
                                    alt="Logo"
                                    width={150}
                                    height={150}
                                />
                            </div>

                            <div className="flex flex-col py-4">
                                {links.map((link) => (
                                    <div
                                        key={link.name}
                                        className="flex relative items-center p-2 hover:bg-secondary-300 hover:cursor-pointer rounded-lg mb-2"
                                    >
                                        {router.pathname === link.link ? (
                                            <motion.div
                                                layoutId="underline"
                                                className="absolute top-0 left-0 z-10 w-full h-full bg-secondary-300 rounded-lg"
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        <Link
                                            className="z-20 w-full flex items-center px-2 py-2"
                                            href={link.link}
                                        >
                                            {link.icon}
                                            <p className="ml-2">{link.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p>
                                    {user?.firstName} {user?.lastName}
                                </p>
                            </div>

                            <button
                                className="btn btn-error"
                                type="button"
                                onClick={() => logout()}
                            >
                                Logout
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </OutsideDetecter>
    );
};

export default Sidebar;
