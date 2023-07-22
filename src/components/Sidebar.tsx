import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { MdLibraryBooks } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";

const links = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <RiDashboardFill className="text-xl" />,
  },
  {
    name: "Schedule",
    link: "/schedule",
    icon: <AiFillSchedule className="text-xl" />,
  },
  {
    name: "Homework Assistant",
    link: "/homework",
    icon: <MdLibraryBooks className="text-xl" />,
  },
];

const Sidebar: FC = () => {
  const router = useRouter();

  return (
    <div className="h-full bg-secondary-500 text-neutral-light py-4 px-4">
      <div className="flex justify-center">
        <Image
          src="/logo-white-high-res.png"
          alt="Logo"
          width={150}
          height={150}
        />
      </div>

      <div className="flex flex-col py-4">
        {links.map((link, index) => (
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
    </div>
  );
};

export default Sidebar;
