import React from "react";

import Card, { CardSkeleton } from "@src/Card";

import useFirebaseDB from "@src/hooks/useFirebaseDB";

import styles from "./App.module.scss";

const App = () => {
  const { loading, articles, fetchData } = useFirebaseDB();

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
      <button onClick={fetchData}>Load next</button>
    </>
  );
};

export default App;
