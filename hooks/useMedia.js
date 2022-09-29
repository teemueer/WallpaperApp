import myFetch from '../utils/myFetch';
import {baseUrl, mainTag} from '../utils/config';
import {useContext, useEffect, useState} from 'react';




const useMedia = (update) => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const json = await useTag().getFilesByTag(mainTag);
      const allMediaData = json.map(async (mediaItem) => {
        return await myFetch(baseUrl + 'media/' + mediaItem.file_id);
      });
      setMediaArray(await Promise.all(allMediaData));
    } catch (error) {
      console.log('media fetch failed', error);
    }
  };
  useEffect(() => {
    loadMedia();
  }, [update]);

  const postMedia = async (token, data) => {
    const options = {
      method: 'POST',
      headers: {'x-access-token': token},
      body: data,
    };
    try {
      return await myFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {mediaArray, postMedia};
};


const useTag = () => {
  const getFilesByTag = async (tag) => {
    return await myFetch(baseUrl + 'tags/' + tag);
  };

  const postTag = async (token, tag) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    };
    try {
      return await myFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {getFilesByTag, postTag};
};

export {useMedia, useTag};