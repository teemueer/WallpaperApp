import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, ListItem as RNEListItem } from "@rneui/base";
import { baseUrl } from "../utils/config";
import { StyleSheet, Text, Image, View } from "react-native";

const ListItem = ({ singleMedia }) => {
  const navigation = useNavigation();
  return (
    <RNEListItem
      style={styles.container}
      onPress={() => {
        navigation.navigate("Single", { file: singleMedia });
      }}
      bottomDivider
    >
      <View>
        <Image
          style={styles.image}
          size="medium"
          source={{
            uri: `${baseUrl}/uploads/${singleMedia.thumbnails.w160}`,
          }}
        />
        <Text style={styles.title}>{singleMedia.title}</Text>
      </View>
    </RNEListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    height: 40,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default ListItem;
