import { Button, Card, Input, Text } from "@rneui/base";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { Alert } from "react-native";
import { MainContext } from "../contexts/MainContext";
import useMedia from "../hooks/MediaApi";

const Upload = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { postMedia } = useMedia();

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
      Alert.alert(res.message, "", [
        {
          text: "Ok",
          onPress: () => {
            resetForm();
            setUpdate(!update);
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      console.error("onSubmit upload failed", error);
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
    <Card>
      <Card.Image
        source={{ uri: image?.uri || "https://placekitten.com/300" }}
      />
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
              (errors.title?.type === "minLength" && <Text>Min 3 chars!</Text>)
            }
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Description"
          />
        )}
        name="description"
      />
      <Button title="Select file" onPress={onSelect} />
      <Button title="Reset" onPress={resetForm} />
      <Button
        title="Upload media"
        disabled={!image}
        loading={isLoading}
        onPress={handleSubmit(onUpload)}
      ></Button>
    </Card>
  );
};

export default Upload;
