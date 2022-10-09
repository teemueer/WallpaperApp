import { FlatList, View } from "react-native";
import MediaItem from "./MediaItem";

const MediaList = ({ navigation, media }) => {
  return (
    <FlatList
      data={media}
      numColumns="2"
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={({ item }) => (
        <MediaItem navigation={navigation} item={item} />
      )}
    >
    </FlatList>
  );
};

export default MediaList;
