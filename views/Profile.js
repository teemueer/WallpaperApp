import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Card, Button, Text } from "@rneui/base";
import { baseUrl } from "../utils/config";
import useUser from "../hooks/UserApi";

const Profile = () => {
  const { setLoggedIn, user } = useContext(MainContext);
  const {getUserAvatar} = useUser();
  const [avatar, setAvatar] = useState('')

  const logout = async () => {
    await AsyncStorage.setItem("userToken", "");
    setLoggedIn(false);
  };

  const fetchAvatar = async() => {
    try {
      const response = await getUserAvatar(`avatar_${user.user_id}`)
      const json = response.pop();
      setAvatar(`${baseUrl}/uploads/${json.filename}`)
    } catch (error) {
      console.error('fetchAvatar():', error.message);
    }
  }

  useEffect(()=>{
    fetchAvatar();
  }, [])

  return (
    <Card>
      <Card.Title>
        <Text h1>{user.username}</Text>
        <Card.Image
        source={{uri:avatar}}
        style={{
          width:'100%',
          height: undefined,
          aspectRatio:1,
        }}
        />
      </Card.Title>
      <Button title="Logout" onPress={() => logout()} />
    </Card>
  );
};

export default Profile;
