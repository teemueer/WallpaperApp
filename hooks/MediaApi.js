import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { baseUrl, mainTag } from "../utils/config";
import myFetch from "../utils/myFetch";
import useTag from "./TagApi";

const useMedia = () => {
  const { getMediaByTag, getTagsByFileId } = useTag();

  const getMediaDetailsAndSort = async (json) => {
    // get file details
    json = await Promise.all(
      json.map(async (item) => await getMediaById(item.file_id))
    );

    // get file tags
    json = await Promise.all(
      json.map(async (item) => {
        let tags = await getTagsByFileId(item.file_id);
        tags = tags.map((tag) => ({ id: tag.tag_id, name: tag.tag }));
        return { ...item, tags: tags.filter((tag) => tag.name !== mainTag) };
      })
    );

    // add uri to the object
    json = json.map((item) => ({
      ...item,
      uri: `${baseUrl}/uploads/${item.filename}`,
    }));

    // sort by date
    json.sort((a, b) => (a.time_added > b.time_added ? -1 : 1));

    return json;
  };

  const getMediaById = async (id) => {
    try {
      const json = await myFetch(`${baseUrl}/media/${id}`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteMediaById = async (id) => {
    try {
      const json = await myFetch(`${baseUrl}/media/${id}`, "DELETE");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getAllMedia = async () => {
    try {
      let json = await getMediaByTag(mainTag);
      json = await getMediaDetailsAndSort(json);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMediaByUserId = async (user_id) => {
    try {
      let json = await myFetch(`${baseUrl}/media/user/${user_id}`, "GET");
      json = await getMediaDetailsAndSort(json);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMyMedia = async () => {
    try {
      let json = await myFetch(`${baseUrl}/media/user`, "GET");
      json = await getMediaDetailsAndSort(json);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMedia = async (offset = 0, limit = 20) => {
    try {
      let json = await myFetch(
        `${baseUrl}/media?start=${start}&limit=${limit}`,
        "GET"
      );
      json = await getMediaDetailsAndSort(json);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const searchMedia = async (data) => {
    try {
      let json = await myFetch(`${baseUrl}/media/search`, "POST", data);
      json = await getMediaDetailsAndSort(json);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateMediaById = async (id, data) => {
    try {
      const json = await myFetch(`${baseUrl}/media/${id}`, "PUT", data);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postMedia = async (data) => {
    try {
      const json = await myFetch(`${baseUrl}/media`, "POST", data, false);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    getMediaById,
    deleteMediaById,
    getAllMedia,
    getMediaByUserId,
    getMyMedia,
    getMedia,
    searchMedia,
    updateMediaById,
    postMedia,
    getMediaDetailsAndSort,
  };
};

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
      let url = `${baseUrl}/media/user`;
      if (mediaToggle) {
        url = `${baseUrl}/favourites`;
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

export default useMedia /*, fetchUserMedia*/;
