import { Card } from "@rneui/base";
import { useEffect, useState } from "react";
import useTag from "../hooks/TagApi";
import MediaList from "../components/MediaList";
import useUser from "../hooks/UserApi";
import { View } from "react-native";

//import MediaTest from "../hookTests/MediaTest";
//import FavouriteTest from "../hookTests/FavouritesTest";
//import RatingTest from "../hookTests/RatingTest";
//import TagTest from "../hookTests/TagTest";
//import UserTest from "../hookTests/UserTest";
//import CommentTest from "../hookTests/CommentTest";

const Home = ({ navigation }) => {
  const { getMediaByTag } = useTag();
  const { getUserAvatar } = useUser();
  const [media, setMedia] = useState([]);

  //CommentTest();
  //UserTest();
  //TagTest();
  //RatingTest();
  //FavouriteTest();
  //MediaTest();

  useEffect(() => {
    getMediaByTag().then((media) => setMedia(media));
    getUserAvatar();
  }, []);

  return (
    <View style={{ backgroundColor: "rgba(65, 67, 106, 1)" }}>
      <View
        style={{
          backgroundColor: "white",
          borderTopRightRadius: 45,
          borderTopLeftRadius: 45,
          marginTop: 18,
          paddingTop: 15,
        }}
      >
        <View>
          <Card.Title style={{ fontSize: 24 }}>Home</Card.Title>
        </View>
        <View>
          {media ? <MediaList media={media} navigation={navigation} /> : null}
        </View>
      </View>
    </View>
  );
};

export default Home;
