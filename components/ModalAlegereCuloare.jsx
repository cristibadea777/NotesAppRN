import { View, Modal, Text, TouchableOpacity } from "react-native"
import styles from "./Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"


const ModalAlegereCuloare = ( { visibilityModalAlegereCuloare, setVisibilityModalAlegereCuloare, 
                                culoareCurenta, setCuloareCurenta, setareCurenta,
                               
                            } ) => {

    //inchidere modal, resetare setare curenta si culoare curenta, setare fundal/text cu culoarea curenta 
    const handleCloseModal = () => {
        setVisibilityModalAlegereCuloare(false)
    }

    useEffect(
        () => 
            {
                if(setareCurenta === 'fundal')
                   console.log("setOptiuneCuloareFundalNotita(culoareCurenta)")
                else if(setareCurenta === 'text')
                    console.log("setOptiuneCuloareTextNotita(culoareCurenta)")
                handleCloseModal()
            }, [culoareCurenta]
    )

    
    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={visibilityModalAlegereCuloare}
            onRequestClose={handleCloseModal}
        >
            <View style={[styles.containerBara, {backgroundColor: 'black'}]}>
                <View style={[styles.containerBaraStanga, {paddingLeft: 7} ]}> 
                    <TouchableOpacity 
                        onPress={handleCloseModal}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size={25} color='cyan'/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={styles.containerModalSetariNotite}>

                    <View style={{flexDirection: "row", height:"25%"}}>

                        <View style={{height: "100%", flexDirection:"row", backgroundColor: "white", width: "100%", alignItems: "center", justifyContent: "center"}}> 
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    setCuloareCurenta("blue")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={57} color={"blue"}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    setCuloareCurenta("yellow")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={57} color={"yellow"}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    setCuloareCurenta("red")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={57} color={"red"}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>
            </View>

        </Modal>
    )

}
export default ModalAlegereCuloare
