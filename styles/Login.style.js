import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  imageContainer: {
    height: 100,
    width: 300,
    marginTop: "40%",
    display: "flex",
    paddingLeft: 20,
    marginBottom: "10%",
  },
  image: {
    height: 70,
    width: 250,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#F7F4F4",
    borderRadius: 10,
    height: 60,
    width: "75%",
    marginBottom: "10%",
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonContainer:{
    flex: 1, flexDirection: "row" 
  },
  buttonStyle:{
    height: 60,
              width: 140,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
  },
  buttonText:{
    color: "white", fontSize: 24, fontWeight: "bold" 
  }
});
