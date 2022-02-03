import React from "react";

import Logo from "assets/logo.svg";

import Header from "components/common/Header";
import { useNavigate } from "react-router-dom";
import FeedPost from "components/FeedPage/FeedPost";

import styles from "styles/FeedPage/FeedPage.module.scss";

interface Icomment {
  message: string;
  timestamp: 1642052147000;
  author: string;
}
interface PostProps {
  image: Array<string>;
  title: string;
  caption: string;
  likes: number;
  userLike: Array<string>;
  comments?: Icomment[];
  timestamp: number;
  sellPost?: boolean;
  postType?: string;
  price?: number;
}

const FeedPage = () => {
  const initialFeedData: PostProps[] = [
    {
      image: [
        "https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg",
        "https://imagedesigncom.com/wp-content/uploads/2013/02/cool-nature-wallpapers-hd-1920x1200.jpg",
        "https://trendsinusa.com/wp-content/uploads/2018/01/wallpaper.wiki-Amazing-views-cool-nature-photos-1920x1140-PIC-WPE0012823.jpg",
      ],
      timestamp: 1642052147000,
      title: "Post Title",
      caption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      likes: 0,
      userLike: [],
      comments: [
        {
          message: "Good Pic",
          timestamp: 1642052147000,
          author: "Tony Stark",
        },
        {
          message: "Better Picture",
          timestamp: 1642052147000,
          author: "Tony Stark",
        },
      ],
    },
    {
      image: [
        "https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg",
        Logo,
      ],
      timestamp: 1641052147000,
      title: "Post Title",
      caption:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      likes: 0,
      userLike: [],
      sellPost: true,
      postType: "Photograph",
      price: 1500000,
    },
  ];
  const [FeedPostsData, setFeedPostsData] =
    React.useState<PostProps[]>(initialFeedData);

  const handleChangeLike = (index: number) => {
    const existingData = Array.from(FeedPostsData);
    let currentFeedPost: PostProps = existingData[index];
    if (currentFeedPost.userLike && currentFeedPost.userLike.length > 0) {
      if (currentFeedPost.userLike.includes("123456789")) {
        const NewFeedPost = currentFeedPost.userLike.filter(
          (feedPostFilter) => feedPostFilter !== "123456789"
        );
        currentFeedPost.userLike = NewFeedPost;
        currentFeedPost.likes = currentFeedPost.userLike.length;
      } else {
        currentFeedPost.userLike.push("123456789");
        currentFeedPost.likes = currentFeedPost.userLike.length;
      }
    } else {
      currentFeedPost.userLike = ["123456789"];
      currentFeedPost.likes = currentFeedPost.userLike.length;
    }
    console.log(currentFeedPost);
    existingData[index] = currentFeedPost;
    setFeedPostsData(existingData);
  };

  return (
    <div>
      <Header navigate={useNavigate()} />
      <div className={styles["post-container"]}>
        {FeedPostsData
          ? Array.from(FeedPostsData).map((feedData, FpIndex) => {
              return (
                <React.Fragment key={FpIndex}>
                  <FeedPost
                    imgs={feedData.image}
                    timestamp={feedData.timestamp}
                    title={feedData.title}
                    caption={feedData.caption}
                    likes={feedData.likes}
                    sellPost={feedData.sellPost}
                    postType={feedData.postType}
                    price={feedData.price}
                    index={FpIndex}
                    comments={feedData.comments}
                    userLike={feedData.userLike}
                    handleChangeLike={handleChangeLike}
                  />
                </React.Fragment>
              );
            })
          : null}

        {/* <FeedPost
          imgs={[
            "https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg",
            Logo,
          ]}
          timestamp={1641052147000}
          title="Post Title"
          caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          likes={0}
          sellPost={true}
          postType="Photograph"
          price={1500000}
        /> */}
      </div>
    </div>
  );
};

export default FeedPage;
