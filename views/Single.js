import { useState } from "react";
import { Linking, StyleSheet, Alert } from "react-native";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { useFonts } from "expo-font";
import { Nunito_700Bold_Italic } from "@expo-google-fonts/nunito";
import { Karla_400Regular } from "@expo-google-fonts/karla";
//import {styles} from '../styles/Single.style'

const Single = ({ route }) => {
  const file = route.params.file;
  const [modalVisible, setModalVisible] = useState(false);

  const download = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${file.filename}`;
      const downloadedFile = await FileSystem.downloadAsync(file.uri, fileUri);
      await MediaLibrary.saveToLibraryAsync(downloadedFile.uri);

      Alert.alert("File saved to your filesystem", "", [
        {
          text: "Ok",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <Image style={styles.image} source={{ uri: file.uri }} />
      </Modal>

      <View style={styles.single}>
        <TouchableOpacity
          style={styles.image_container}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image style={styles.image} source={{ uri: file.uri }} />
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.title}>{file.title}</Text>
          <Text style={styles.author}>Posted by: {file.user.username}</Text>
          <Text style={styles.description}>{file.description}</Text>
          <Button title="Download" onPress={() => download()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  single: {
    margin: 30,
    borderRadius: 30,
    overflow: "hidden",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  image_container: {
    flex: 4,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    width: "100%",
    backgroundColor: "#41436A",
    paddingHorizontal: 5,
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
  },
  author: {
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: "#fff",
  },
  download: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
  },
});

export default Single;
