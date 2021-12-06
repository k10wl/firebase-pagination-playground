import React, { useCallback, useRef, useState } from "react";

import Card, { CardSkeleton } from "@src/Card";

import useFirebaseDB from "@src/hooks/useFirebaseDB";

import styles from "./App.module.scss";

const App = () => {
  const [autoLoading, setAutoLoading] = useState(true);
  const { loading, articles, fetchData, isMore } = useFirebaseDB();

  const observer = useRef(new IntersectionObserver(() => {}));

  const lastCardRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (!autoLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && isMore) {
          fetchData();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, autoLoading, isMore, fetchData]
  );

  return (
    <>
      <div className={styles.container}>
        {articles.map((article, index) => {
          if (index + 1 === articles.length) {
            return (
              <div key={article.id} ref={lastCardRef}>
                <Card article={article} />
              </div>
            );
          }
          return <Card key={article.id} article={article} />;
        })}
        {loading &&
          [...Array(10)].map(() => (
            <CardSkeleton key={Math.floor(Math.random() * 1048575)} />
          ))}
      </div>
      <div className={styles.loading_options}>
        <label>
          Scroll loading
          <input
            type="checkbox"
            checked={autoLoading}
            onChange={(e) => setAutoLoading(e.currentTarget.checked)}
          />
        </label>
        <button
          onClick={fetchData}
          disabled={!isMore || autoLoading || loading}
        >
          {isMore ? "Load next" : "No more data"}
        </button>
      </div>
    </>
  );
};

export default App;
