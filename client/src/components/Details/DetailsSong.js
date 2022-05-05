import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongByID } from "../../redux/actionCreators";

const DetailsSong = () => {
  const id = useParams().id;
  const song = useSelector((state) => state.songById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongByID(id));
    console.log(song);
  }, []);

  return (
    <>
      <div>Hello World</div>
    </>
  );
};

export default DetailsSong;
