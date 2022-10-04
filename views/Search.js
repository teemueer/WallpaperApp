import { Card, Input, Button } from "@rneui/base";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { MainContext } from "../contexts/MainContext";
import { StyleSheet } from "react-native";
import MediaList from "../components/MediaList";

import useMedia from "../hooks/MediaApi";
import useTag from "../hooks/TagApi";

const Tag = ({ tag, onPress }) => (
  <Button title={tag} onPress={() => onPress(tag)} />
);

const Search = ({ navigation }) => {
  const { searchTags, getMediaByTag } = useTag();
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState([]);

  const search = async (event) => {
    event.preventDefault();

    const tag = event.nativeEvent.text;
    if (tag.length < 3) {
      setTags([]);
      return;
    }

    const tags = await searchTags(tag);
    setTags(tags);
  };

  const toggleTag = async (tag) => {
    const media = await getMediaByTag(tag);
    setMedia(media);
    setTags([]);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <Card>
      <Card.Title>Search</Card.Title>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Looking for something?"
            autoCapitalize="none"
            onChange={(event) => search(event)}
          />
        )}
        name="search"
      />

      <Card.Divider />

      {tags.map((tag, idx) => (
        <Tag key={idx} tag={tag} onPress={toggleTag} />
      ))}

      <Card.Divider />

      {media ? <MediaList media={media} navigation={navigation} /> : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "red",
    borderRadius: 20,
  },
});

export default Search;
