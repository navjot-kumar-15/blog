import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, userProfile } from "../features/auth/authSlice";
import { Avatar } from "flowbite-react";
import { dateConverter, URL_IMG } from "../lib/utils";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(userProfile());
  }, []);
  return (
    <>
      <div className="m-10 max-w-sm w-auto">
        <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
          <div className="relative mx-auto w-[10vw]  rounded-full  ">
            <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2 z-20" />
            <div className="h-[18vh]">
              <Avatar
                img={`${URL_IMG}${user?.details?.image}`}
                rounded
                bordered
                className=""
                size="xl"
              />
            </div>
          </div>
          <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
            {user?.details?.name}
          </h1>
          <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
            {user?.details?.email}
          </h3>

          <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li className="flex items-center py-3 text-sm">
              <span>Status</span>
              <span className="ml-auto">
                <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                  {user?.details?.isActive ? "active" : "inactive"}
                </span>
              </span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span>Joined On</span>
              <span className="ml-auto">
                {dateConverter(user?.details?.createdAt)}
              </span>
            </li>
            <li className="flex items-center py-3 text-sm ">
              <button
                className="text-red-500 mx-auto font-extrabold cursor-pointer"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
