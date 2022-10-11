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
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";
import Wall from "../assets/Images/wall.svg";
import ModifyMedia from "../views/ModifyMedia";

const Tab = createBottomTabNavigator();
const iconColor = "white";

const TabScreenUser = ({ navigation }) => {
  const { avatar } = useContext(MainContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "rgba(65, 67, 106, 1)",
          borderTopWidth: 0,
        },
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
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
            flex: 1,
            textAlign: "center",
          },
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <Wall
              style={{
                marginLeft: 105,
                marginTop: 10,
                shadowColor: "black",
                shadowRadius: 3,
              }}
            ></Wall>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
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
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
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

const TabScreenGuest = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarButton: () => (
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarButton: () => (
            <Button
              title="Register"
              onPress={() => navigation.navigate("Register")}
            />
          ),
          headerShown: false,
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
      {loggedIn ? (
        <Stack.Screen
          name="TabsUser"
          component={TabScreenUser}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="TabsGuest"
          component={TabScreenGuest}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Single"
        component={Single}
        options={{
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
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
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
        }}
      />
      <Stack.Screen
        name="ModifyMedia"
        component={ModifyMedia}
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
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => (
  <NavigationContainer>
    <StackScreen />
  </NavigationContainer>
);

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Navigator;
