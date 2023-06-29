import { View, Modal, TouchableOpacity, Text, Linking } from "react-native"
import styles from "../Styles"
import BaraModal from "../bare/BaraModal"


const ModalDonate = ( { visibilityModalDonate, setVisibilityModalDonate, culoarePictograme, styles } ) => {

    //inchidere modal, resetare setare curenta si culoare curenta, setare fundal/text cu culoarea curenta 
    const handleCloseModal = () => {
        setVisibilityModalDonate(false)
    }
    
    const handleDonate = () => {    
        Linking.openURL('https://www.cristianbadea.online').catch(err => console.error("Couldn't load page", err));
    }
 
    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={visibilityModalDonate}
            onRequestClose={handleCloseModal}
            
        >
            
            <BaraModal
                    styles                  = {styles}
                    handleCloseModal        = {handleCloseModal} 
                    culoarePictograme       = {culoarePictograme}
                    vizualizareNotite       = {false}
                    handleOpenModalSetari   = {""}
            />


            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <View style={styles.containerModalDonate}>

                    <View style={{height: "33%", justifyContent: "center", alignItems: "center"}}>
                        <Text style={[styles.textModalConfirmare, {fontSize: 33}]}>
                            Donate
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: "flex-start"}}>
                        <Text style={styles.textModalConfirmare}>
                            This application will be forever free to use, without any ads. If you wish to donate, feel free to do it. God bless you.
                        </Text>
                    </View>
                    <View style={{position: "absolute", top: 333, width: "100%", height: "100%", flexDirection: "row", justifyContent: "center", paddingLeft: 33, paddingRight: 33, paddingTop: 177}}>
                        <View>
                            <TouchableOpacity 
                                style={{backgroundColor: "white"}}
                                onPress={handleDonate}
                            > 
                                <Text style={styles.textModalConfirmare}>Donate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>

        </Modal>
    )

}
export default ModalDonate
