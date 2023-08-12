import React, { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RiDashboardFill } from 'react-icons/ri';
import { AiFillSchedule } from 'react-icons/ai';
import { MdLibraryBooks } from 'react-icons/md';
import useUser from '@/components/hooks/useUser';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';
import { LuLogOut } from 'react-icons/lu';
import { IoSettingsSharp } from 'react-icons/io5';
import { LuBrainCircuit } from 'react-icons/lu';

const links = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: <RiDashboardFill className="text-xl"/>,
  },
  {
    name: 'Schedule',
    link: '/schedule',
    icon: <AiFillSchedule className="text-xl"/>,
  },
  {
    name: 'Homework Assistant',
    link: '/homework',
    icon: <MdLibraryBooks className="text-xl"/>,
  },
  {
    name: 'Knowledge Base',
    link: '/knowledgebase',
    icon: <LuBrainCircuit className="text-xl"/>,
  },
];

const SidebarItems: FC = () => {
  const { user } = useUser();

  const router = useRouter();

  const { mutateAsync } = trpc.session.logout.useMutation();

  const logout = async (): Promise<void> => {
    await mutateAsync();
    await router.push('/login');
  };

  return (
    <div className="h-full w-full text-neutral-light py-4 px-4">
      <div className="flex justify-center">
        <Image
          src="/logo-white-high-res.png"
          alt="Logo"
          width={150}
          height={150}
        />
      </div>

      <div className="flex-col flex py-4">
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

      <div className="flex flex-col px-4 w-full absolute bottom-8 left-0 py-4">
        <div className="flex items-center">
          <div className="avatar placeholder mr-4">
            <div className="bg-neutral-focus text-xl text-neutral-content rounded-full w-16">
              <span>CW</span>
            </div>
          </div>
          <div className="flex flex-col text-sm">
            <p className="font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-gray-300">{user?.email}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-ghost bg-gray-500 hover:text-neutral-light mr-2"
            type="button"
          >
            <IoSettingsSharp/>
          </button>

          <button
            className="btn btn-error hover:text-neutral-light"
            type="button"
            onClick={() => logout()}
          >
            <LuLogOut className=""/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarItems;
