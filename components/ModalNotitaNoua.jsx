import React from 'react';
import { Modal, TouchableOpacity, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle, faSave } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';


const ModalNotitaNoua = ( {visibilityModalNotitaNoua, handleOnPressCloseModalNotitaNoua} ) => {

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibilityModalNotitaNoua}
            onRequestClose={handleOnPressCloseModalNotitaNoua}
        >
            <View style={styles.containerModal}>

                <View style={styles.containerBaraModal}>
                    <View style={[styles.containerBaraModalStanga, {paddingLeft: 7} ]}> 
                        <TouchableOpacity 
                            onPress={handleOnPressCloseModalNotitaNoua}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size={25} color='cyan'/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerBaraModalDreapta}>
                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity 
                            onPress={{}}
                            style={{marginRight: 20}}
                            >
                                <FontAwesomeIcon icon={faCircle} size={25} color='cyan'/>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={{}}
                                style={{paddingRight: 7}}
                            >
                                <FontAwesomeIcon icon={faCircle} size={25} color='cyan'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.containerTextNotitaModal}>
                    <TextInput 
                        multiline={false} 
                        placeholder='Titlu' 
                        placeholderTextColor={"gray"} 
                        style={[styles.textInput, {textAlign: "center"}]}
                    />
                    <TextInput 
                        multiline={true}  
                        placeholder='Text'  
                        placeholderTextColor={"gray"} 
                        style={[styles.textInput]}
                    />
                </View>
                

                <TouchableOpacity 
                    style={[styles.floatingButton, {backgroundColor: '#232B2B', borderColor: "#1e1e1e", bottom: 15, right: 10} ]}
                >
                    <FontAwesomeIcon icon={faSave} size={33} color='cyan'/>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export default ModalNotitaNoua
