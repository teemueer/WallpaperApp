import { StyleSheet } from "react-native";
import { TouchableOpacity, Image, Text } from "react-native";

const MediaItem = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Single", { file: item })}
    >
      <Image style={styles.image} source={{ uri: item.uri }} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 0.5,
    borderRadius: 20,
  },
  title: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: "100%",
    height: 50,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default MediaItem;
