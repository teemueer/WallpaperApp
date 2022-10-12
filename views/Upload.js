import { Button, Card, Input, Text } from "@rneui/base";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { Alert, Modal, TouchableOpacity, View } from "react-native";
import { MainContext } from "../contexts/MainContext";
import useMedia from "../hooks/MediaApi";
import styles from "../styles/Upload.style";
import { Image } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import Error from "../components/Error";

const Upload = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { postMedia, getMediaDetailsAndSort } = useMedia();
  const [modalVisible, setModalVisible] = useState(false);

  const { update, setUpdate } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = async (data) => {
    const ext = image.uri.split(".").pop();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: `${image.type}/${ext === "jpg" ? "jpeg" : ext}`,
    });
    setIsLoading(true);
    try {
      const res = await postMedia(formData);
      const newFile = (await getMediaDetailsAndSort([res]))[0];
      Alert.alert(
        res.message,
        "Remember to modify tags for your file after upload!",
        [
          {
            text: "Ok",
            onPress: () => {
              resetForm();
              setUpdate(!update);
              navigation.navigate("Single", { file: newFile });
            },
          },
        ]
      );
    } catch (error) {
      Error("Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      //aspect: [4, 3],
      quality: 0.5,
    });

    if (!res.cancelled) {
      setImage(res);
    }
  };

  const resetForm = () => {
    setImage(null);
    setValue("title", "");
    setValue("description", "");
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { title: "", description: "" },
  });

  return (
    <View style={styles.background}>
      <View style={styles.spacer}></View>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={onSelect}>
          <Image
            source={{ uri: image?.uri || "https://placekitten.com/300" }}
            style={styles.imageStyle}
          />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={["#41436A", "#984063"]}
            style={styles.inputBackground}
          />
          <View style={styles.input}>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Title"
                  autoCapitalize="words"
                  errorMessage={
                    (errors.title?.type === "required" && (
                      <Text>This is required.</Text>
                    )) ||
                    (errors.title?.type === "minLength" && (
                      <Text>Min 3 chars!</Text>
                    ))
                  }
                />
              )}
              name="title"
            />
          </View>
          <View style={styles.input}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  maxLength={200}
                  value={value}
                  placeholder="Description"
                />
              )}
              name="description"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Select file"
            onPress={onSelect}
            color="#984063"
            style={styles.buttonStyle}
          />
          <Button
            title="Reset"
            onPress={resetForm}
            color="#FE9677"
            style={styles.buttonStyle}
          />
          <Button
            title="Post"
            disabled={!image}
            loading={isLoading}
            onPress={handleSubmit(onUpload)}
            color="#984063"
            style={styles.buttonStyle}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default Upload;
