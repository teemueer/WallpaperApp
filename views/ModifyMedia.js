import { Input } from "@rneui/base";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Image, Text, Button, Modal, ScrollView } from "react-native";
import { MainContext } from "../contexts/MainContext";
import useMedia from "../hooks/MediaApi";
import useTag from "../hooks/TagApi";
import styles from "../styles/ModifyMedia.style";

const ModifyMedia = ({ navigation, route }) => {
  const file = route.params.file;

  const { update, setUpdate } = useContext(MainContext);

  const { allTags, updateMediaById, getMediaById, getMediaDetailsAndSort } =
    useMedia();
  const { postTag } = useTag();

  const [foundTags, setFoundTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [title, setTitle] = useState(file.title);
  const [description, setDescription] = useState(file.description);

  const search = async (event) => {
    const tagToSearch = event.nativeEvent.text;
    if (tagToSearch.length > 1) {
      const foundTags = allTags.filter(
        (tag) => !selectedTags.includes(tag) && tag.includes(tagToSearch)
      );
      setFoundTags(foundTags);
    } else {
      setFoundTags([]);
    }
  };

  const selectTag = (tagSelected) => {
    console.log("select", tagSelected);
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
      let newFile = await getMediaById(file.file_id);
      newFile = (await getMediaDetailsAndSort([newFile]))[0];
      newFile = navigation.navigate("Single", { file: newFile });
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

  let buttonDisabled =
    title === file.title &&
    description === file.description &&
    selectedTags.length === 0;


  return (
    <ScrollView style={styles.background}>
      <View style={{backgroundColor: "#41436A"}}>
      <View style={styles.info}>
        <View>
          <Text style={styles.header}>Title</Text>
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
                onChange={(event) => setTitle(event.nativeEvent.text)}
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
          <Text style={styles.header}>Description</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                onChange={(event) => setDescription(event.nativeEvent.text)}
                value={value}
                placeholder={file.description}
              />
            )}
            name="description"
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text>Current tags: {file.tags.join(", ")}</Text>
        </View>

        <View>
          {selectedTags.map((tag, idx) => {
            return (
              <Button
                key={idx}
                title={tag}
                color="green"
                onPress={() => removeTag(tag)}
              />
            );
          })}
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
              <Button
                key={idx}
                title={tag}
                onPress={() => selectTag(tag)}
                color="#41436A"
              />
            ))}
            {searchInput.length > 0 && !selectedTags.includes(searchInput) ? (
              <Button
                color="#984063"
                title={`Add new tag '${searchInput}'`}
                onPress={() => addNewTag()}
              />
            ) : null}
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Button
            title="Save changes"
            onPress={handleSubmit(save)}
            disabled={buttonDisabled}
          />
        </View>
      </View>
      </View>
    </ScrollView>
  );
};

export default ModifyMedia;
