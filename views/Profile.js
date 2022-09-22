import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Card, Button } from "@rneui/base";

const Profile = () => {
  const { setLoggedIn } = useContext(MainContext);

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <Card>
      <Card.Title>Profile</Card.Title>
      <Button title="Logout" onPress={() => logout()} />
    </Card>
  );
};

export default Profile;
