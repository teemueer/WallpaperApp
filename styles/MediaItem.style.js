import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 0.5,
    borderRadius: 20,
  },
  title: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(147, 147, 147, 0.7)",
    width: "100%",
    height: 50,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
});
