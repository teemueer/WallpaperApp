import { Card, Input, Button } from "@rneui/base";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import MediaList from "../components/MediaList";
import Magnifier from '../assets/Images/magnifier.svg'

import useMedia from "../hooks/MediaApi";

const Tag = ({ tag, onPress, selected = false }) => (
  <Button
    color={selected ? "green" : "blue"}
    title={tag}
    onPress={() => onPress(tag)}
    style={{marginRight:2,}}
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
      <View style={{ flex: 1, display: "flex", backgroundColor: "rgba(65, 67, 106, 1)"  }}>
        <View style={{backgroundColor: "rgba(65, 67, 106, 1)", flex: 1}}></View>
        <View style={{flex:50,backgroundColor:'white',borderTopRightRadius:45, borderTopLeftRadius:45}}>
        <View style={{ alignItems: "center", paddingTop: 20, marginBottom:10 }}>
          <View
            style={{
              width: "80%",
              borderColor: "#41436A",
              height:50,
              borderWidth: 2,
              borderRadius: 20,
              padding:0,margin:0,
              paddingLeft:5,
            }}
          >
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
                  inputContainerStyle={{margin:0, padding:0}}
                />
              )}
              name="search"
            />
          </View>
          <View style={{position:"absolute", right:'12%', top:'54%'}}>
          <Magnifier width={32} height={32}></Magnifier>
          </View>
        </View>
        <View style={{justifyContent:'center',  backgroundColor:'red', padding:20,}}>
        <View style={{flexDirection:'row', justifyContent:'center',marginBottom:10,}}>
          {selectedTags.map((tag, idx) => (
            <Tag key={idx} tag={tag} onPress={removeTag} selected={true} />
          ))}
        </View>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
          {foundTags.map((tag, idx) => (
            <Tag key={idx} tag={tag} onPress={selectTag} />
          ))}
        </View>
        </View>

        {media ? <MediaList media={media} navigation={navigation} /> : null}
      </View>
      </View>
    </>
  );
};

export default Search;
