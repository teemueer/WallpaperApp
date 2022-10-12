import { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { View, Image, Text, TouchableOpacity, Modal } from "react-native";
import useComment from "../hooks/CommentApi";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import CommentList from "../components/CommentList";
import Download from "../assets/Images/downloadSquare.svg";
import Comment from "../assets/Images/commentSquare.svg";
import ArrowDown from "../assets/Images/arrowDown.svg";
import { Controller, set, useForm } from "react-hook-form";
import { Button, Input } from "@rneui/base";
import useFavourite from "../hooks/FavouriteApi";
import useUser from "../hooks/UserApi";
import Heart from "../assets/Images/roundedHeart.svg";
import Setting from "../assets/Images/settingsRound.svg";
import RedHeart from "../assets/Images/roundedHeartRed.svg";
import { baseUrl } from "../utils/config";
import styles from "../styles/Single.style";
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
  const { user, loggedIn } = useContext(MainContext);
  let description = false;
  const [postAvatar, setPostAvatar] = useState(
    "https://via.placeholder.com/150"
  );

  if (file.description != "") {
    description = true;
  }

  console.log(file);

  useEffect(() => {
    fetchAvatar();
    fetchComments();
    if (loggedIn) fetchFavourites();
  }, []);

  //Fetch posters avatar. If there is no avatar use placeholder image!
  const fetchAvatar = async () => {
    const res = await getUserAvatarById(file.user_id);
    if (res.length > 0) {
      setPostAvatar(`${baseUrl}/uploads/${res[0].filename}`);
    } else {
      setPostAvatar("https://via.placeholder.com/150");
    }
  };

  //Fetch commets of a post
  const fetchComments = () => {
    getCommentsByFileId(file.file_id).then((comment) => setComments(comment));
  };

  //Fetches list of users favourites, ad IF the current post is in that set of
  //Favourites change Heart to red.

  const fetchFavourites = async () => {
    const vals = await getFavourites();
    for (let i = 0; i < vals.length; i++) {
      if (file.file_id === vals[i].file_id) {
        setLikeState(true);
      }
    }
  };

  //Either adds post to favourites OR un-favourites current post.
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
        //juho - comments - single;
        Alert.alert(res.message);
        fetchFavourites();
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

  //Create a comment
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
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{ position: "absolute", bottom: "10%", left: "43%" }}
          >
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

        {file.user_id === user.user_id ? (
          <View style={{ position: "absolute", right: "5%", top: "20%" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ModifyMedia", { file })}
            >
              <Setting width={40} height={40}></Setting>
            </TouchableOpacity>
          </View>
        ) : null}

        {loggedIn ? (
          <View style={styles.likeButton}>
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
        ) : null}
        <View style={styles.actionCluster}>
          <TouchableOpacity
            onPress={() => download()}
            style={{ marginBottom: 5 }}
          >
            <Download width={40} height={40} />
          </TouchableOpacity>
          {loggedIn ? (
            <TouchableOpacity onPress={() => setInputVisible(!inputVisible)}>
              <Comment width={40} height={40} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.postAvatarContainer}>
          <Image source={{ uri: postAvatar }} style={styles.postAvatar} />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "white", fontWeight: "700" }}>
              Posted by:
            </Text>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
              {loggedIn ? file.user.username : file.user_id}
            </Text>
          </View>
        </View>
        {description ? (
          <View style={styles.floatingDescription}>
            <Text style={[styles.description, { alignSelf: "center" }]}>
              {file.description}
            </Text>
          </View>
        ) : (
          <View></View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={inputVisible}
          onRequestClose={() => setInputVisible(!inputVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalStyle}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    style={{}}
                    multiline={true}
                    maxLength={80}
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
      </View>
      <View style={styles.commentSection}>
        <Text style={{ alignSelf: "center", marginTop: "2%", color: "black" }}>
          Comments:
        </Text>
        <View
          style={{
            width: "90%",
            height: "100%",
            alignSelf: "center",
            paddingTop: 5,
          }}
        >
          <CommentList comments={comments}></CommentList>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Single;
