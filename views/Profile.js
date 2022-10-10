import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Button, Text, Image } from "@rneui/base";
import { TouchableOpacity, View } from "react-native";
import styles from "../styles/Profile.style";
import ProfilePosts from "../components/ProfilePosts";
import ProfileFavourites from "../components/ProfileFavourite";
import LogOut from "../assets/Images/logout.svg";
import Account from "../assets/Images/account.svg";
import Heart from "../assets/Images/blackHeart.svg";
import ImageGallery from "../assets/Images/imageGalleryBlack.svg";
import RedHeart from "../assets/Images/redHeart.svg";
import Settings from '../assets/Images/Setting.svg'
import ImageGalleryPurple from '../assets/Images/galleryPurple.svg'

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
      <View style={[styles.background, { flex: 1 }]}></View>
      <View style={styles.user}>
        <View style={styles.userContainer}>
          <View style={styles.row}>
            <View style={styles.avatarPosition}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
            </View>
            <View style={styles.userInfo}>
              <Account width={30} height={30}></Account>
              <Text style={{ color: "white", marginLeft: 5, fontSize: 32 }}>
                {user.username}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => logout()}
            style={{ position: "absolute", top: "30%", right: -50 }}
          >
            <LogOut width={20} height={20}></LogOut>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
          <Settings width={30} height={30}></Settings>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 5,
            height: 60,
            backgroundColor: "white",
            width: "100%",
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
            flexDirection: "row-reverse",
            justifyContent: "space-evenly",
          }}
        >
          {toggle ? (
            <TouchableOpacity onPress={() => toggleState()}>
              <Heart width={30} height={30}></Heart>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => toggleState()}>
              <RedHeart width={30} height={30}></RedHeart>
            </TouchableOpacity>
          )}

          {toggle ? (
            <TouchableOpacity onPress={() => toggleState()}>
              <ImageGalleryPurple width={30} height={30}></ImageGalleryPurple>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => toggleState()}>
              <ImageGallery width={30} height={30}></ImageGallery>
            </TouchableOpacity>
          )}

          {toggle ? (
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Your posts!</Text>
          ) : (
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Favourites!</Text>
          )}
        </View>

        <View style={styles.media}>
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
