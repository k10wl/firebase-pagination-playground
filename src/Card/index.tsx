import React from "react";
import { motion } from "framer-motion";
import TimeAgo from "timeago-react";

import "react-loading-skeleton/dist/skeleton.css";

import clockIco from "@images/clock.svg";
import commentIco from "@images/comments.svg";

import styles from "./Card.module.scss";
import Skeleton from "react-loading-skeleton";

export interface ArticleInterface {
  category: string;
  title: string;
  subtitle: string;
  content: string;
  thumbnail: string;
  creationDate: Date;
  time: Date;
  comments: number;
}

interface Props {
  article: ArticleInterface;
}

export const cardMotion = {
  hover: {
    boxShadow: "0 1px 35px 0px rgba(0, 0, 0, 0.25)",
  },
  rest: {
    boxShadow: "0 1px 1px 1px rgba(0, 0, 0, 0.25)",
  },
};

export const imageMotion = {
  hover: {
    scale: 1.15,
    filter: "brightness(50%)",
  },
};

export const textMotion = {
  hover: {
    height: "auto",
  },
  rest: {
    margin: 0,
    height: 0,
    overflow: "hidden",
  },
};

export const transitionDuration = {
  duration: 0.25,
};

const Card = ({ article }: Props) => {
  const {
    category,
    title,
    subtitle,
    content,
    time,
    creationDate,
    thumbnail,
    comments,
  } = article;

  const day = creationDate.toLocaleDateString("en-GB", {
    day: "2-digit",
  });
  const month = creationDate.toLocaleDateString("en-GB", {
    month: "short",
  });

  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      variants={cardMotion}
      transition={transitionDuration}
      className={styles.container}
    >
      <div className={styles.date}>
        <p>{day}</p>
        <p>{month.toUpperCase()}</p>
      </div>
      <div className={styles.thumbnail_container}>
        <motion.img
          draggable={false}
          transition={transitionDuration}
          variants={imageMotion}
          src={thumbnail}
          alt="img"
        />
      </div>
      <div className={styles.content_container}>
        <div className={styles.category}>
          <span>{category.toUpperCase()}</span>
          <br />
        </div>
        <div className={styles.article}>
          <div>
            <p className={styles.title}>{title}</p>
            <p className={styles.subtitle}>{subtitle}</p>

            <motion.p
              transition={transitionDuration}
              variants={textMotion}
              className={styles.content}
            >
              {content}
            </motion.p>
          </div>
          <div className={styles.info_block}>
            <div className={styles.info_container}>
              <img
                draggable={false}
                className={styles.info_icon}
                src={clockIco}
                alt=""
              />
              <p className={styles.info_text}>
                <TimeAgo datetime={time} />
              </p>
            </div>
            <div className={styles.info_container}>
              <img
                draggable={false}
                className={styles.info_icon}
                src={commentIco}
                alt=""
              />
              <p className={styles.info_text}>
                {comments} comment{comments > 1 && "s"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CardSkeleton = () => (
  <motion.div
    whileHover="hover"
    initial="rest"
    variants={cardMotion}
    transition={transitionDuration}
    className={styles.container}
  >
    <div className={styles.date} />
    <div className={styles.thumbnail_container}>
      <Skeleton
        height={300}
        width={300}
        style={{ lineHeight: 300 }}
        containerTestId="skeleton-image"
      />
    </div>
    <div className={styles.content_container}>
      <div className={styles.category}>
        <br />
      </div>
      <div className={styles.article}>
        <div>
          <Skeleton containerTestId="skeleton-title" count={2} />

          <motion.p
            transition={transitionDuration}
            variants={textMotion}
            className={styles.content}
          >
            <Skeleton count={3} containerTestId="skeleton-content" />
          </motion.p>
        </div>
        <div className={styles.info_block}>
          <div className={styles.info_container}>
            <Skeleton width={100} containerTestId="skeleton-time-ago" />
          </div>
          <div className={styles.info_container}>
            <Skeleton width={100} containerTestId="skeleton-comments" />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Card;
