import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle, faSave } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';


const ModalNotitaNoua = ( {visibilityModalNotitaNoua, setVisibilityModalNotitaNoua, adaugaNotita, populareNotite} ) => {

    const [titlu,       setTitlu]       = useState('')
    const [continut,    setContinut]    = useState('')

    const handleCloseModal = () => {
        setTitlu('')
        setContinut('')
        setVisibilityModalNotitaNoua(false)
    }

    const handleSaveNotita = () => {
        adaugaNotita(titlu, continut)
        populareNotite()
        handleCloseModal()
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibilityModalNotitaNoua}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.containerModal}>

                <View style={[styles.containerBara, {backgroundColor: 'black'}]}>
                    <View style={[styles.containerBaraStanga, {paddingLeft: 7} ]}> 
                        <TouchableOpacity 
                            onPress={handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} size={25} color='cyan'/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.containerBaraDreapta}>
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
                        multiline={true}
                        numberOfLines={1}
                        onChangeText={newText => setTitlu(newText)}
                        defaultValue={titlu}
                    />
                    <TextInput 
                        multiline={true}  
                        placeholder='Text'  
                        placeholderTextColor={"gray"} 
                        style={[styles.textInput]}
                        onChangeText={newText => setContinut(newText)}
                        defaultValue={continut}
                    />
                </View>
                

                <TouchableOpacity 
                    style={[styles.floatingButton, {backgroundColor: '#232B2B', borderColor: "#1e1e1e", bottom: 15, right: 10} ]}
                    onPress={handleSaveNotita}
                >
                    <FontAwesomeIcon icon={faSave} size={33} color='cyan'/>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export default ModalNotitaNoua
