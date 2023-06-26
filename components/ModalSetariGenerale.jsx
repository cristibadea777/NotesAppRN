///daca e pt prima oara (nu se gasesc tabele in db) - se seteaza o variabila cu true
///var = true => nu se poate inchide decat cand se salveaza - buton cancel, bara de sus a modalului - dezactivate - nu se randeaza
///in rest, modalu o sa fie cel obisnuit pt alegerea schemei de culori 

import { Modal, Text, TouchableOpacity, View } from "react-native"
import styles from "./Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"


const ModalSetariGenerale = ( {visibilityModalSetariGenerale, setVisibilityModalSetariGenerale} ) => {

    const handleCloseModal = () => {
        setVisibilityModalSetariGenerale(false)
    }

    const handlePressOk = () => {
        handleCloseModal()
    }

    return (
        <Modal
            visible={visibilityModalSetariGenerale}
            onRequestClose={handleCloseModal}
            animationType="slide"
        >
            <View style={{flex: 1, backgroundColor: "#232B2B"}}>

                <View style={{height: "20%", alignItems: "center", justifyContent: "center"}}>
                    <Text style={styles.textTitluModal}> Settings </Text>
                </View>
                
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: "60%", margin: 7, padding: 7}}>
                        <Text style={styles.textModal}> App Background Color </Text>
                    </View>
                    <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => {
                                
                            }}
                        >
                            <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                <FontAwesomeIcon icon={faCircle} size={37} color={"#232B2B"}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: "60%", margin: 7, padding: 7}}>
                        <Text style={styles.textModal}> App Text Color </Text>
                    </View>
                    <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => {
                                
                            }}
                        >
                            <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                <FontAwesomeIcon icon={faCircle} size={37} color={"cyan"}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: "60%", margin: 7, padding: 7}}>
                        <Text style={styles.textModal}> Default Note Body Color </Text>
                    </View>
                    <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => {
                                
                            }}
                        >
                            <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                <FontAwesomeIcon icon={faCircle} size={37} color={"#1e1e1e"}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: "60%", margin: 7, padding: 7}}>
                        <Text style={styles.textModal}> Default Note Text Color </Text>
                    </View>
                    <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => {
                                
                            }}
                        >
                            <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                <FontAwesomeIcon icon={faCircle} size={37} color={"white"}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: "60%", margin: 7, padding: 7}}>
                        <Text style={styles.textModal}> New-Note Button Color </Text>
                    </View>
                    <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => {
                                
                            }}
                        >
                            <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                <FontAwesomeIcon icon={faCircle} size={37} color={"#1e1e1e"}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{width: "60%", margin: 7, padding: 7}}>
                        <Text style={styles.textModal}> Edit-Note Button Color </Text>
                    </View>
                    <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => {
                                
                            }}
                        >
                            <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                <FontAwesomeIcon icon={faCircle} size={37} color={"#232B2B"}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{height: "20%", alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity 
                        style={[styles.butonConfirmare, {height: "50%", width: "20%", backgroundColor: "cyan"}]}
                        onPress={handlePressOk}
                    > 
                        <Text style={styles.textButonModal}>OK</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </Modal>
    )
}
export default ModalSetariGenerale