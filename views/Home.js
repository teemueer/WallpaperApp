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
  const { getAllMedia } = useMedia();
  const [media, setMedia] = useState([]);

  //CommentTest();
  //UserTest();
  //TagTest();
  //RatingTest();
  //FavouriteTest();
  //MediaTest();

  useEffect(() => {
    getAllMedia().then((media) => setMedia(media));
  }, []);

  for (const m of media) {
    if (m.tags.length > 1) console.log(m);
  }

  return (
    <Card>
      <Card.Title>Home</Card.Title>
      {media ? <MediaList media={media} navigation={navigation} /> : null}
    </Card>
  );
};

export default Home;
