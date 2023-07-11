import { Modal, Text, TextInput, View } from "react-native"
import BaraModal from "../bare/BaraModal"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faFileExport, faFileImport } from "@fortawesome/free-solid-svg-icons"
import { TouchableOpacity } from "react-native"
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing"

const ModalBackup = ( {visibilityModalBackup, setVisibilityModalBackup, culoarePictograme, styles} ) => {

    const handleCloseModal = () => {
        setVisibilityModalBackup(false)
    }

    const handlePressExportData = async () => {
        await Sharing.shareAsync(FileSystem.documentDirectory + '/SQLite/notite.db')
        //
    }

    const handlePressImportData = () => {

    }

    
    return (
        <Modal
            visible={visibilityModalBackup}
            onRequestClose={handleCloseModal}
        >
            <BaraModal
                styles                  = {styles}
                handleCloseModal        = {handleCloseModal} 
                culoarePictograme       = {culoarePictograme}
                vizualizareNotite       = {false}
                handleOpenModalSetari   = {""}
            />
            <View style={[styles.containerModal, {backgroundColor: "#1e1e1e"}]}>
                <View style={{width: "100%", height: "25%", alignItems: "center",  justifyContent: "space-around", flexDirection: "row"}}>
                    <Text style={[styles.textModalBackup, {borderBottomWidth: 1, borderBottomColor: "white"}]}>Backup your data</Text>
                </View>
                <View style={{width: "100%", height: "25%", alignItems: "center",  justifyContent: "space-around", flexDirection: "row"}}>
                    <Text style={styles.textModalBackup}>Export notes</Text>
                    <TouchableOpacity onPress={handlePressExportData}>
                        <FontAwesomeIcon icon={faFileExport} size={57} color="white"/>
                    </TouchableOpacity>
                </View> 
                <View style={{width: "100%", height: "25%", alignItems: "center",  justifyContent: "space-around", flexDirection: "row"}}>
                    <Text style={styles.textModalBackup}>Import notes</Text>
                    <TouchableOpacity onPress={handlePressImportData}>
                        <FontAwesomeIcon icon={faFileImport} size={57} color="white"/>
                    </TouchableOpacity>
                </View> 
            </View>


        </Modal>
    )
}
export default ModalBackup