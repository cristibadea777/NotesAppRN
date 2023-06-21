import { View, Modal, Text, TouchableOpacity } from "react-native"
import styles from "./Styles"

const ModalConfirmareActiune = ( { visibilityModalConfirmareActiune, setVisibilityModalConfirmareActiune, listaNotiteSelectate, 
                                    setVisibilityModalSelectareMultipla, deleteNotita, populareNotite, vizualizareGunoi, 
                                    deleteNotitaPermanent, restaurareNotitaStearsa, toBeRestored, setToBeRestored } 
                                ) => {


    const handleConfirmare = () => {
        setVisibilityModalConfirmareActiune(false)
        setVisibilityModalSelectareMultipla(false)
        listaNotiteSelectate.map( 
            (notita) => {
                if(toBeRestored){
                    restaurareNotitaStearsa(notita)
                    setToBeRestored(false)
                }
                else{
                    vizualizareGunoi ? deleteNotitaPermanent(notita) : deleteNotita(notita)    
                }
                
            }
        )
        listaNotiteSelectate.splice(0, listaNotiteSelectate.length)
        populareNotite()
    }

    const handleCloseModal = () => {
        setVisibilityModalConfirmareActiune(false)
    }


    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={visibilityModalConfirmareActiune}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.containerModalConfirmare}>
                <View style={styles.contentModalConfirmare}> 
                    <View style={{width: "100%", height: "50%", justifyContent: "center", alignItems: "center"}}>  
                        {
                        toBeRestored ? (
                            <Text style={styles.textModalConfirmare}>Restore {<Text style={{color: "cyan"}}>{listaNotiteSelectate.length}</Text>} notes ?</Text>
                        ) : 
                        vizualizareGunoi ? (
                            <Text style={styles.textModalConfirmare}>Delete {<Text style={{color: "cyan"}}>{listaNotiteSelectate.length}</Text>} notes permanently from the trash?</Text>
                        ) : (
                            <Text style={styles.textModalConfirmare}>Throw {<Text style={{color: "cyan"}}>{listaNotiteSelectate.length}</Text>} notes into the trash ?</Text>
                        ) 
                        }
                    </View>
                    <View style={{width: "100%", height: "50%"}}>
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {left: "3%", backgroundColor: "#f70d1a"}]}
                            onPress={handleConfirmare}
                        >
                            <Text style={styles.textModalConfirmare}>YES</Text> 
                        </TouchableOpacity>
                    
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {right: "3%", backgroundColor: "#00c3e3"}]}
                            onPress={handleCloseModal}
                        >
                            <Text style={styles.textModalConfirmare}>NO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
    )

}
export default ModalConfirmareActiune