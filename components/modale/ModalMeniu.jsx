import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import styles from '../Styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faBoxesPacking, faCog, faDonate, faTrash } from '@fortawesome/free-solid-svg-icons';

const ModalMeniu = ( {visibilityModalMeniu, setVisibilityModalMeniu, setVizualizareNotite, setVizualizareGunoi, setVizualizareArhiva, setVisibilityModalSetariGenerale, culoarePictograme, setVisibilityModalDonate, styles} ) => {

    const handleCloseModal = () => {
        setVisibilityModalMeniu(false)
    }

    const handleVizualizareNotite = () => {
        setVizualizareNotite(true)
        setVizualizareGunoi(false)
        setVizualizareArhiva(false)
        handleCloseModal()
      } 
      const handleVizualizareGunoi = () => {
        setVizualizareNotite(false)
        setVizualizareGunoi(true)
        setVizualizareArhiva(false)
        handleCloseModal()
      } 
      const handleVizualizareArhiva = () => {
        setVizualizareNotite(false)
        setVizualizareGunoi(false)
        setVizualizareArhiva(true)
        handleCloseModal()
      } 
      const handleVizualizareSetari = () => {
        setVisibilityModalSetariGenerale(true)
      }
      const handleOpenModalDonate = () => {
        setVisibilityModalDonate(true)
      }

    return(
        <Modal
            animationType="fade"
            visible={visibilityModalMeniu}
            onRequestClose={handleCloseModal}
            transparent={true}
        >

            <View 
                style={[{flex: 1, flexDirection: "row"}]}
            >
                <View style={styles.containerModalMeniu}>
                    <View style={{height: "25%", backgroundColor: "cyan", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity
                            onPress={handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faBook} size={70} color='black'/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7} 
                        style={styles.elementModalMeniu}
                        onPress={handleVizualizareNotite}
                    >
                        <FontAwesomeIcon icon={faBook} size={33} color={culoarePictograme}/>
                        <Text style={styles.textElementModalMeniu}>All Notes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7} 
                        style={styles.elementModalMeniu}
                        onPress={handleVizualizareSetari}
                    >
                        <FontAwesomeIcon icon={faCog} size={33} color={culoarePictograme}/>
                        <Text style={styles.textElementModalMeniu}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7} 
                        style={styles.elementModalMeniu}
                        onPress={handleVizualizareArhiva}
                    >
                        <FontAwesomeIcon icon={faBoxesPacking} size={33} color={culoarePictograme}/>
                        <Text style={styles.textElementModalMeniu}>Archive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7} 
                        style={styles.elementModalMeniu}
                        onPress={handleVizualizareGunoi}    
                    >
                        <FontAwesomeIcon icon={faTrash} size={33} color={culoarePictograme}/>
                        <Text style={styles.textElementModalMeniu}>Trash</Text>
                    </TouchableOpacity>
                    {/*
                    <TouchableOpacity
                        activeOpacity={0.7} 
                        style={styles.elementModalMeniu}
                        onPress={handleOpenModalDonate}    
                    >
                        <FontAwesomeIcon icon={faDonate} size={33} color={culoarePictograme}/>
                        <Text style={styles.textElementModalMeniu}>Donate</Text>
                    </TouchableOpacity>
                    */}
                </View>        

                <View style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
                    <TouchableOpacity
                        style={{flex: 1}}
                        activeOpacity={1}
                        transparent={true}
                        onPress={handleCloseModal}
                    >
                    </TouchableOpacity>
                </View>


            </View>

        </Modal>
    )

}
export default ModalMeniu
