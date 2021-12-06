import React, { useEffect, useState } from "react";
import firebase from "firebase";

import Card, { ArticleInterface } from "@src/Card";
import { firestore } from "@src/firebase";

type FirebaseTimestamp = {
  seconds: number;
  nanoseconds: number;
};

type APICard = ArticleInterface & {
  id: string;
  time: FirebaseTimestamp | Date;
  creationDate: FirebaseTimestamp | Date;
};

const App = () => {
  const [articles, setArticles] = useState<APICard[] | undefined[]>([]);
  const [lastArticle, setLastArticle] =
    useState<
      firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    >();

  useEffect(() => {
    firestore
      .collection("articles")
      .limit(10)
      .get()
      .then((collection) => {
        const articlesArray = collection.docs.map((doc) => {
          const response = doc.data() as APICard;

          const time = response.time as FirebaseTimestamp;
          const creationDate = response.creationDate as FirebaseTimestamp;

          const article: APICard = {
            ...response,
            id: doc.id,
            time: new Date(time.seconds * 1000),
            creationDate: new Date(creationDate.seconds * 1000),
          };

          return article;
        });
        setArticles(articlesArray);
        setLastArticle(collection.docs[collection.docs.length - 1]);
      });
  }, []);

  const fetchData = () => {
    firestore
      .collection("articles")
      .startAfter(lastArticle)
      .limit(10)
      .get()
      .then((collection) => {
        const articlesArray = collection.docs.map((doc) => {
          const response = doc.data() as APICard;

          const time = response.time as FirebaseTimestamp;
          const creationDate = response.creationDate as FirebaseTimestamp;

          const article: APICard = {
            ...response,
            id: doc.id,
            time: new Date(time.seconds * 1000),
            creationDate: new Date(creationDate.seconds * 1000),
          };

          return article;
        });
        // @ts-ignore
        setArticles((prevState) => [...prevState, ...articlesArray]);
        setLastArticle(collection.docs[collection.docs.length - 1]);
      });
  };

  return (
    <>
      {articles.map((article) => {
        return <Card key={article?.id} article={article} />;
      })}
      <button onClick={fetchData}>Load next</button>
    </>
  );
};

export default App;
