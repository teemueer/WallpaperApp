import { Card } from "@rneui/base";
import { useEffect, useState } from "react";
import MediaList from "../components/MediaList";
import useUser from "../hooks/UserApi";
import { View } from "react-native";
import styles from "../styles/Home.style";
import useMedia from "../hooks/MediaApi";

const Home = ({ navigation }) => {
  const { getMediaByTag } = useTag();
  const { getUserAvatar } = useUser();
  const [media, setMedia] = useState([]);
  const { allMedia, allTags } = useMedia();

  useEffect(() => {
    getMediaByTag().then((media) => setMedia(media));
    getUserAvatar();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.feed}>
        <Card.Title style={styles.text}>Home</Card.Title>
        {media ? <MediaList media={media} navigation={navigation} /> : null}
      </View>
    </View>
  );
};

export default Home;
