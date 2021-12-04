import React from "react";

import Card from "./Card";

const hardcodedData = {
  thumbnail:
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F_IUYlNU10BMY%2FSoqHmcW1UGI%2FAAAAAAAAhls%2FU-uQ2Dr0qqc%2Fs400%2FMountain-Landscapes-19.jpg&f=1&nofb=1",
  creationDate: new Date(),
  category: "Post",
  title: "City Lights in New York",
  subtitle: "The city that never sleeps.",
  content:
    "New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.",
  time: "6 minutes ago",
  comments: 5,
};

const App = () => <Card article={hardcodedData} />;

export default App;
