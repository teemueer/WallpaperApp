import { Card } from "@rneui/base";
import { useEffect, useState } from "react";
import MediaList from "../components/MediaList";
import useUser from "../hooks/UserApi";
import { View } from "react-native";
import styles from "../styles/Home.style";
import useMedia from "../hooks/MediaApi";
import useTag from "../hooks/TagApi";

const Home = ({ navigation }) => {
  const { allMedia, allTags } = useMedia();


  return (
    <View style={styles.background}>
      <View style={styles.feed}>
        <Card.Title style={styles.text}>Home</Card.Title>
        {allMedia ? (
          <MediaList media={allMedia} navigation={navigation} />
        ) : null}
      </View>
    </View>
  );
};

export default Home;
