import { useState, useEffect } from "react";
import {
  getAllComments,
  userNewComment,
  userUpdateComment,
  deleteComment
} from "../../redux/actionCreators";
import styles from "./Comment.module.css";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({ commentsUrl, currentUserId }) => {
  const comments = useSelector((state) => state.comments)
  const idPost = "a8e35194-50bf-465d-8d99-9bdcdb732053"

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComments(idPost))
  }, []);

  return (
   <div className={styles.container}>
     {comments.length > 1 && comments}
   </div>
  );
};

export default Comments;
