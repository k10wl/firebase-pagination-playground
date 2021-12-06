import React, { useState } from "react";

import Card, { CardSkeleton } from "@src/Card";

import useFirebaseDB from "@src/hooks/useFirebaseDB";

import styles from "./App.module.scss";

const App = () => {
  const [autoLoading, setAutoLoading] = useState(false);
  const { loading, articles, fetchData, isMore } = useFirebaseDB();

  return (
    <>
      <div className={styles.container}>
        {articles.map((article) => (
          <Card key={article.id} article={article} />
        ))}
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
        <button onClick={fetchData} disabled={!isMore || autoLoading}>
          {isMore ? "Load next" : "No more data"}
        </button>
      </div>
    </>
  );
};

export default App;
