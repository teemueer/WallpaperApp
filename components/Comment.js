import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useUser from "../hooks/UserApi";

const Comment = ({ comment }) => {
  const { getUserById } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserById(comment.user_id).then((user) => setUsers(user));
  }, []);

  return (
    <View
      style={{
        backgroundColor: "grey",
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          backgroundColor: "blue",
          justifyContent: "space-between",
          flexDirection: "row",
          height: 35,
          alignItems: "center",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", marginLeft: 15 }}>
          {users.username}
        </Text>
        <Text>Hello</Text>
      </View>
      <View style={{ minHeight: 40 }}>
        <Text>{comment.comment}</Text>
      </View>
    </View>
  );
};
export default Comment;
