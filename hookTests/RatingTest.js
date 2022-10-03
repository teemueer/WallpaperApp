import useRating from "../hooks/RatingApi";

const RatingTest = async () => {
  const { postRating, deleteRatingByFileId, getRatingsByFileId, getRatings } =
    useRating();

  const file_id = 3956;

  let res;
  //res = await postRating({ file_id, rating: 5 });
  //res = await getRatingsByFileId(file_id);
  //res = await getRatings();
  //res = await deleteRatingByFileId(file_id);
  //console.log(res);
};

export default RatingTest;
