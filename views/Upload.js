import { Button, Card } from "@rneui/base";
import useMedia from "../hooks/MediaApi";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const Upload = () => {
  const { postMedia } = useMedia();

  const [image, setImage] = useState(null);

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

    const res = await postMedia(formData);
    console.log(res);
  };

  const onSelect = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.cancelled) {
      setImage(res);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { title: "test", description: "" },
  });

  return (
    <Card>
      <Card.Title>Upload</Card.Title>
      <Button title="Select file" onPress={onSelect} />
      <Button onPress={handleSubmit(onUpload)}>Upload</Button>
    </Card>
  );
};

export default Upload;
