import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Button, Text, Image } from "@rneui/base";
import { View } from "react-native";
import styles from "../styles/Profile.style";
import ProfilePosts from "../components/ProfilePosts";
import ProfileFavourites from "../components/ProfileFavourite";

const Profile = ({ navigation }) => {
  const { setLoggedIn, user, avatar } = useContext(MainContext);
  const [toggle, setToggle] = useState(true);
  const logout = async () => {
    await AsyncStorage.setItem("userToken", "");
    setLoggedIn(false);
  };

  const toggleState = () => {
    setToggle((current) => !current);
  };

  return (
    <View style={styles.background}>
      <View style={styles.user}>
        <View style={styles.userContainer}>
          <View style={styles.row}>
            <View style={styles.avatarPosition}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
            </View>
            <View style={styles.userInfo}>
              <Text h1 style={{ color: "white" }}>
                {user.username}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.media}>
          <Button title="Logout" onPress={() => logout()} />
          <Button
            title="test"
            onPress={() => toggleState()}
            style={{ width: 150 }}
          />
          {toggle ? (
            <ProfilePosts navigation={navigation}></ProfilePosts>
          ) : (
            <ProfileFavourites navigation={navigation}></ProfileFavourites>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
