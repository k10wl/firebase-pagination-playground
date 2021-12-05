import React from "react";
import { motion } from "framer-motion";

import clockIco from "@images/clock.svg";
import commentIco from "@images/comments.svg";

import styles from "./Card.module.scss";

interface Props {
  article: {
    category: string;
    title: string;
    subtitle: string;
    content: string;
    thumbnail: string;
    creationDate: Date;
    time: string;
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
  console.log("test")

  const {
    thumbnail,
    creationDate,
    category,
    title,
    subtitle,
    content,
    time,
    comments,
  } = article;
  const day = creationDate.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = creationDate.toLocaleDateString("en-GB", { month: "short" });

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
              <p className={styles.info_text}>{time}</p>
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

export default Card;
