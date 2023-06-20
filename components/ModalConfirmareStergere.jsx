import { View, Modal, Text, TouchableOpacity } from "react-native"
import styles from "./Styles"

const ModalConfirmareStergere = ( {visibilityModalConfirmareStergere, setVisibilityModalConfirmareStergere, listaNotiteSelectate, setVisibilityModalSelectareMultipla, deleteNotita, populareNotite} ) => {


    const handleConfirmareStergere = () => {
        setVisibilityModalConfirmareStergere(false)
        setVisibilityModalSelectareMultipla(false)
        listaNotiteSelectate.map( 
            (notita) => {
                deleteNotita(notita)    
            }
        )
        listaNotiteSelectate.splice(0, listaNotiteSelectate.length)
        populareNotite()
    }

    const handleCloseModal = () => {
        setVisibilityModalConfirmareStergere(false)
    }


    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={visibilityModalConfirmareStergere}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.containerModalConfirmare}>
                <View style={styles.contentModalConfirmare}> 
                    <View style={{width: "100%", height: "50%", justifyContent: "center", alignItems: "center"}}>  
                        <Text style={styles.textModalConfirmare}>Throw {<Text style={{color: "cyan"}}>{listaNotiteSelectate.length}</Text>} notes into the trash ?</Text>
                    </View>
                    <View style={{width: "100%", height: "50%"}}>
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {left: "3%", backgroundColor: "#f70d1a"}]}
                            onPress={handleConfirmareStergere}
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
export default ModalConfirmareStergere