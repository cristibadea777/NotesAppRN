import React from 'react';
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function App() {

  const handleOnPressNew = () => {
    console.log('clicked')
    setVisibilityModalNew(true)
  }

  const [visibilityModalNew, setVisibilityModalNew] = React.useState(false)


  return (    
    <View style={styles.containerPrincipal}>

      <StatusBar style="auto"> </StatusBar>

      <View style={ [ styles.containerNotite, {} ] }>

        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={handleOnPressNew}
        >
          <Text style={styles.textButonNew}>+</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={visibilityModalNew}
          onRequestClose={() => {
            setVisibilityModalNew(!visibilityModalNew)
          }}
        >

          <View style={styles.containerModal}>

              <TouchableOpacity 
              >
                <Text style={styles.textButonNew}>X</Text>
              </TouchableOpacity>
                
              <TouchableOpacity 
                  style={[styles.floatingButton, {backgroundColor: '#232B2B'}]}
                >
                  <Text style={styles.textButonNew}>Save</Text>
              </TouchableOpacity>

          </View>

        </Modal>

      </View>
    
    </View>
  );
}

//culori  #232B2B #1e1e1e


const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#232B2B',
  },

  containerModal:{
    flex: 1,
    backgroundColor: '#1e1e1e',
  },

  containerNotite: {
    flex: 1,
    width: '100%',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 33,
    right: 33,
    backgroundColor: '#1e1e1e',
    width: 70,
    height: 70,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  textButonNew: {
    fontSize: 33,
    color: 'cyan'
  },

  bottomRightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 16,
  },


});

//Module instalate cu npm install:
//react-native-paper
