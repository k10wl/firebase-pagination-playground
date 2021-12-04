import React from "react";

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
    <div className={styles.container}>
      <div className={styles.date}>
        <p>{day}</p>
        <p>{month.toUpperCase()}</p>
      </div>
      <div className={styles.thumbnail_container}>
        <img src={thumbnail} alt="img" />
      </div>
      <div className={styles.content_container}>
        <div className={styles.category}>
          <span>{category.toUpperCase()}</span>
        </div>
        <div className={styles.article}>
          <p className={styles.title}>{title}</p>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.content}>{content}</p>
          <div className={styles.info}>
            <p>{time}</p>
            <p>
              {comments} comment{comments > 1 && "s"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
