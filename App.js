import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ModalNotitaNoua from './components/ModalNotitaNoua';
import styles from './components/Styles';


export default function App() {

  const [visibilityModalNotitaNoua, setVisibilityModalNotitaNoua] = React.useState(false)
  const handleOnPressOpenModalNotitaNoua = () => {
    setVisibilityModalNotitaNoua(true)
  }
  const handleOnPressCloseModalNotitaNoua = () => {
    setVisibilityModalNotitaNoua(false)
  }


  return (    
    <View style={styles.containerPrincipal}>

      <StatusBar style="auto"> </StatusBar>

      <View style={ [ styles.containerNotite, {} ] }>

        <ScrollView style={{flex: 1}}>
          <View style={{flexDirection: "row", width: "100%"}}>




            <TouchableOpacity style={styles.notita}> 
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[styles.textNotita, {fontSize: 17}]}
                  numberOfLines={1}
                >
                    Titlu Titlu Titlu Titlu Titlu Titlu Titlu
                </Text>
              </View>
              <Text 
                  style={[styles.textNotita, {fontSize: 12}]}
                  numberOfLines={8}
              >
                There are men who fear legends but a man legends fear, he's a four holstered reaper, having bullets and tears. 
                When Silas Greaves finds you, there's nowhere to run
                When Silas Greaves finds you, there's nowhere to run
              </Text> 
            </TouchableOpacity>

          </View>

          
        </ScrollView>

        <ModalNotitaNoua
          visibilityModalNotitaNoua         = {visibilityModalNotitaNoua}
          handleOnPressCloseModalNotitaNoua = {handleOnPressCloseModalNotitaNoua}
        />

        <TouchableOpacity 
          style={[styles.floatingButton, {bottom: 15, right: 10} ]}
          onPress={handleOnPressOpenModalNotitaNoua}
        >
          <FontAwesomeIcon icon={faPlus} size={33} color='cyan'/>
        </TouchableOpacity>

      </View>
    
    </View>
  );
}


//Module instalate cu npm install:

//npm install react-native-paper
//npm i --save @fortawesome/react-native-fontawesome @fortawesome/fontawesome-svg-core react-native-svg
//npm i --save @fortawesome/free-solid-svg-icons
//npm i --save @fortawesome/free-brands-svg-icons
//npm i --save @fortawesome/free-regular-svg-icons
//npx expo install react-native-svg
