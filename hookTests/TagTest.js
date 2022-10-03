import useTag from "../hooks/TagApi";

const TagTest = async () => {
  const { getMediaByTag, postTag, getTagsByFileId, getTags } = useTag();

  const file_id = 3956;
  const tag_id = 4500;

  let res;

  //res = await postTag({ file_id, tag: "test_tag" });
  //res = await getMediaByTag("test_tag");
  //res = await getTagsByFileId(file_id);
  //res = await getTags();
  //console.log(res);
};

export default TagTest;
