import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      backgroundColor: '#232B2B',
    },
  
    containerModal:{
      flex: 1,
      backgroundColor: '#1e1e1e',
    },

    containerModalMeniu:{
      width: "45%",
      height: "100%",
      backgroundColor: "#232B2B",
      borderRightColor: "cyan",
      borderWidth: 1,
    },

    elementModalMeniu:{
      height: "12%", 
      marginTop: 33, 
      justifyContent: "center", 
      alignItems: "center", 
      flexDirection: "row",
    },

    textElementModalMeniu:{
      margin: 7, 
      fontSize: 33, 
      color: "cyan",
    },

    containerModalConfirmare:{
      flex: 1,
    },

    contentModalConfirmare:{
      position: "absolute",
      top: "24%",
      right: "10%", //centrat pt ca width este 80, deci e 10 cu 10
      width: "80%",  
      height: "24%", 
      backgroundColor: "#11574a", //ever green
      borderWidth: 7,
      borderColor: "black"
    },

    textModalConfirmare:{
      fontSize: 22,
      color: "black",
      padding: 7,
      fontWeight: "bold",
    },

    butonConfirmare: {
      position: "absolute",
      bottom: "10%",
      width: "40%", 
      height: "80%",
      backgroundColor: "yellow",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "black"
    },

    containerNotite: {
      flex: 1,
      width: '100%',
    },

    containerBara: {
      flexDirection: 'row',
      height: "7%",
      width: '100%',
      backgroundColor: '#1e1e1e'
    },
  
    containerBaraStanga: {
      width: "50%",
      height: "100%", 
      flexDirection: "row", 
      alignItems: "center"
    },
  
    containerBaraDreapta: {
      width: "50%",
      height: "100%",
      alignItems: "flex-end",
      justifyContent: "center",
    },
  
    containerTextNotitaModal: {
      flex: 1,
      color: "white",
    },
  
    floatingButtonNew: {
      position: 'absolute',
      backgroundColor: '#1e1e1e',
      width: 70,
      height: 70,
      borderRadius: 55,
      borderWidth: 1,
      borderColor: "#232B2B",
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      bottom: 15, right: 10
    },

    floatingButtonEdit:{
      backgroundColor: '#232B2B', 
      bottom: 15, 
      right: 10,
      position: 'absolute',
      width: 70,
      height: 70,
      borderRadius: 55,
      borderWidth: 1,
      borderColor: "#1e1e1e",
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
  
    textButonNew: {
      fontSize: 33,
      color: 'cyan'
    },
  
    textInput:{
      fontSize: 25,
      backgroundColor: '#1e1e1e',
      color: "white",
      padding: 15,
    },

    notita: {
      margin: 7,
      width: "30%",
      height: 150, 
      backgroundColor: "#1e1e1e", 
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 3,
      padding: 2
    },

    notitaSelectata: {
      margin: 7,
      width: "30%",
      height: 150, 
      backgroundColor: "#1e1e1e", 
      borderColor: "cyan",
      borderWidth: 2,
      borderRadius: 3,
      padding: 2
    },

    textNotita: {
      color: "white",
      justifyContent: 'center',
      textAlign: 'left',
      fontSize: 17
    },

    textBara: {
      color: "white", 
      justifyContent: 'center',
      fontSize: 22,
      padding: 1,
      marginLeft: 40,
    },

    containerModalSetariNotite: {
      backgroundColor: "#232B2B",
      borderColor: "black",
      borderWidth: 3,
      height: "40%", 
      width: "80%",
    },

    textTitluModal: {
      color: "cyan",
      fontSize: 33, 
      fontWeight: "bold",
    },

    textModal: {
      color: "cyan",
      fontSize: 20, 
      fontWeight: "bold",
    },

    elementModal: {
      width: "50%", 
      justifyContent: "center", 
      alignItems: "flex-start",
      padding: 7,
      margin: 1
    },

    butonModal: {
      width: "70%", 
      height: "100%", 
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "black"
    },

    textButonModal: {
      color: "black",
      fontSize: 24, 
      fontWeight: "bold",
    },

    butonCuloare: {
      width: "50%", 
      height: "100%", 
      justifyContent: "center", 
      alignItems: "center",
    },

  });
  export default styles