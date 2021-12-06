import React from "react";

import Card, { CardSkeleton } from "@src/Card";

import useFirebaseDB from "@src/hooks/useFirebaseDB";

const App = () => {
  const { loading, articles, fetchData } = useFirebaseDB();

  return (
    <>
      {articles.map((article) => (
        <Card key={article.id} article={article} />
      ))}
      {loading &&
        [...Array(10)].map(() => (
          <CardSkeleton key={Math.floor(Math.random() * 1048575)} />
        ))}
      <button onClick={fetchData}>Load next</button>
    </>
  );
};

export default App;
