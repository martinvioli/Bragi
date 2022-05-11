import { useState, useEffect } from "react";
import {
  getAllComments,
  userNewComment,
  userUpdateComment,
  deleteComment,
} from "../../redux/actionCreators";
import styles from "./Comment.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import api from "../../Utils";
import { Button, Form, Input } from "reactstrap";

const Comments = ({ commentsUrl, currentUserId }) => {
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.user);
  const idPost = "a8e35194-50bf-465d-8d99-9bdcdb732053";

  const [causeReport, setCauseReport] = useState("");
  const [showReport, setShowReport] = useState(false);

  const handleChange = (e) => {
    setCauseReport(e.target.value);
  };

  const reportComment = async (e) => {
    //Necesitamos el id del user.
    e.preventDefault();
    const response = await axios.post(api.reportComment, {
      idComment: idPost,
      causeReport: causeReport ? causeReport : "Report without any cause",
      idUserReport: user.userId,
    });
    alert(response.data);
    setShowReport(false);
    setCauseReport("");
  };

  const handleShow = (e) => setShowReport(!showReport);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComments(idPost));
  }, []);

  return (
    <div className={styles.container}>
      {comments.length > 1 && comments}
      {showReport ? (
        <Form onSubmit={reportComment}>
          <Input
            type="text"
            value={causeReport}
            name="causeReport"
            onChange={handleChange}
          />
          <Input type="submit" value="Send report" />
        </Form>
      ) : (
        <Button onClick={handleShow}>Report</Button>
      )}
    </div>
  );
};

export default Comments;
