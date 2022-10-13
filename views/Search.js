import { Card, Input, Button } from "@rneui/base";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import MediaList from "../components/MediaList";
import Magnifier from "../assets/Images/magnifier.svg";
import styles from "../styles/Search.style";

import useMedia from "../hooks/MediaApi";

const Tag = ({ tag, onPress, selected = false }) => (
  <Button
    color={selected ? "#FE9677" : "#41436A"}
    buttonStyle={styles.buttonStyle}
    title={selected ? tag + "     X" : tag}
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
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          <View style={styles.itemContainer}>
            <View style={styles.input}>
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
                    inputContainerStyle={{ margin: 0, padding: 0 }}
                  />
                )}
                name="search"
              />
            </View>
            <View style={styles.magnifier}>
              <Magnifier width={32} height={32}></Magnifier>
            </View>
          </View>

          <View style={styles.tagContainer}>
            {selectedTags.map((tag, idx) => (
              <Tag key={idx} tag={tag} onPress={removeTag} selected={true} />
            ))}
          </View>
          <View style={styles.tag}>
            {foundTags.map((tag, idx) => (
              <Tag key={idx} tag={tag} onPress={selectTag} />
            ))}
          </View>
          {media ? <MediaList media={media} navigation={navigation} /> : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Search;
