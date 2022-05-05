import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAlbumByID } from "../../redux/actionCreators";

const DetailsAlbum = () => {
  const id = useParams().id;
  const album = useSelector((state) => state.albumById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbumByID(id));
    album && console.log(album);
  }, []);

  return (
    <>
      <div>Hello World</div>
    </>
  );
};

export default DetailsAlbum;
