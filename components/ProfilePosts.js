import { Text } from "@rneui/base";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import {MainContext} from "../contexts/MainContext";
import useMedia from "../hooks/MediaApi";
import MediaList from "./MediaList";

const ProfilePosts = ({ navigation }) => {
  const { getMediaByUserId, getMyMedia } = useMedia();
  const [media, setMedia] = useState([]);
 const {user} = useContext(MainContext)

  useEffect(() => {
    getMyMedia().then((media) => setMedia(media));
    //getMediaByUserId(user.user_id).then((res)=> setMedia(res))
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MediaList media={media} navigation={navigation} />
    </View>
  );
};

export default ProfilePosts;
