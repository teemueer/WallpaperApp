import useFavourite from "../hooks/FavouriteApi";

const FavouriteTest = async () => {
  const {
    postFavourite,
    deleteFavouriteByFileId,
    getFavouritesByFileId,
    getFavourites,
  } = useFavourite();

  const file_id = 3956;

  let res;
  //res = await postFavourite({ file_id });
  //res = await getFavouritesByFileId(file_id);
  //res = await getFavourites();
  res = await deleteFavouriteByFileId(file_id);
  console.log(res);
};

export default FavouriteTest;
