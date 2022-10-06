import { Card, Input, Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import MediaList from "../components/MediaList";

import useMedia from "../hooks/MediaApi";

const Tag = ({ tag, onPress, selected = false }) => (
  <Button
    color={selected ? "green" : "blue"}
    title={tag}
    onPress={() => onPress(tag)}
  />
);

const Search = ({ navigation }) => {
  const { allTags, filterMediaByTags } = useMedia();

  const [foundTags, setFoundTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [media, setMedia] = useState([]);

  const search = async (event) => {
    const tagToSearch = event.nativeEvent.text;
    if (tagToSearch.length > 0) {
      const foundTags = allTags.filter((tag) => tag.includes(tagToSearch));
      setFoundTags(foundTags);
    } else {
      setFoundTags([]);
    }
  };

  const selectTag = (tagSelected) => {
    setSelectedTags(selectedTags.concat(tagSelected));
    setFoundTags(foundTags.filter((tag) => tag !== tagSelected));
    setFoundTags([]);
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
    //setFoundTags(foundTags.concat(tagToRemove));
  };

  useEffect(() => {
    if (selectedTags.length > 0) {
      const filteredMedia = filterMediaByTags(selectedTags);
      setMedia(filteredMedia);
    } else {
      setMedia([]);
    }
  }, [selectedTags]);

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
    <>
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

      {selectedTags.map((tag, idx) => (
        <Tag key={idx} tag={tag} onPress={removeTag} selected={true} />
      ))}

      {foundTags.map((tag, idx) => (
        <Tag key={idx} tag={tag} onPress={selectTag} />
      ))}

      {media ? <MediaList media={media} navigation={navigation} /> : null}
    </>
  );
};

export default Search;
