import useUser from "../hooks/UserApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLogin from "../hooks/LoginApi";

const UserTest = async () => {
  const {
    getUserByToken,
    getUserAvatar,
    postUser,
    checkUsername,
    modifyUser,
    getUserById,
    getUsers,
  } = useUser();

  const { postLogin } = useLogin();

  const newUser = {
    username: "test_user_changed",
    password: "test_password_changed",
    email: "test@test.com",
  };

  const user_id = 2322;

  let res;

  /*
  res = await getUserByToken();

  res = await postUser({
    username: "test_user",
    password: "test_password",
    email: "test@test.com",
  });
  */

  res = await postLogin(newUser);

  /*
  res = await modifyUser({
    username: "test_user_changed",
    password: "test_password_changed",
  });
  */

  res = await getUserById(user_id);
  res = await getUsers();
  res = await checkUsername("test_user_changed");
};

export default UserTest;
