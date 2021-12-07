import { useCallback, useEffect, useState } from "react";
import firebase from "firebase";

import { firestore } from "@src/firebase";

type DocumentData = firebase.firestore.DocumentData;
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

const usePaginatedCollection = (
  collectionPath: string,
  docsPerPage: number
) => {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [last, setLast] = useState<QueryDocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getMore = useCallback(() => {
    setLoading(true);
    let query = firestore.collection(collectionPath).limit(docsPerPage);

    if (last) {
      query = query.startAfter(last);
    }

    query.get().then((documentData) => {
      setLoading(false);

      if (documentData.docs.length === 0) {
        setHasMore(false);
        return;
      }

      setDocs((prevDocs) => [...prevDocs, ...documentData.docs]);
      setLast(documentData.docs[documentData.docs.length - 1]);
    });
  }, [last, collectionPath, docsPerPage]);

  useEffect(() => {
    getMore();
  }, [collectionPath, docsPerPage]);

  return { docs, getMore, loading, hasMore };
};

export default usePaginatedCollection;
