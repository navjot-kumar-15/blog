import React from "react";
import { dateConverter, URL_IMG } from "../lib/utils";
import { Link } from "react-router-dom";

const Card = ({ post }) => {
  return (
    <>
      <Link to={`/details/${post.id}`}>
        <div className="max-w-md w-[100vw] bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
          <div className="relative">
            <img
              className="w-full h-64 object-cover"
              src={`${URL_IMG}${post?.image}`}
              alt="Nature scene"
            />
            <div className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
              Featured
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {post?.title}
            </h2>
            <p className="text-gray-600 mb-4">{post?.description}</p>
            <div>
              <p className="text-gray-400 italic">By: {post?.User?.name}</p>
              <p className="text-gray-400 italic">
                Date : {dateConverter(post?.createdAt).split(" ")[0]}{" "}
                {dateConverter(post?.createdAt).split(" ")[1]}
              </p>
            </div>
            <div className="flex items-center mb-4 mt-3">
              <span className="text-gray-600 ml-1">
                <i class="ri-heart-fill text-red-500 text-2xl"></i>
              </span>
            </div>
            <div>
              <span className="text-gray-400 text-center w-[100%] inline-block">
                view more
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
