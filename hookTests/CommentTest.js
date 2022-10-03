import useComment from "../hooks/CommentApi";

const CommentTest = async () => {
  const { deleteCommentById, postComment, getCommentsByFileId, getMyComments } =
    useComment();

  const file_id = 3956;

  let res;
  res = await postComment({ file_id, comment: "test comment" });
  console.log(res);

  res = await getCommentsByFileId(file_id);
  console.log(res);

  res = await getMyComments();
  const comment_id = res[res.length - 1].comment_id;
  console.log(comment_id);

  res = await deleteCommentById(comment_id);
  console.log(res);
};

export default CommentTest;
