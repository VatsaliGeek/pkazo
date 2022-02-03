import React from "react";
import { Modal } from "react-bootstrap";
import styles from "styles/FeedPage/Comment.module.scss";
import {
  formatTime,
  formatCount,
  formatCurrency,
} from "components/common/NumberFormat";

interface Icomment {
  message: string;
  timestamp: 1642052147000;
  author: string;
}

interface Props {
  show: boolean;
  handleClose: () => void;
  comment: Icomment[];
}

const CommentsModal = (props: Props) => {
  const Placeholder =
    "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg";

  console.log(props.comment);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {Array.from(props.comment).map((comment, cIndex) => {
              return (
                <React.Fragment key={cIndex}>
                  <div className={styles["comment-container"]}>
                    <div>
                      <img
                        className={styles["profile-picture"]}
                        alt="author pfp"
                        src={Placeholder}
                      />
                    </div>
                    <div className={styles["comment-content"]}>
                      <div className={styles["comment-content-line"]}>
                        <div className={styles["comment-AN"]}>{comment.author}</div>
                        <div>
                          <p className="mb-0">{comment.message}</p>
                        </div>
                      </div>
                      <div>
                        <div>{formatTime(comment.timestamp)}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentsModal;
