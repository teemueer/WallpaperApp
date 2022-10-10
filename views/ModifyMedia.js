import { Input } from "@rneui/base";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, Button, Modal } from "react-native";
import { MainContext } from "../contexts/MainContext";
import useMedia from "../hooks/MediaApi";
import useTag from "../hooks/TagApi";
import styles from "../styles/ModifyMedia.style";

const Tag = ({ tag, onPress, selected = false }) => (
  <Button
    color={selected ? "green" : "blue"}
    title={tag}
    onPress={() => onPress(tag)}
  />
);

const ModifyMedia = ({ navigation, route }) => {
  const file = route.params.file;

  const { update, setUpdate } = useContext(MainContext);

  const { allTags, updateMediaById } = useMedia();
  const { postTag } = useTag();

  const [foundTags, setFoundTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const search = async (event) => {
    const tagToSearch = event.nativeEvent.text;
    if (tagToSearch.length > 0) {
      const foundTags = allTags.filter(
        (tag) => !selectedTags.includes(tag) && tag.includes(tagToSearch)
      );
      setFoundTags(foundTags);
    } else {
      setFoundTags([]);
    }
  };

  const selectTag = (tagSelected) => {
    console.log(tagSelected);
    setSelectedTags(selectedTags.concat(tagSelected));
    setFoundTags(foundTags.filter((tag) => tag !== tagSelected));
    setFoundTags([]);
    setValue("search", "");
  };

  const removeTag = (tagToRemove) => {
    console.log(tagToRemove);
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
    //setFoundTags(foundTags.concat(tagToRemove));
  };

  const addNewTag = () => {
    // hack: fake id to new tags for convenience
    setSelectedTags(selectedTags.concat(searchInput));
    setValue("search", "");
  };

  const save = async () => {
    try {
      await updateMediaById(file.file_id, {
        title: getValues("title"),
        description: getValues("description"),
      });

      for (const tag of selectedTags) {
        const res = await postTag({ file_id: file.file_id, tag: tag });
        console.log(res);
      }

      setUpdate(!update);
      navigation.navigate("Single", { file });
    } catch (error) {
      console.error(error);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
      search: "",
    },
  });

  const searchInput = getValues("search");

  return (
    <View>
      <View style={styles.info}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="title"
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
              placeholder="description"
            />
          )}
          name="description"
        />
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text>Current tags: {file.tags.join(", ")}</Text>
      </View>

      <View>
        {selectedTags.map((tag, idx) => (
          <Tag key={idx} tag={tag} selected={true} onPress={removeTag} />
        ))}
      </View>

      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Search for tags"
              autoCapitalize="none"
              onChange={(event) => search(event)}
            />
          )}
          name="search"
        />
        <View>
          {foundTags.map((tag, idx) => (
            <Tag key={idx} tag={tag} onPress={selectTag} />
          ))}
          {searchInput.length > 0 && !selectedTags.includes(searchInput) ? (
            <Button
              title={`Add new tag '${searchInput}'`}
              onPress={addNewTag}
            />
          ) : null}
        </View>
      </View>
      <View>
        <Button title="Save changes" onPress={save} />
      </View>
    </View>
  );
};

export default ModifyMedia;
