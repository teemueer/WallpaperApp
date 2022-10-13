import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    //backgroundColor: "#41436A",
    backgroundColor: "white",
    position: "relative",
  },
  info: {
    height: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    padding: 30,
  },
  header: {
    fontWeight: "bold",
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  buttonStyle: {
    margin: 2,
    padding: 10,
    borderRadius: 15,
  },
});
