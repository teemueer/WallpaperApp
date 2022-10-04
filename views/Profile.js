import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Card, Button, Text, Image } from "@rneui/base";
import { baseUrl } from "../utils/config";
import { StyleSheet, View } from "react-native";
import useMedia from "../hooks/MediaApi";
import MediaList from "../components/MediaList";

const Profile = ({ navigation }) => {
  const { setLoggedIn, user, avatar } = useContext(MainContext);
  const [viewState, setViewState] = useState(false);
  const {getMyMedia} = useMedia();
  const [media, setMedia] = useState([]);
  const logout = async () => {
    await AsyncStorage.setItem("userToken", "");
    setLoggedIn(false);
  };

  useEffect(() => {
    getMyMedia().then((media) => setMedia(media));
  }, []);

  /*
  ehdotuksia saa antaa. Ei ehkä paras tapa togglettaa tätä.
  */
  const toggleState = () => {
    setViewState((current) => !current);
  };

  /* 
  <Button title="Logout" onPress={() => logout()} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button title="test" onPress={() => toggleState()} />
        <Button title="favourites" onPress={() => toggleState()} />
      </View>
  */


      /*
      !!HUOM!!
      Tyylit väliaikaisia! EI jää koodin keskelle
      */

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(65, 67, 106, 1)",
        position: "relative",
      }}
    >
      <View
        style={{
          backgroundColor: "#984063",
          flexDirection: "column",
          flex: 1,
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1, paddingTop: 10 }}>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={{ position: "relative", left: -50, top: 10 }}>
              <Image
                source={{ uri: avatar }}
                style={{
                  height: 100,
                  width: 100,
                  marginLeft: 20,
                  borderRadius: 150 / 2,
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: "white",
                }}
              />
            </View>

            <View style={{ position: "relative", right: 0, top: 20 }}>
              <Text h1 style={{ color: "white" }}>
                {user.username}
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: 20, maxWidth: 250 }}></View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            flex: 3.5,
            flexDirection: "column",
            paddingTop: 10,
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button title="test" onPress={() => toggleState()} style={{width:150}} />
            <Button title="favourites" onPress={() => toggleState()} style={{width:150}}
             />
          </View>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "500",
              fontSize: 25,
              paddingBottom: 10,
            }}
          >
            Your Posts.
          </Text>
          {media ? <MediaList media={media} navigation={navigation}/>: null}
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    height: "65%",
  },
});
