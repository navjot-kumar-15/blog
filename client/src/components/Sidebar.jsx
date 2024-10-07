import React from "react";
import { Dropdown } from "flowbite-react";

import { Kbd } from "flowbite-react";

const SidebarC = () => {
  return (
    <>
      <div className="pt-[5rem] shadow-lg h-screen">
        {/* Categories Box  */}
        <div className="flex flex-wrap flex-col gap-3 mt-[2rem] mb-[3rem]">
          <div className="text-center font-semibold">Categories</div>
          <div className="w-auto flex flex-wrap justify-center">
            <Kbd>Shift</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Shift</Kbd>
          </div>
        </div>

        {/* Filter box  */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-4 items-center justify-center">
            <div>Filter By : </div>
            <span>
              <Dropdown
                label=""
                className="bg-white"
                style={{ backgroundColor: "gray", height: "4vh", width: "3vw" }}
              >
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Dropdown>
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div>Sort By : </div>
            <span>
              <Dropdown
                label=""
                className="bg-white"
                style={{ backgroundColor: "gray", height: "4vh", width: "3vw" }}
              >
                <Dropdown.Item>A-Z</Dropdown.Item>
              </Dropdown>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarC;
