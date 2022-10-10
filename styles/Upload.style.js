import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  background: {
    backgroundColor: "rgba(65, 67, 106, 1)",
  },
  container: {
    width: "100%",
    alignItems: "center",
    height: "100%",
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    backgroundColor: "white"
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  imageContainer: {
    height: 250,
    width: 300,
    marginTop: "40%",
    display: "flex",
    paddingLeft: 20,
    marginBottom: "10%",
  },
  imageStyle: {
    height: 250,
    width: 350,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 8
  },
  input: {
    backgroundColor: "#F7F4F4",
    borderRadius: 10,
    height: 50,
    width: "70%",
    marginTop: 25,
    paddingTop: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputBackground:{
  borderRadius: 30,
    position: "absolute",
    height: "110%",
    width: "85%",
    alignSelf:'center',
    paddingTop: 5
  },
  buttonContainer:{
    flex: 1,
    flexDirection: "row",
    marginTop: 35,
  },
  buttonStyle:{
    height: 60,
    width: 140,
    padding: 20,
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
    color: "white", fontSize: 24, fontWeight: "bold" ,
  }
});