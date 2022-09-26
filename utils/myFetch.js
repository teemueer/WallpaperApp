import AsyncStorage from "@react-native-async-storage/async-storage";

const myFetch = async (url, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const token = await AsyncStorage.getItem("userToken");

    if (token) {
      options.headers["x-access-token"] = token;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    const json = await res.json();

    if (res.ok) {
      return json;
    } else {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default myFetch;
