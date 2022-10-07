import React, { useContext, useState } from "react";
import { Card, Image, Input, Text } from "@rneui/base";
import { MainContext } from "../contexts/MainContext";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";

const Settings = ({ navigation }) => {
  const { user, avatar } = useContext(MainContext);
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { username: user.username, email: user.email, password: "" },
  });

const resetForm = () => {
    setImage(null);
    setValue("title", user.username);
    setValue("email", user.email);
    setValue("password", "");
}


  return (
    <View style={{ backgroundColor: "rgba(65, 67, 106, 1)", flex: 1 }}>
      <View style={{ backgroundColor: "rgba(65, 67, 106, 1)", height: 30 }} />
      <View style={{ backgroundColor: "white", flex: 2 }}>
        <View style={{ justifyContent: "center", display: "flex" }}>
          <Text>Choose Image</Text>
          <Image
            source={{ uri: avatar }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 150 / 2,
              overflow: "hidden",
              borderWidth: 4,
              borderColor: "rgba(65, 67, 106, 1)",
            }}
          />
        </View>
        <View style={{}}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Username is required!" },
              validate: async (value) => {
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
                placeholder="Username"
                autoCapitalize="none"
                errorMessage={errors.username && errors.username.message}
              />
            )}
            name="username"
          />

          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Email is required!" },
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
                placeholder="email"
                errorMessage={
                  errors.username && <Text>This field is required!</Text>
                }
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{ required: true }}
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


        </View>
      </View>
    </View>
  );
};

export default Settings;
