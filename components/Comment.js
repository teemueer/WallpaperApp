import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useUser from "../hooks/UserApi";

const Comment = ({ comment }) => {
  const { getUserById } = useUser();
  const [users, setUsers] = useState([]);
  const colors = ["#FE9677", "#F64668", "#984063"];
  var num = 2

  useEffect(() => {
    getUserById(comment.user_id).then((user) => setUsers(user));
  }, []);

  return (
    <View
      style={{
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      }}
    >
      <View style={{ display: "flex" }}>
        <View
          style={{
            backgroundColor: colors[num],
            flexDirection: "row",
            height: 30,
            justifyContent: "space-between",
            paddingTop: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700", marginLeft: 15, fontSize:16 }}>
            {users.username}
          </Text>
          <Text style={{ color: "white", paddingRight: 10 }}>
            {comment.time_added}
          </Text>
        </View>
        <View style={{ backgroundColor: "white", padding: 10, fontWeight:'500',fontSize:18 }}>
          <Text>
            {comment.comment}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Comment;
