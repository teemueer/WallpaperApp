import { Button, Card } from "@rneui/base";
import { useEffect, useState } from "react";
import MediaList from "../components/MediaList";
import useMedia from "../hooks/MediaApi";

//import MediaTest from "../hookTests/MediaTest";
//import FavouriteTest from "../hookTests/FavouritesTest";
//import RatingTest from "../hookTests/RatingTest";
//import TagTest from "../hookTests/TagTest";
//import UserTest from "../hookTests/UserTest";
//import CommentTest from "../hookTests/CommentTest";

const Home = ({ navigation }) => {
  const { allMedia, allTags } = useMedia();

  //CommentTest();
  //UserTest();
  //TagTest();
  //RatingTest();
  //FavouriteTest();
  //MediaTest();

  for (const media of allMedia) {
    if (media.tags.length > 0) console.log(media.tags);
  }

  return (
    <Card>
      <Card.Title>Home</Card.Title>
      {allMedia ? <MediaList media={allMedia} navigation={navigation} /> : null}
    </Card>
  );
};

export default Home;
