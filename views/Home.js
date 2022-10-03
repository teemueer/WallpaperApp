import { Button, Card, Icon } from "@rneui/base";
import { useEffect, useState } from "react";
import useTag from "../hooks/TagApi";
import MediaList from "../components/MediaList";
import {View} from "react-native";

const Home = ({ navigation }) => {
  const { getMediaByTag } = useTag();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    getMediaByTag().then((media) => setMedia(media));
  }, []);

  return (
    <View style={{backgroundColor:'rgba(65, 67, 106, 1)'}}>
    <View style={{backgroundColor:'white', borderTopRightRadius:45,borderTopLeftRadius:45
    ,paddingTop:25,paddingLeft:5, paddingRight: 5,}}>
      <Card.Title>Home</Card.Title>
      {media ? <MediaList media={media} navigation={navigation} /> : null}
    </View>
    </View>
  );
};

export default Home;
