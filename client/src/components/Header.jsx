import React, { useRef, useState } from "react";
import { Avatar } from "flowbite-react";
import ModalC from "./ModalC";
const Header = () => {
  const inputRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  const handleMouseEnter = () => {
    inputRef.current.focus();
  };
  const handleMouseLeave = () => {
    inputRef.current.blur();
  };
  return (
    <>
      <div className="h-[8vh] flex items-center p-3">
        <div className="text-2xl font-extrabold">Bloggg</div>
        <div
          className="m-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search here..."
            className=" border-b-2 border-l-0 border-t-0 border-r-0"
          />
        </div>
        <div className="block lg:hidden">
          <Avatar
            img="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg"
            rounded
            bordered
          />
        </div>
        <div
          className="hidden lg:block pr-[5rem] flex gap-3 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Create Blog <i class="ri-file-add-line text-xl"></i>
        </div>
      </div>
      <ModalC openModal={openModal} setOpenModal={setOpenModal}>
        hello
      </ModalC>
    </>
  );
};

export default Header;