import React from "react";
import { useParams } from "react-router-dom";

const DetailPost = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Details posts</div>;
};

export default DetailPost;
