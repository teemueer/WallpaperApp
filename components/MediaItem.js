import { StyleSheet, View } from "react-native";
import { TouchableOpacity, Image, Text } from "react-native";
import styles from "../styles/MediaItem.style";

const MediaItem = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Single", { file: item })}
    >
      <Image style={styles.image} source={{ uri: item.uri }} />
      <View style={styles.title}>
        <Text style={{ fontSize: 18, color: "#fff", fontFamily: "karla" }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MediaItem;
