import React, { useEffect, useState } from "react";
import { Header, Profile, SidebarC } from "../components";
import { Button, Drawer, Kbd, Dropdown } from "flowbite-react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../features/posts/postSlice";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const handleClose = () => setIsOpen(false);
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <>
      <Header />
      <div className="flex w-full h-auto shadow-lg gap-2">
        <div className=" hidden lg:block lg:w-[20%]">
          <SidebarC />
        </div>
        <div className="w-[100%] flex justify-center lg:w-[50%] relative">
          <span
            className="block absolute top-0 right-5  lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <i className="ri-menu-5-fill block text-2xl"></i>
          </span>
          <div className="pl-[2rem] pr-[2rem] w-[100%] pt-[4rem] pb-[3rem] flex items-center flex-col h-auto gap-[2rem] ">
            <div>
              <h1 className="text-xl font-semibold">New Thoughts</h1>
            </div>

            {posts && posts.map((post, i) => <Card post={post} />)}
          </div>
        </div>
        <div className=" hidden lg:block lg:w-[30%] mt-[5rem]">
          <Profile />
        </div>
      </div>

      {/* Drawer  */}
      <Drawer open={isOpen} onClose={handleClose} className="h-screen">
        <Drawer.Items>
          <div className="pt-[5rem]">
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
                    style={{
                      backgroundColor: "white",
                      color: "black",
                    }}
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
                    style={{
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    <Dropdown.Item>A-Z</Dropdown.Item>
                  </Dropdown>
                </span>
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>

      {/* create post modal */}
    </>
  );
};

export default Home;
