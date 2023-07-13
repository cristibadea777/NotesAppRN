import { Text } from "react-native"
import { Modal, View } from "react-native"

const ModalIncarcare = ( {visibilityModalIncarcare} ) => {
    return(
        <Modal visible={visibilityModalIncarcare}>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:"white"}}>
                <Text style={{fontSize: 72, color: "black", fontStyle: "italic", fontWeight: "bold"}}> 
                    Loading... 
                </Text>
            </View>
        </Modal>
    )
}
export default ModalIncarcare