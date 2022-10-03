import useLogin from "../hooks/LoginApi";
import useMedia from "../hooks/MediaApi";

const MediaTest = async () => {
  const {
    getMediaById,
    deleteMediaById,
    getAllMedia,
    getMediaByUserId,
    getMyMedia,
    searchMedia,
    updateMediaById,
    postMedia,
  } = useMedia();

  const { postLogin } = useLogin();

  const media_id = 3956;
  const user_id = 2134;

  let res;
  //res = await postLogin({ username: "teemu", password: "salasana2" });
  //res = await getMyMedia();
  //res = await getMediaByUserId(user_id);
  //res = await getAllMedia();
  //res = await searchMedia({ title: "deja vu" });
  //res = await updateMediaById(media_id, { title: "changed the title" });
  console.log(res);
};

export default MediaTest;
