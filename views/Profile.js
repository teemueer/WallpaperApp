import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Card, Button, Text, Image } from "@rneui/base";
import { baseUrl } from "../utils/config";
import useUser from "../hooks/UserApi";
import {
  StyleSheet,
  View,
} from "react-native";
import List from "../components/List";

const Profile = ({ navigate }) => {
  const { setLoggedIn, user } = useContext(MainContext);
  const { getUserAvatar } = useUser();
  const [avatar, setAvatar] = useState("http://placekitten.com/640");
  const [viewState, setViewState] = useState(false)
  const logout = async () => {
    await AsyncStorage.setItem("userToken", "");
    setLoggedIn(false);
  };
  const fetchAvatar = async () => {
    try {
      const response = await getUserAvatar(`avatar_${user.user_id}`);
      const json = response.pop();
      setAvatar(`${baseUrl}/uploads/${json.filename}`);
    } catch (error) {
      console.error("fetchAvatar():", error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  /*
  ehdotuksia saa antaa. Ei ehkä paras tapa togglettaa tätä.
  */
  const toggleState = () => {
    setViewState(current => !current);
  }

  return (
    <View style={{ display: "flex", flex: 1 }}>
      <View
        style={{
          backgroundColor: "red",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <Image source={{ uri: avatar }} style={{ height: 100, width: 100 }} />
        <Text h1 style={{}}>
          {user.username}
        </Text>
      </View>
      <Button title="Logout" onPress={() => logout()} />
      <View style={{
        flexDirection:'row',
        justifyContent:'center',
      }}>
      <Button title='test' onPress={()=> toggleState()} />
      <Button title='favourites' onPress={()=>toggleState()} />
      </View>
      <View style={{ backgroundColor: "blue", flex: 2 }}>
          <List navigation={navigate} mediaToggle={viewState}></List>
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
