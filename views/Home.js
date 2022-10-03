import { Button, Card } from "@rneui/base";
import { useEffect, useState } from "react";
import useTag from "../hooks/TagApi";
import MediaList from "../components/MediaList";
//import UserTest from "../hookTests/UserTest";
//import CommentTest from "../hookTests/CommentTest";

const Home = ({ navigation }) => {
  const { getMediaByTag } = useTag();
  const [media, setMedia] = useState([]);

  //CommentTest();
  //UserTest();

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
