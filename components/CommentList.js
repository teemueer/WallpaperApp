import { FlatList } from "react-native";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  const color = Math.floor(Math.random()*3)
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => <Comment comment={item} color={color}></Comment>}
    />
  );
};
export default CommentList;
