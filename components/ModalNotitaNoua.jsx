import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle, faSave } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faPalette } from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';


const ModalNotitaNoua = ( { visibilityModalNotitaNoua, setVisibilityModalNotitaNoua, adaugaNotita, populareNotite,
                            setVisibilityModalSetariNotite, culoareGeneralaTextNotita, culoareGeneralaFundalNotita, 
                            culoareFundal, culoareText, setCuloareFundal, setCuloareText, styles
                        } ) => {

    const [titlu,       setTitlu]       = useState('')
    const [continut,    setContinut]    = useState('')

    useEffect( () => {
            if(visibilityModalNotitaNoua){
                setCuloareFundal(culoareGeneralaFundalNotita)
                setCuloareText  (culoareGeneralaTextNotita)  
            }
        }, [visibilityModalNotitaNoua]
    )

    //resetare valori
    const handleCloseModal = () => {
        setTitlu('')
        setContinut('')
        setVisibilityModalNotitaNoua(false)
    }

    const handleSaveNotita = () => {
        console.log(culoareText)
        console.log(culoareFundal)
        adaugaNotita(titlu, continut, culoareText, culoareFundal)
        populareNotite()
        handleCloseModal()
    }
    
    const handleOpenModalSetari = () => {
        setVisibilityModalSetariNotite(true)
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
                                onPress={handleOpenModalSetari}
                                style={{paddingRight: 7}}
                            >
                                <FontAwesomeIcon icon={faPalette} size={25} color='cyan'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.containerModalNotita}>
                    <TextInput 
                        multiline={false} 
                        placeholder='Titlu' 
                        placeholderTextColor={"gray"} 
                        style={[styles.textInput, {textAlign: "center"}]}
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
                    style={[styles.floatingButtonEdit]}
                    onPress={handleSaveNotita}
                >
                    <FontAwesomeIcon icon={faSave} size={33} color='cyan'/>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
export default ModalNotitaNoua
