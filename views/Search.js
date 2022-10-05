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
  const { allTags, filterMediaByTag } = useMedia();
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState([]);

  const search = async (event) => {
    const tagToSearch = event.nativeEvent.text;
    if (tagToSearch.length > 0) {
      const tags = allTags.filter((tag) => tag.name.includes(tagToSearch));
      setTags(tags);
    } else {
      setTags([]);
    }
  };

  const toggleTag = (tag) => {
    const media = filterMediaByTag(tag);
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

      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag.name} onPress={toggleTag} />
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
