import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetails, getArtistByID } from "../../redux/actionCreators";

const DetailsArtist = () => {
  const id = useParams().id;
  const artist = useSelector((state) => state.artistById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistByID(id));
    return dispatch(clearDetails());
  }, []);

  return (
    <>
      <div>Hello World</div>
    </>
  );
};

export default DetailsArtist;
