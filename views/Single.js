import { useContext, useEffect, useState } from "react";
import { StyleSheet, Alert, SafeAreaView, Settings } from "react-native";
import { View, Image, Text, TouchableOpacity, Modal } from "react-native";
import useComment from "../hooks/CommentApi";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import CommentList from "../components/CommentList";
import Download from "../assets/Images/download.svg";
import Comment from "../assets/Images/comment.svg";
import ArrowDown from "../assets/Images/arrowDown.svg";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "@rneui/base";
import useFavourite from "../hooks/FavouriteApi";
import useUser from "../hooks/UserApi";
import Heart from "../assets/Images/roundedHeart.svg";
import Setting from "../assets/Images/Setting.svg";
import RedHeart from "../assets/Images/roundedHeartRed.svg";
import { baseUrl } from "../utils/config";
import { MainContext } from "../contexts/MainContext";

//!TODO: CLean styles, TextInput to add comment, comment Logic

const Single = ({ route, navigation }) => {
  const { getUserAvatarById } = useUser();
  const { getFavourites, postFavourite, deleteFavouriteByFileId } =
    useFavourite();
  const file = route.params.file;
  const [modalVisible, setModalVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const { getCommentsByFileId, postComment } = useComment();
  const [likeState, setLikeState] = useState(false);
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");

  const { user } = useContext(MainContext);

  useEffect(() => {
    fetchAvatar();
    fetchComments();
    fetchFavourites();
  }, []);

  const fetchAvatar = async () => {
    const res = await getUserAvatarById(file.user_id);
    console.log(res[0].filename);
    if (res > 0) {
      setAvatar(`${baseUrl}/uploads/${res[0].filename}`);
    }
  };

  const fetchComments = () => {
    getCommentsByFileId(file.file_id).then((comment) => setComments(comment));
  };

  const fetchFavourites = async () => {
    const vals = await getFavourites();
    for (let i = 0; i < vals.length; i++) {
      if (file.file_id === vals[i].file_id) {
        setLikeState(true);
      }
    }
  };

  const favouritePost = async () => {
    setLikeState(!likeState);
    try {
      if (!likeState) {
        const data = { file_id: file.file_id };
        const res = await postFavourite(data);
        Alert.alert(res.message);
        fetchFavourites();
        setLikeState(!likeState);
      } else {
        const res = await deleteFavouriteByFileId(file.file_id);
        console.log(res);
        fetchFavourites;
        setLikeState(!likeState);
      }
    } catch (error) {}
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
      file: "hi",
    },
  });

  const comment = async (commentInput) => {
    const data = { comment: commentInput.comment, file_id: file.file_id };
    try {
      const res = await postComment(data);
      console.log(res);
      Alert.alert(res.message, "", [
        {
          text: "Ok",
          onPress: () => {
            fetchComments();
            setInputVisible(!inputVisible);
          },
        },
      ]);
    } catch (error) {
      console.error("Comment()", error.message);
    }
  };

  const download = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      console.log(status);
      if (status === "granted") {
        const fileUri = `${FileSystem.documentDirectory}${file.filename}`;
        const downloadedFile = await FileSystem.downloadAsync(
          file.uri,
          fileUri
        );
        await MediaLibrary.saveToLibraryAsync(downloadedFile.uri);

        Alert.alert("File saved to your filesystem", "", [
          {
            text: "Ok",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View>
          <Image style={styles.image} source={{ uri: file.uri }}></Image>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <ArrowDown width={50} height={50}></ArrowDown>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.single}>
        <TouchableOpacity
          style={styles.image_container}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image style={[styles.image]} source={{ uri: file.uri }} />
        </TouchableOpacity>
        {file.user.user_id === user.user_id ? (
          <View style={{ position: "absolute", left: "5%", top: "5%" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ModifyMedia", { file })}
            >
              <Setting width={40} height={40}></Setting>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={{ position: "absolute", top: "5%", right: "5%" }}>
          {likeState ? (
            <TouchableOpacity onPress={() => favouritePost()}>
              <RedHeart width={40} height={40}></RedHeart>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => favouritePost()}>
              <Heart width={40} height={40}></Heart>
            </TouchableOpacity>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={inputVisible}
          onRequestClose={() => setInputVisible(!inputVisible)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                margin: 20,
                paddingTop: 35,
                paddingLeft: 5,
                paddingRight: 5,
                backgroundColor: "white",
                borderRadius: 20,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
                width: "80%",
                minHeight: "20%",
                maxheight: "25%",
              }}
            >
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    style={{}}
                    multiline={true}
                    maxLength={120}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Add a comment"
                    errorMessage={
                      errors.username && <Text>This field is required.</Text>
                    }
                  />
                )}
                name="comment"
              />
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Button
                  onPress={() => setInputVisible(!inputVisible)}
                  style={{ marginRight: 20, width: 100 }}
                >
                  Cancel
                </Button>
                <Button onPress={handleSubmit(comment)}>Comment</Button>
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={{
            height: 100,
            position: "absolute",
            width: "100%",
            backgroundColor: "rgba(65, 67, 106, 0.7)",
            top: "80%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 2 }}>
              <Text style={styles.title}>{file.title}</Text>
              <Text style={styles.author}>Posted by: {file.user.username}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 20,
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          borderBottomRightRadius: 45,
          borderBottomLeftRadius: 45,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <Text style={{ alignSelf: "center", marginTop: "2%" }}>Comments:</Text>
        <View style={{ width: "90%", height: "90%" }}>
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
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
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
