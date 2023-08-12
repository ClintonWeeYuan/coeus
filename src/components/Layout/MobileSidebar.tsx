import React, { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MenuIcon from '@/components/common/MenuIcon';
import OutsideDetecter from '@/components/hooks/useOutsideDetect';
import SidebarItems from '@/components/Layout/SidebarItems';

const MobileSidebar: FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOutsideClick = () => {
    setOpenSidebar(false);
  };

  return (
    <OutsideDetecter
      callback={() => {
        handleOutsideClick();
      }}
    >
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="md:hidden btn btn-primary z-20 btn-circle fixed bottom-4 right-4"
      >
        <MenuIcon isOpen={openSidebar}/>
      </button>
      <AnimatePresence>
        {openSidebar && (
          <motion.aside
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ ease: 'linear' }}
            className="top-0 fixed left-0 z-50 h-full bg-secondary-500 w-3/5 md:hidden"
          >
            <SidebarItems/>
          </motion.aside>
        )}
      </AnimatePresence>
    </OutsideDetecter>
  );
};

export default MobileSidebar;
