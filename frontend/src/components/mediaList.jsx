import { useEffect, useState } from "react";
import { fetchAllMedia } from "../apis/mediaApis";
import MediaCard from "./mediaCard";

const MediaList = ({mediaList,handleDelete}) => {
  

 

  console.log("media_List: ",mediaList)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {mediaList.map((media) => (
        <MediaCard key={media._id} media={media} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default MediaList;
