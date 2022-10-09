import { FlatList } from "react-native";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => <Comment comment={item}></Comment>}
    />
  );
};
export default CommentList;
