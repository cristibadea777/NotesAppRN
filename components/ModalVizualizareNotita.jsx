import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faClockRotateLeft, faPalette, faPallet, faPenNib } from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';


const ModalVizualizareNotita = ( {  visibilityModalVizualizareNotita, setVisibilityModalVizualizareNotita, notitaCurenta, updateNotita, 
                                    populareNotite, setVisibilityModalSetariNotite, culoareFundal, setCuloareFundal, culoareText, setCuloareText,
                                } ) => {


    const [titlu,           setTitlu]           = useState('')
    const [continut,        setContinut]        = useState('')


    useEffect(
        () => {
            if(notitaCurenta !== null ){
                console.log(notitaCurenta)
                setTitlu        (notitaCurenta.titlu)
                setContinut     (notitaCurenta.continut)
                setCuloareFundal(notitaCurenta.culoareFundal)
                setCuloareText  (notitaCurenta.culoareText) 
            }
        }, [visibilityModalVizualizareNotita]
    )

    const handleCloseModal = () => {
        setTitlu('')
        setContinut('')
        setVisibilityModalVizualizareNotita(false)
    }

    //salvare notita editata (titlu si continut)
    const handleSaveNotita = () => {
        updateNotita(notitaCurenta, titlu, continut, culoareText, culoareFundal)
        populareNotite()
        handleCloseModal()
    }

    //deschidere modal setari 
    const handleOpenModalSetari = () => {
        setVisibilityModalSetariNotite(true)
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
                                onPress={handleOpenModalSetari}
                                style={{paddingRight: 7}}
                            >
                                <FontAwesomeIcon icon={faPalette} size={25} color='cyan'/>
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
                    style={[styles.floatingButtonEdit]}
                    onPress={handleSaveNotita}
                >
                    <FontAwesomeIcon icon={faPenNib} size={33} color='cyan'/>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export default ModalVizualizareNotita
