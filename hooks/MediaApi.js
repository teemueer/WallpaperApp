import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";

const useMedia = () => {
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
      const json = await myFetch(`${baseUrl}/media/all`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMediaByUserId = async (user_id) => {
    try {
      const json = await myFetch(`${baseUrl}/media/user/${user_id}`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMyMedia = async () => {
    try {
      const json = await myFetch(`${baseUrl}/media/user`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMedia = async (offset = 0, limit = 20) => {
    try {
      const json = await myFetch(
        `${baseUrl}/media?start=${start}&limit=${limit}`,
        "GET"
      );
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const searchMedia = async (data) => {
    try {
      const json = await myFetch(`${baseUrl}/media/search`, "POST", data);
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

export default /*useMedia*/ fetchUserMedia;
