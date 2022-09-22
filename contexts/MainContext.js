import React, { useState } from "react";
import PropTypes from "prop-types";

export const MainContext = React.createContext();

export const MainProvider = (props) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <MainContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};
