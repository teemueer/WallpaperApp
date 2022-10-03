import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";

const fetchUserMedia = (mediaToggle) => {
  const [userMedia, setUserMedia] = useState([]);

  const loadUserPosts = async () => {
    try {
        /*
            Ajattelin että ei mitään järkeä tehdä omaa hookkia sille,
            että saa haettua 'favourites'. mediaTogglella saa profiilista
            vaihettua näkymään liketyt tai omat postaukset
            -Juho 28.09.
        */
        let url = `${baseUrl}/media/user`
        if(mediaToggle){ url = `${baseUrl}/favourites`
        }
      const response = await myFetch(url);
      const media = await Promise.all(
        response.map(async (item) => {
          const response = await myFetch(`${baseUrl}/media/${item.file_id}`);
          return response;
        })
      );
      setUserMedia(media);
    } catch (error) {
      console.error("loadUserPosts():", error.message);
    }
  };

  useEffect(() => {
    loadUserPosts();
  }, [mediaToggle]);

  return { userMedia };
};

export default fetchUserMedia;
