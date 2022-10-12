import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";
import Register from "../views/Register";
import Search from "../views/Search";
import Upload from "../views/Upload";
import Single from "../views/Single";
import Settings from "../views/Settings";
import { Button, Icon } from "@rneui/base";
import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";
import Wall from "../assets/Images/wall.svg";
import ModifyMedia from "../views/ModifyMedia";
import LogOut from "../assets/Images/logout.svg";
import useUser from "../hooks/UserApi";

const Tab = createBottomTabNavigator();
const iconColor = "white";

const TabScreen = ({ navigation }) => {
  const { avatar, loggedIn } = useContext(MainContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "rgba(65, 67, 106, 1)",
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        navigation={navigation}
        options={{
          tabBarIcon: () => <Icon name="home" color={iconColor} />,
          headerStyle: {
            backgroundColor: "rgba(65, 67, 106, 1)",
            borderBottomWidth: 0,
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          headerTitle: () => <Wall width={100} height={100}/>,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                loggedIn
                  ? navigation.navigate("Profile")
                  : navigation.navigate("Login");
              }}
            >
              {loggedIn ? (
                <Image
                  source={{ uri: avatar }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 150 / 2,
                    overflow: "hidden",
                    borderWidth: 3,
                    borderColor: "white",
                    marginRight: 20,
                  }}
                />
              ) : null}
            </TouchableOpacity>
          ),
        }}
      />
      {loggedIn ? (
        <>
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTitleAlign: "center",
              tabBarIcon: () => <Icon name="person" color={iconColor} />,
              headerStyle: {
                backgroundColor: "rgba(65, 67, 106, 1)",
                borderBottomWidth: 0,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: "500",
              },
              headerShadowVisible: false,
              title: "Profile.",
              headerRight: () => (
                <Wall
                  height={70}
                  width={70}
                  style={{
                    marginRight: 20,
                    shadowColor: "black",
                    shadowRadius: 3,
                  }}
                ></Wall>
              ),
            }}
          />
          <Tab.Screen
            name="Upload"
            component={Upload}
            options={{
              tabBarIcon: () => <Icon name="cloud-upload" color={iconColor} />,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "rgba(65, 67, 106, 1)",
                borderBottomWidth: 0,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: "500",
              },
              headerShadowVisible: false,
              headerRight: () => (
                <Wall
                  height={70}
                  width={70}
                  style={{
                    marginRight: 20,
                    shadowColor: "black",
                    shadowRadius: 3,
                  }}
                ></Wall>
              ),
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: () => <Icon name="login" color={iconColor} />,
            headerStyle: {
              backgroundColor: "rgba(65, 67, 106, 1)",
              borderBottomWidth: 0,
            },
            headerShown: false,
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "500",
            },
            headerShadowVisible: false,
            title: "Login.",
            headerRight: () => (
              <Wall
                height={70}
                width={70}
                style={{
                  marginRight: 20,
                  shadowColor: "black",
                  shadowRadius: 3,
                }}
              ></Wall>
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerTitleAlign: "center",
          tabBarIcon: () => <Icon name="search" color={iconColor} />,
          headerStyle: {
            backgroundColor: "rgba(65, 67, 106, 1)",
            borderBottomWidth: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <Wall
              height={70}
              width={70}
              style={{
                marginRight: 20,
                shadowColor: "black",
                shadowRadius: 3,
              }}
            ></Wall>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const { loggedIn } = useContext(MainContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabScreen"
        component={TabScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Single"
        component={Single}
        options={({ route }) => ({
          title: route.params.file.title,
          headerStyle: {
            backgroundColor: "rgba(65, 67, 106, 1)",
            borderBottomWidth: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "rgba(65, 67, 106, 1)",
            borderBottomWidth: 0,
            textAlign: "center",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ModifyMedia"
        component={ModifyMedia}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "rgba(65, 67, 106, 1)",
            borderBottomWidth: 0,
            textAlign: "center",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: "rgba(65, 67, 106, 1)",
            borderBottomWidth: 0,
            textAlign: "center",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "rgba(65, 67, 106, 1)",
            borderBottomWidth: 0,
            textAlign: "center",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const { setUser, setLoggedIn, update, setUpdate } = useContext(MainContext);
  const { getUserByToken, getUserAvatar } = useUser();

  const checkToken = async () => {
    try {
      const user = await getUserByToken();
      console.log(user)
      setUser(user);
      getUserAvatar(user.user_id)
      setLoggedIn(true);
      setUpdate(!update);
    } catch (error) {
      //console.error("checkToken()", error.message);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Navigator;
