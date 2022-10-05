import { Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { View } from "react-native";
import useFavourite from "../hooks/FavouriteApi";
import useMedia from "../hooks/MediaApi";
import MediaList from "./MediaList";

const ProfileFavourites = ({ navigation }) => {
  const { getFavourites } = useFavourite();
  const { getMediaDetailsAndSort } = useMedia();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    getFavourites().then((id) =>
      getMediaDetailsAndSort(id).then((media) => setMedia(media))
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MediaList media={media} navigation={navigation} />
    </View>
  );
};

export default ProfileFavourites;
