import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Image, Input, Text } from "@rneui/base";
import { MainContext } from "../contexts/MainContext";
import { TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import useUser from "../hooks/UserApi";
import useMedia from "../hooks/MediaApi";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Error from "../components/Error";

const Settings = ({ navigation }) => {
  const {
    checkUsername,
    deleteUserAvatar,
    getUserAvatar,
    postUserAvatar,
    modifyUser,
    getUserByToken,
  } = useUser();
  const { user, avatar, setUser } = useContext(MainContext);
  const [image, setImage] = useState(null);
  const { update, setUpdate } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSelect = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 0.5,
    });

    if (!res.cancelled) {
      setImage(res);
    }
  };

  const imageUpload = async () => {
    const ext = image.uri.split(".").pop();
    const formData = new FormData();
    formData.append("title", `${user.username} pfp`);
    formData.append("file", {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: `${image.type}/${ext === "jpg" ? "jpeg" : ext}`,
    });
    setIsLoading(true);
    try {
      await deleteUserAvatar();
      const res = await postUserAvatar(formData);
      console.log(res);
      Alert.alert("Avatar changed");
    } catch (error) {
      Error("Avatar change failed.");
    } finally {
      setIsLoading(false);
      getUserAvatar(user.user_id);
    }
  };

  const changeCredentials = async (credentials) => {
    if (credentials.username === "") {
      delete credentials.username;
    }
    if (credentials.email === "") {
      delete credentials.email;
    }
    if (credentials.password === "") {
      delete credentials.password;
    }
    const a = await modifyUser(credentials);
    if (a.message) {
      Alert.alert("Details updated!");
      const user = await getUserByToken();
      setUser(user);
      navigation.navigate("Profile");
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  return (
    <View style={{ backgroundColor: "rgba(65, 67, 106, 1)", flex: 1 }}>
      <View style={{ backgroundColor: "rgba(65, 67, 106, 1)", height: 30 }} />
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          alignItems: "center",
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
        }}
      >
        <View
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginTop: "15%",
          }}
        >
          <Text style={{ marginBottom: 20, fontWeight: "700", fontSize: 24 }}>
            Change Avatar.
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: "10%" }}>
              <TouchableOpacity onPress={() => onSelect()}>
                <Image
                  source={{ uri: image?.uri || avatar }}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 150 / 2,
                    overflow: "hidden",
                    borderWidth: 4,
                    borderColor: "rgba(65, 67, 106, 1)",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Button
                style={{ marginBottom: 20 }}
                color={"#984063"}
                onPress={() => onSelect()}
              >
                choose file
              </Button>
              <Button
                title="submit"
                loading={isLoading}
                disabled={!image}
                onPress={() => imageUpload()}
                color={"#FE9677"}
              ></Button>
            </View>
          </View>
        </View>

        <View style={{ width: "80%", marginTop: "10%" }}>
          <Text
            style={{
              marginBottom: 20,
              fontWeight: "700",
              fontSize: 24,
              alignSelf: "center",
            }}
          >
            Modify User Details.
          </Text>
          <Controller
            control={control}
            rules={{
              required: false,
              validate: async (value) => {
                if (value.length === 0) {
                  return true;
                }
                if (!(await checkUsername(value))) {
                  return "Username is already taken!";
                }
                return true;
              },
              minLength: {
                value: 3,
                message: "Username has to be at least 3 characters!",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={user.username}
                autoCapitalize="none"
                errorMessage={errors.username && errors.username.message}
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            rules={{
              required: { value: false, message: "Email is required!" },
              pattern: {
                value:
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: "Not an email address!",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
                placeholder={user.email}
                errorMessage={
                  errors.username && <Text>This field is required!</Text>
                }
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            required={false}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="password"
                autoCapitalize="none"
                secureTextEntry={true}
                errorMessage={
                  errors.username && <Text>This field is required!</Text>
                }
              />
            )}
            name="password"
          />

          <Button
            title="save changes"
            onPress={handleSubmit(changeCredentials)}
            color={"#984063"}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default Settings;
