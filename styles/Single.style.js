import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //backgroundColor: "rgba(65, 67, 106, 1)",
    backgroundColor: "white",
  },
  single: {
    margin: 0,
    borderRadius: 0,
    overflow: "hidden",
    flex: 2.4,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(65, 67, 106, 1)",
  },
  image_container: {
    flex: 4,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 45,
  },
  info: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(65, 67, 106,2)",
    paddingHorizontal: 5,
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
  },
  author: {
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center",
  },
  download: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
  },

  //These elements are on top of the picture.
  likeButton: {
    position: "absolute",
    top: "4%",
    right: "5%",
  },
  actionCluster: {
    position: "absolute",
    bottom: "5%",
    right: "4.5%",
  },
  postAvatarContainer: {
    position: "absolute",
    top: "2%",
    left: "2%",
    backgroundColor: "rgba(65, 67, 106, .7)",
    width: 160,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderRadius: 45,
  },
  postAvatar: {
    height: 45,
    width: 45,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    marginRight: 10,
  },
  floatingDescription: {
    position: "absolute",
    bottom: "5%",
    left: "2%",
    backgroundColor: "rgba(65, 67, 106, .7)",
    minHeight: 70,
    minWidth: 240,
    maxWidth: 300,
    justifyContent: "center",
    padding: 15,
    borderRadius: 35,
  },

  //Comment Modal styling
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalStyle: {
    margin: 20,
    paddingTop: 35,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    width: "80%",
    minHeight: "20%",
    maxheight: "25%",
  },

  //Comment section styling
  commentSection: {
    flex: 2,
    alignItems: "center",
    //backgroundColor: "rgba(204, 211, 255, 1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
