import React, { useState } from "react";

import HeartIcon from "assets/posticons/heart.svg";
import LikedHeartIcon from "assets/posticons/likedheart.svg";
import CommentIcon from "assets/posticons/comment.svg";
import SaveIcon from "assets/posticons/save.svg";
import ShareIcon from "assets/posticons/share.svg";
import SellIcon from "assets/posticons/sell.svg";
import ArrowIcon from "assets/posticons/arrow.svg";

import { /*getAuth,*/ User } from "firebase/auth";
import {
  formatTime,
  formatCount,
  formatCurrency,
} from "components/common/NumberFormat";
// import { getProfilePicture } from 'api/auth/firebaseAuthApi';
import CommentsModal from "components/FeedPage/Comments/CommentsModal";

import styles from "styles/FeedPage/FeedPost.module.scss";

/*
inputs needed for a post:
author          creator of post
imgs            images in post
title           title of post
caption         caption of post
likes           number of likes
comments        list of all comments
timestamp       time when posted (MILLISECONDS since epoch)
currentUser     user viewing the post (have they liked the post)

sellPost        is post for selling
postType        type of art (when sellPost = true)
price           price of art
*/

interface Icomment {
  message: string;
  timestamp: 1642052147000;
  author: string;
}
interface PostProps {
  author?: User;
  imgs: Array<string>;
  title: string;
  caption: string;
  likes: number;
  comments?: Icomment[];
  userLike: Array<string>;
  timestamp: number;
  currentUser?: User | null;
  sellPost?: boolean;
  postType?: string;
  price?: number;
  index: number;
  handleChangeLike: (index: number) => void;
}
const FeedPost = (props: PostProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  const nextImg = () =>
    setImgIndex(Math.min(imgIndex + 1, props.imgs.length - 1));
  const prevImg = () => setImgIndex(Math.max(imgIndex - 1, 0));

  const Placeholder =
    "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg";
  const ImageButton =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/640px-Circle_-_black_simple.svg.png";
  const userLikedPost = props.userLike.includes("123456789");
  const numLikes = formatCount(props.likes);
  const numComments = props.comments ? formatCount(props.comments.length) : "";

  const [viewComment, setViewComment] = React.useState<boolean>(false);
  

  const postTitle = () => {
    if (props.sellPost) {
      return (
        <div className={styles["sell-box"]}>
          <div>
            <div
              className={styles["post-title"]}
              style={{ lineHeight: "100%", marginBottom: "12px" }}
            >
              {props.title}
            </div>
            <div className={styles["post-type"]}>{props.postType}</div>
          </div>
          <div className={styles["price"]}>{formatCurrency(props.price)}</div>
          <img alt="sell arrow" src={ArrowIcon} width="10px" height="16px" />
        </div>
      );
    } else {
      return <div className={styles["post-title"]}>{props.title}</div>;
    }
  };

  return (
    <>
      <div className={styles["post-border"]}>
        <div style={{ float: "left" }}>
          <img
            alt="author pfp"
            src={Placeholder}
            className={styles["profile-picture"]}
          />
        </div>
        <p className={styles["author-name"]}> Author Name </p>
        <p className={styles["author-location"]}> Author Location </p>
        <div style={{ position: "relative" }}>
          <img
            alt="post content"
            src={props.imgs[imgIndex]}
            className={styles["post-content"]}
          />
          {imgIndex > 0 && (
            <img
              alt="left"
              src={ImageButton}
              className={styles["content-button"]}
              style={{ left: "20px" }}
              onClick={prevImg}
            />
          )}
          {imgIndex < props.imgs.length - 1 && (
            <img
              alt="left"
              src={ImageButton}
              className={styles["content-button"]}
              style={{ right: "20px" }}
              onClick={nextImg}
            />
          )}
          {props.sellPost && (
            <img
              alt="sell tag"
              src={SellIcon}
              style={{ position: "absolute", right: "20px", bottom: "35px" }}
              width="32px"
              height="32px"
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {props.imgs.map((_, i) => {
            return (
              <span
                key={i}
                className={styles["dot"]}
                style={{
                  backgroundColor: imgIndex === i ? "#D25853" : "#C4C4C4",
                }}
              />
            );
          })}
        </div>
        <div className={styles["post-body"]}>
          <div className={styles["timestamp"]}>
            {formatTime(props.timestamp)}
          </div>
          {postTitle()}
          <div className={styles["post-caption"]}>{props.caption}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              margin: "11px 0 20px",
            }}
          >
            <span
              onClick={() => {
                console.log("123");
                if (props.handleChangeLike) {
                  props.handleChangeLike(props.index);
                }
              }}
            >
              <img
                alt="likes"
                src={userLikedPost ? LikedHeartIcon : HeartIcon}
                className={styles["icon"]}
                width="24px"
                height="21px"
              />
            </span>
            <div
              className={styles["count"]}
              style={{
                color: userLikedPost ? "#D25853" : "#5A5A5A",
                marginRight: numLikes && "30px",
                width: userLikedPost ? "auto" : "40px",
              }}
            >
              {numLikes}
            </div>
            <span
              onClick={() => {
                  console.log(props.comments);
                  
                if (props.comments) {
                  setViewComment(true);
                }
              }}
            >
              <img
                alt="comments"
                src={CommentIcon}
                className={styles["icon"]}
                width="22px"
                height="22px"
              />
            </span>
            <div
              className={styles["count"]}
              style={{ marginRight: numComments && "30px" }}
            >
              {numComments}
            </div>
            <img
              alt="share button"
              src={ShareIcon}
              className={styles["icon"]}
              width="24px"
              height="19px"
            />
            <img
              alt="save button"
              src={SaveIcon}
              style={{ marginLeft: "auto" }}
              className={styles["icon"]}
              width="20px"
              height="22px"
            />
          </div>
        </div>
      </div>
      {props.comments && (
        <CommentsModal
          show={viewComment}
          comment={props.comments}
          handleClose={() => {
            setViewComment(false);
          }}
        />
      )}
    </>
  );
};

export default FeedPost;
