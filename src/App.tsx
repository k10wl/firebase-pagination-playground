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
      {loading && [...Array(10)].map(() => <CardSkeleton />)}
      <button onClick={fetchData}>Load next</button>
    </>
  );
};

export default App;
