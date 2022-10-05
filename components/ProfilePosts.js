import { Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { View } from "react-native";
import useMedia from "../hooks/MediaApi";
import MediaList from "./MediaList";

const ProfilePosts = ({ navigation }) => {
  const { getMyMedia } = useMedia();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    getMyMedia().then((media) => setMedia(media));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MediaList media={media} navigation={navigation} />
    </View>
  );
};

export default ProfilePosts;
