import { Button, Card } from "@rneui/base";
import { useEffect, useState } from "react";
import useTag from "../hooks/TagApi";
import MediaList from "../components/MediaList";
//import MediaTest from "../hookTests/MediaTest";
//import FavouriteTest from "../hookTests/FavouritesTest";
//import RatingTest from "../hookTests/RatingTest";
//import TagTest from "../hookTests/TagTest";
//import UserTest from "../hookTests/UserTest";
//import CommentTest from "../hookTests/CommentTest";

const Home = ({ navigation }) => {
  const { getMediaByTag } = useTag();
  const [media, setMedia] = useState([]);

  //CommentTest();
  //UserTest();
  //TagTest();
  //RatingTest();
  //FavouriteTest();
  //MediaTest();

  useEffect(() => {
    getMediaByTag().then((media) => setMedia(media));
  }, []);

  return (
    <Card>
      <Card.Title>Home</Card.Title>
      {media ? <MediaList media={media} navigation={navigation} /> : null}
    </Card>
  );
};

export default Home;
