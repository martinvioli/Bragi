import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getArtistByID } from "../../redux/actionCreators";

const DetailsArtist = () => {
  const id = useParams().id;
  const artist = useSelector((state) => state.artistById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistByID(id));
    console.log(artist);
  }, []);

  return (
    <>
      <div>Hello World</div>
    </>
  );
};

export default DetailsArtist;
