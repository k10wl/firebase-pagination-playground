import React from "react";
import styles from "@src/Card/Card.module.scss";
import { motion } from "framer-motion";
import { cardMotion, textMotion, transitionDuration } from "@src/Card/index";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => (
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

export default CardSkeleton;
