import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(65, 67, 106, 1)",
        position: "relative",
      },
      user: {
        backgroundColor: "#984063",
        flexDirection: "column",
        flex: 50,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        alignItems: "center",
        justifyContent: "center",
      },
      media: {
        backgroundColor: "#fff",
        flex: 2.5,
        flexDirection: "column",
        paddingTop: 10,
        padding: 15,
        width: "100%",
      },
      avatar: {
        height: 112,
        width: 112,
        borderRadius: 112 / 2,
        overflow: "hidden",
        borderWidth: 4,
        borderColor: "white",
      },
      avatarPosition: {
 
      },
      userInfo: {
        paddingTop:7
      },
      userContainer: {
        flex: 1.05,
        width:'100%',
        paddingTop: 10,
        alignItems:'center'
      },
      row: {
        width:'100%',
        flexDirection: "row",
        marginBottom: 20,
      },
});
