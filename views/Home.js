import { Button, Card } from "@rneui/base";
import { useEffect, useState } from "react";
import useTag from "../hooks/TagApi";
import MediaList from "../components/MediaList";
import { Logs } from "expo";

Logs.enableExpoCliLogging();

const Home = ({ navigation }) => {
  const { getMediaByTag } = useTag();
  const [media, setMedia] = useState([]);

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
