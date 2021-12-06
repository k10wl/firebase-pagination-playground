import React from "react";
import { motion } from "framer-motion";
import TimeAgo from "timeago-react";
        
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import clockIco from "@images/clock.svg";
import commentIco from "@images/comments.svg";

import styles from "./Card.module.scss";

interface Props {
  article?: {
    category: string;
    title: string;
    subtitle: string;
    content: string;
    thumbnail: string;
    creationDate: Date;
    time: Date;
    comments: number;
  };
}

const cardMotion = {
  hover: {
    boxShadow: "0 1px 35px 0px rgba(0, 0, 0, 0.25)",
  },
  rest: {
    boxShadow: "0 1px 1px 1px rgba(0, 0, 0, 0.25)",
  },
};

const imageMotion = {
  hover: {
    scale: 1.15,
  },
};

const textMotion = {
  hover: {
    height: "auto",
  },
  rest: {
    margin: 0,
    height: 0,
    overflow: "hidden",
  },
};

const transitionDuration = {
  duration: 0.25,
};

const Card = ({ article }: Props) => {
  const day = article?.creationDate.toLocaleDateString("en-GB", {
    day: "2-digit",
  });
  const month = article?.creationDate.toLocaleDateString("en-GB", {
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
        {day && month && (
          <>
            <p>{day}</p>
            <p>{month.toUpperCase()}</p>
          </>
        )}
      </div>
      <div className={styles.thumbnail_container}>
        {article ? (
          <motion.img
            draggable={false}
            transition={transitionDuration}
            variants={imageMotion}
            src={article.thumbnail}
            alt="img"
          />
        ) : (
          <Skeleton
            height={300}
            width={300}
            style={{ lineHeight: 300 }}
            containerTestId="skeleton-image"
          />
        )}
      </div>
      <div className={styles.content_container}>
        <div className={styles.category}>
          {article && <span>{article.category.toUpperCase()}</span>}
          <br />
        </div>
        <div className={styles.article}>
          <div>
            {article ? (
              <>
                <p className={styles.title}>{article.title}</p>
                <p className={styles.subtitle}>{article.subtitle}</p>
              </>
            ) : (
              <Skeleton containerTestId="skeleton-title" count={2} />
            )}
            <motion.p
              transition={transitionDuration}
              variants={textMotion}
              className={styles.content}
            >
              {article ? (
                article.content
              ) : (
                <Skeleton count={3} containerTestId="skeleton-content" />
              )}
            </motion.p>
          </div>
          <div className={styles.info_block}>
            <div className={styles.info_container}>
              {article ? (
                <>
                  <img
                    draggable={false}
                    className={styles.info_icon}
                    src={clockIco}
                    alt=""
                  />
                  <p className={styles.info_text}>
                    <TimeAgo datetime={article.time} />
                  </p>
                </>
              ) : (
                <Skeleton width={100} containerTestId="skeleton-time-ago" />
              )}
            </div>
            <div className={styles.info_container}>
              {article ? (
                <>
                  <img
                    draggable={false}
                    className={styles.info_icon}
                    src={commentIco}
                    alt=""
                  />
                  <p className={styles.info_text}>
                    {article.comments} comment{article.comments > 1 && "s"}
                  </p>
                </>
              ) : (
                <Skeleton width={100} containerTestId="skeleton-comments" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
