import { useEffect, useState } from "react";
import {
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import useComment from "../hooks/CommentApi";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import CommentList from "../components/CommentList";
import Download from "../assets/Images/download.svg";
import Comment from "../assets/Images/comment.svg";
import ArrowDown from "../assets/Images/arrowDown.svg";

//!TODO: CLean styles, TextInput to add comment, comment Logic

const Single = ({ route }) => {
  const file = route.params.file;
  const [modalVisible, setModalVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const { getCommentsByFileId } = useComment();
  console.log(file);

  useEffect(() => {
    getCommentsByFileId(file.file_id).then((comment) => setComments(comment));
  }, []);

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


  /*
  <View style={styles.info}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft:10, paddingTop:2,}}>
              <Text style={styles.title}>{file.title}</Text>
              <Text style={styles.author}>Posted by: {file.user.username}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight:20,
              }}
            >
              <TouchableOpacity onPress={() => download()}>
                <Download width={25} height={25} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setInputVisible(!inputVisible)}>
                <Comment width={25} height={25} style={{ marginLeft: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.description}>{file.description}</Text>
        </View>*/


  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View>
          <Image style={styles.image} source={{ uri: file.uri }}></Image>
          <TouchableOpacity
            style={{ position: "absolute", bottom: "10%", left: "42%" }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <ArrowDown width={50} height={50}></ArrowDown>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={inputVisible}
        onRequestClose={() => setInputVisible(!inputVisible)}
      >
        <Text>Hello</Text>
      </Modal>

      <View style={styles.single}>
        <TouchableOpacity
          style={styles.image_container}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image style={[styles.image]} source={{ uri: file.uri }} />
        </TouchableOpacity>
        <View style={{
          height:100, position:'absolute', width:'100%', backgroundColor: "rgba(65, 67, 106, 0.7)",
          top:'80%'
        }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft:10, paddingTop:2,}}>
              <Text style={styles.title}>{file.title}</Text>
              <Text style={styles.author}>Posted by: {file.user.username}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight:20,
              }}
            >
              <TouchableOpacity onPress={() => download()}>
                <Download width={25} height={25} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setInputVisible(!inputVisible)}>
                <Comment width={25} height={25} style={{ marginLeft: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </View>
      <View style={{ flex: 1, alignItems: "center", backgroundColor:'white',borderTopRightRadius:45,
      }}>
        <Text style={{ alignSelf: "center", marginTop:'2%' }}>
          Comments:
        </Text>
        <View style={{ width: "90%", height:'90%' }}>
          <CommentList comments={comments}></CommentList>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(65, 67, 106, 1)",
  },
  single: {
    margin: 0,
    borderRadius: 0,
    overflow: "hidden",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  image_container: {
    flex: 3,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(65, 67, 106,2)",
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
