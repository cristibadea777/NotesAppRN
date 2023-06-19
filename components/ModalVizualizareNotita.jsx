import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle, faSave } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faPenNib } from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';


const ModalVizualizareNotita = ( {visibilityModalVizualizareNotita, setVisibilityModalVizualizareNotita, notitaCurenta} ) => {

    const [titlu,       setTitlu]       = useState('')
    const [continut,    setContinut]    = useState('')

    useEffect(
        () => {
            setTitlu    (notitaCurenta.titlu)
            setContinut (notitaCurenta.continut)
        }, [visibilityModalVizualizareNotita]
    )

    const handleCloseModal = () => {
        setTitlu('')
        setContinut('')
        setVisibilityModalVizualizareNotita(false)
    }

    const handleSaveNotita = () => {
        //aici apelare functia de editare notita primita ca parametru
        handleCloseModal()
    }

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibilityModalVizualizareNotita}
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
                        placeholder='Titlu' 
                        placeholderTextColor={"gray"} 
                        multiline={false} 
                        style={[styles.textInput, {textAlign: "center"}]}
                        numberOfLines={1}
                        onChangeText={newText => setTitlu(newText)}      
                        defaultValue={titlu}                  
                    />
                    <TextInput 
                        placeholder='Continut' 
                        placeholderTextColor={"gray"} 
                        multiline={true}  
                        style={[styles.textInput]}
                        onChangeText={newText => setContinut(newText)}
                        defaultValue={continut}
                    />
                </View>
                

                <TouchableOpacity 
                    style={[styles.floatingButton, {backgroundColor: '#232B2B', borderColor: "#1e1e1e", bottom: 15, right: 10} ]}
                    onPress={handleSaveNotita}
                >
                    <FontAwesomeIcon icon={faPenNib} size={33} color='cyan'/>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export default ModalVizualizareNotita