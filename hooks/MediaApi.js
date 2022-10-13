import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { baseUrl, mainTag } from "../utils/config";
import myFetch from "../utils/myFetch";
import useTag from "./TagApi";
import useUser from "./UserApi";
import useRating from "./RatingApi";

const useMedia = () => {
  const { getMediaByTag, getTagsByFileId, postTag } = useTag();
  const { getUserById } = useUser();
  const { getRatingsByFileId } = useRating();

  const [allMedia, setAllMedia] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const { user, update, loggedIn } = useContext(MainContext);

  const getMediaDetailsAndSort = async (json) => {
    // get file details
    json = await Promise.all(
      json.map(async (item) => await getMediaById(item.file_id))
    );

    // get file tags
    json = await Promise.all(
      json.map(async (item) => {
        let tags = await getTagsByFileId(item.file_id);
        tags = tags.map((tag) => tag.tag);
        return { ...item, tags: tags.filter((tag) => tag !== mainTag) };
      })
    );

    // get file average rating
    json = await Promise.all(
      json.map(async (item) => {
        const ratings = await getRatingsByFileId(item.file_id);
        const rating = ratings.length
          ? ratings.reduce((acc, obj) => acc + obj.rating, 0) / ratings.length
          : null;
        return { ...item, rating: rating };
      })
    );

    // get user info
    if (loggedIn) {
      json = await Promise.all(
        json.map(async (item) => {
          let user = await getUserById(item.user_id);
          return { ...item, user };
        })
      );
    }

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
      //let json = await myFetch(`${baseUrl}/media/user/${user_id}`, "GET");
      //json = await getMediaDetailsAndSort(json);
      const json = allMedia.filter((media) => media.user.user_id === user_id);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMyMedia = async () => {
    try {
      let json = await myFetch(`${baseUrl}/media/user`, "GET");
      json = await getMediaDetailsAndSort(json);
      json = json.filter((media) => {
        if (media.tags.length === 0) return media;
        for (const tag of media.tags) {
          if (!tag.startsWith("avatar_")) return media;
        }
      });
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
      await postTag({ file_id: json.file_id, tag: mainTag });
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const filterMediaByTags = (tags) => {
    const filteredMedia = allMedia.filter((media) =>
      tags.every((tag) => media.tags.includes(tag))
    );
    return filteredMedia;
  };

  useEffect(() => {
    console.log("updating allmedia...");
    getAllMedia().then((allMedia) => {
      setAllMedia(allMedia);
      let allTags = [];
      for (const media of allMedia) {
        for (const tag of media.tags) allTags = allTags.concat(tag);
      }
      allTags = new Set(allTags);
      setAllTags([...allTags].sort());
    });
  }, [update]);

  return {
    allMedia,
    allTags,
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
    filterMediaByTags,
  };
};

export default useMedia;
