import React, { useState } from "react";
import PropTypes from "prop-types";

export const MainContext = React.createContext();

export const MainProvider = (props) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [avatar, setAvatar] = useState("http://placekitten.com/640");
  const [update, setUpdate] = useState(false);
  const [favourites, setFavourites] = useState([])

  return (
    <MainContext.Provider
      value={{ user, setUser, loggedIn, setLoggedIn, update, setUpdate, avatar, setAvatar,
      favourites, setFavourites }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};
