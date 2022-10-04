import { Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import useMedia from "../hooks/MediaApi";
//import fetchUserMedia from "../hooks/MediaApi";
import ListItem from "./ListItem";

const List = ({ mediaToggle = false }) => {
  //const { userMedia } = fetchUserMedia(mediaToggle);
  const { getMyMedia } = useMedia();
  const [userMedia, setUserMedia] = useState([]);

  useEffect(() => {
    getMyMedia().then((media) => setUserMedia(media));
  }, [userMedia]);

  return (
    <FlatList
      data={userMedia}
      renderItem={(item) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
