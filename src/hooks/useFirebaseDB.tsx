import { useCallback, useEffect, useState } from "react";
import firebase from "firebase";

import { firestore } from "@src/firebase";
import { ArticleInterface } from "@src/Card";

export type Article = ArticleInterface & {
  id: string;
  time: firebase.firestore.Timestamp | Date;
  creationDate: firebase.firestore.Timestamp | Date;
};

type Timestamp = firebase.firestore.Timestamp;
type DocumentData =
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
type QuerySnapshot = firebase.firestore.QuerySnapshot;

const mapArticle = (collection: QuerySnapshot) => {
  return collection.docs.map(
    (doc: firebase.firestore.QueryDocumentSnapshot) => {
      const response = doc.data() as Article;

      const time = response.time as Timestamp;
      const creationDate = response.creationDate as Timestamp;

      const article: Article = {
        ...response,
        id: doc.id,
        time: new Date(time.seconds * 1000),
        creationDate: new Date(creationDate.seconds * 1000),
      };

      return article;
    }
  );
};

const useFirebaseDB = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const [lastArticle, setLastArticle] = useState<DocumentData>();

  const manageFetchedData = (collection: QuerySnapshot) => {
    if (collection.size === 0) {
      setIsMore(false);
      setLoading(false);
      return;
    }
    const articlesArray = mapArticle(collection);
    setArticles((prevState) => [...prevState, ...articlesArray]);
    setLoading(false);
    setLastArticle(collection.docs[collection.docs.length - 1]);
  };

  const fetchData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!lastArticle) {
      firestore
        .collection("articles")
        .limit(10)
        .get()
        .then((collection) => {
          manageFetchedData(collection);
        });
      return;
    }
    firestore
      .collection("articles")
      .startAfter(lastArticle)
      .limit(10)
      .get()
      .then((collection) => {
        manageFetchedData(collection);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, loading, articles, isMore };
};

export default useFirebaseDB;
