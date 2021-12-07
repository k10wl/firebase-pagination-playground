import React, { useCallback, useEffect, useRef, useState } from "react";
import firebase from "firebase";

import Card, { CardSkeleton } from "@src/Card";

import usePaginatedCollection from "@src/hooks/usePaginatedCollection";

import styles from "./App.module.scss";

const App = () => {
  const [autoLoading, setAutoLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);

  const { loading, hasMore, getMore, docs } = usePaginatedCollection(
    "articles",
    10
  );

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
        if (entries[0].isIntersecting && hasMore) {
          getMore();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, autoLoading, hasMore, getMore]
  );

  useEffect(() => {
    setArticles(
      docs.map((item: firebase.firestore.DocumentData) => {
        const data = item.data();
        return {
          ...data,
          id: item.id,
          time: new Date(data.time.seconds * 1000),
          creationDate: new Date(data.creationDate.seconds * 1000),
        };
      })
    );
  }, [docs]);

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
        <button onClick={getMore} disabled={!hasMore || autoLoading || loading}>
          {hasMore ? "Load next" : "No more data"}
        </button>
      </div>
    </>
  );
};

export default App;
