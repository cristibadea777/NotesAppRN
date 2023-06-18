import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import styles from './Styles';

const ModalMeniu = ( {visibilityModalMeniu, setVisibilityModalMeniu} ) => {

    const handleCloseModal = () => {
        setVisibilityModalMeniu(false)
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
                </View>        

                <TouchableOpacity
                    style={{flex: 1}}
                    activeOpacity={1}
                    transparent={true}
                    onPress={handleCloseModal}
                >
                </TouchableOpacity>

            </View>

        </Modal>
    )

}
export default ModalMeniu
