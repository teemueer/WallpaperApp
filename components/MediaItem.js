import { StyleSheet, View } from "react-native";
import { TouchableOpacity, Image, Text } from "react-native";

const MediaItem = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Single", { media: item })}
    >
      <Image style={styles.image} source={{ uri: item.uri }} />
      <View style={styles.title}>
      <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
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
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
});

export default MediaItem;
