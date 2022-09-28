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
import { Button, Icon } from "@rneui/base";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import PropTypes from "prop-types";

const Tab = createBottomTabNavigator();

const TabScreenUser = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        navigation={navigation}
        options={{
          tabBarIcon: () => <Icon name="home" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Icon name="person" />,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: () => <Icon name="cloud-upload" />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => <Icon name="search" />,
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
      <Stack.Screen name="Single" component={Single} />
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
