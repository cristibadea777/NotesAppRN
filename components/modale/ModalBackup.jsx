import { Modal, Text, TextInput, View } from "react-native"
import BaraModal from "../bare/BaraModal"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faFileExport, faFileImport } from "@fortawesome/free-solid-svg-icons"
import { TouchableOpacity } from "react-native"
import * as FileSystem from 'expo-file-system'
import * as Sharing from "expo-sharing"
import * as DocumentPicker from "expo-document-picker"
import { deschidereBd, inchidereBd } from "../BazaDeDate"
import { useEffect } from "react"
import FlashMessage from "react-native-flash-message"

const ModalBackup = ( {visibilityModalBackup, setVisibilityModalBackup, culoarePictograme, populareNotite, styles} ) => {

    const handleCloseModal = () => {
        setVisibilityModalBackup(false)
    }

    const handlePressExportData = async () => {
        //de facut pe viitor 
        //sa se exporte si bd si folderul imagini intr-un fisier zip

        /*
        const folderBackup = `${FileSystem.documentDirectory}notes_backup/`
        await FileSystem.makeDirectoryAsync(folderBackup, { intermediates: true })
        console.log("Folder backup creat")

        const folderImaginiBackup = `${FileSystem.documentDirectory}notes_backup/imagini/`
        await FileSystem.makeDirectoryAsync(folderImaginiBackup, { intermediates: true })
        console.log("Folder imagini backup creat")

        const folderSQLBackup = `${FileSystem.documentDirectory}notes_backup/SQLite/`
        await FileSystem.makeDirectoryAsync(folderSQLBackup, { intermediates: true })
        console.log("Folder SQL backup creat")

        console.log("/notes_backup")
        const notesBackupContents = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+ '/notes_backup')
        notesBackupContents.map(
            (item) => {
              console.log("   /" + item)
            }
        )

        const folderImagini  = `${FileSystem.documentDirectory}imagini`
        const imagini        = await FileSystem.readDirectoryAsync(folderImagini)

        for (const imagine of imagini) {
            try {
              await FileSystem.copyAsync({
                from:   `${folderImagini}/${imagine}`,
                to:     `${folderImaginiBackup}/${imagine}`,
              }).catch(
                error => {
                    console.log(error)
                }
              );
              console.log("Imagine salvata in folderul imagini backup: \n" + folderImaginiBackup + "/" + imagine);
            } catch (error) {
              console.log("Eroare la salvarea imaginii in backup: " + JSON.stringify(error));
            }
        }

        console.log("Imagini salvate in folder backup")
        console.log("/notes_backup/imagini")
        const imaginiBackupContents = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+ '/notes_backup/imagini')
        imaginiBackupContents.map((item) => {console.log("   /" + item)})

        const bazaDeDate  = `${FileSystem.documentDirectory}SQLite/notite.db`
        await FileSystem.copyAsync(
            {
                from:  bazaDeDate,
                to:    `${folderSQLBackup}/notite.db`,
            }
        )
        console.log("Baza de date salvata in folderul backup")
        console.log("/notes_backup/SQLite")
        const folderSQLBackupContents = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+"/notes_backup/SQLite")
        folderSQLBackupContents.map(item => {console.log("   /" + item)})
        */
       
        //export baza de date
        await Sharing.shareAsync(`${FileSystem.documentDirectory}SQLite/notite.db`) 
    }

    const handlePressImportData = async () => {
        //import baza de date
        try {
            result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false  });
            console.log(result);
            if (result.type !== 'cancel') {
              await FileSystem.copyAsync({
                from: result.uri, 
                to:   `${FileSystem.documentDirectory}SQLite/notite.db`,
              })
              await inchidereBd()
              await deschidereBd()
              console.log("Baza de date importata")
              populareNotite()
              handleCloseModal()
            }
          } catch (e) {
            console.log(e);
        }
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
            <View style={{backgroundColor: "#1e1e1e", padding: 7}}>
                <Text style={[styles.textModal, {textAlign: "justify"}]}>For now, the images won't be backed-up togheter with the notes database, backup the images separatelly untill further updates.</Text>
            </View>
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