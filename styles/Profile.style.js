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
        height: 100,
        width: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 4,
        borderColor: "white",
      },
      avatarPosition: {
        position: "relative",
        left: -30,
        top: 10,
      },
      userInfo: {
        flexDirection:'row',
        alignItems:'center'
       
      },
      userContainer: {
        flex: 1,
        paddingTop: 10,
      },
      row: {
        flexDirection: "row",
        marginBottom: 20,
      },
});
