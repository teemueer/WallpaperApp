import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(65, 67, 106, 1)",
  },
  b: {
    backgroundColor: "rgba(65, 67, 106, 1)",
    flex: 1,
  },
  background: {
    flex: 50,
    backgroundColor: "#984063",
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
  },
  itemContainer: {
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderColor: "#41436A",
    backgroundColor: "white",
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    padding: 0,
    margin: 0,
    paddingLeft: 5,
  },
  magnifier: {
    position: "absolute",
    right: "12%",
    top: "54%",
  },
  g: {
    justifyContent: "center",
    paddingTop: 20,
    borderBottomEndRadius: 40,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    flexWrap: "wrap",
  },
  buttonStyle: {
    margin: 2,
    padding: 10,
    borderRadius: 15,
  },
});
