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

    containerNotite: {
      flex: 1,
      width: '100%',
    },

    containerBara: {
      flexDirection: 'row',
      height: "7%",
      width: '100%',
    },
  
    containerBaraStanga: {
      width: "30%",
      height: "100%", 
      alignItems: "flex-start",
      justifyContent: "center"
    },
  
    containerBaraDreapta: {
      width: "70%",
      height: "100%",
      alignItems: "flex-end",
      justifyContent: "center",
    },
  
    containerTextNotitaModal: {
      flex: 1,
      color: "white",
    },
  
    floatingButton: {
      position: 'absolute',
      backgroundColor: '#1e1e1e',
      width: 70,
      height: 70,
      borderRadius: 55,
      borderWidth: 1,
      borderColor: "#232B2B",
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
    }

  });
  export default styles