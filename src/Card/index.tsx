import React from "react";
import { motion } from "framer-motion";

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
    <motion.div whileHover="hover" initial="rest" className={styles.container}>
      <div className={styles.date}>
        <p>{day}</p>
        <p>{month.toUpperCase()}</p>
      </div>
      <div className={styles.thumbnail_container}>
        <motion.img
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
          <div className={styles.info}>
            <p>{time}</p>
            <p>
              {comments} comment{comments > 1 && "s"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
