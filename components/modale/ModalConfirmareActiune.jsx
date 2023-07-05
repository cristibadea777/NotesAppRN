import { View, Modal, Text, TouchableOpacity } from "react-native"
import styles from "../Styles"

const ModalConfirmareActiune = ( {  visibilityModalConfirmareActiune, setVisibilityModalConfirmareActiune, listaNotiteSelectate, 
                                    setVisibilityModalSelectareMultipla, deleteNotita, populareNotite, vizualizareGunoi, toBeDeletedAll,
                                    setToBeDeletedAll, deleteNotitaPermanent, restaurareNotitaStearsa, toBeRestored, setToBeRestored,
                                    deleteAllNotiteGunoi, toBeArchived, setToBeArchived, arhivareNotita, styles, notitaCurenta, setImagine,
                                    setVisibilityModalVizualizareNotita,  showMessage, flagDeleteImagine, setFlagDeleteImagine, toBeDeleted, setToBeDeleted }
                                ) => {


    //handle pt o singura notita
    const handleConfirmareSingulara = () => {
        if(flagDeleteImagine){
            setImagine(null)
            //daca notita curenta exista inseamna ca suntem in interorul modalului vizualizeaza notita
            //deci stergem poza si din folder 
            //dar NU facem asta aici, ci daca se da save in modalul vizualizeaza notita. aici doar o setam cu null pt a disparea din modal. 
            //in modal vizualizare notita cand se apasa save - daca imaginea e null se steaza ca null in bd pt notita - si daca e null, se va sterge si din folder
            console.log("Fisier imagine de sters: " + notitaCurenta.imagine)
            setFlagDeleteImagine(false)
            setVisibilityModalConfirmareActiune(false)
        }
        else{
            setVisibilityModalConfirmareActiune(false)
            setVisibilityModalSelectareMultipla(false)
            setVisibilityModalVizualizareNotita(false)
            if(toBeDeletedAll){
                deleteAllNotiteGunoi()
                setToBeDeletedAll(false)
            }
            else if(toBeArchived){
                arhivareNotita(notitaCurenta)
                setToBeArchived(false)
            }
            else if(toBeRestored){
                restaurareNotitaStearsa(notitaCurenta)
                setToBeRestored(false)
            }
            else if(toBeDeleted){
                vizualizareGunoi ? deleteNotitaPermanent(notitaCurenta) : deleteNotita(notitaCurenta)    
                setToBeDeleted(false)
            }
            populareNotite()
        }        
       
    }
    
    const handleConfirmare = () => {
        setVisibilityModalConfirmareActiune(false)
        setVisibilityModalSelectareMultipla(false)
        if(toBeDeletedAll){
            deleteAllNotiteGunoi()
            setToBeDeletedAll(false)
        }
        else{
            listaNotiteSelectate.map( 
                (notita) => {
                    if(toBeArchived){
                        arhivareNotita(notita)
                        setToBeArchived(false)
                    }
                    else if(toBeRestored){
                        restaurareNotitaStearsa(notita)
                        setToBeRestored(false)
                    }
                    else{
                        if(notita.favorita === "true")
                            showMessage("Can't delete favorite notes")
                        else
                            vizualizareGunoi ? deleteNotitaPermanent(notita) : deleteNotita(notita)   
                        setToBeDeleted(false) 
                    }
                }
            )
        }

        listaNotiteSelectate.splice(0, listaNotiteSelectate.length)
        populareNotite()
    }

    //resetare valori si inchidere modal
    const handleCloseModal = () => {
        setToBeDeletedAll(false)
        setToBeRestored(false)
        setToBeArchived(false)
        setToBeDeleted(false)
        setVisibilityModalConfirmareActiune(false)
    }


    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={visibilityModalConfirmareActiune}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.containerModal}>
                <View style={styles.contentModalConfirmare}> 
                    <View style={{width: "100%", height: "50%", justifyContent: "center", alignItems: "center"}}>  
                        {
                        toBeArchived ? (
                            //aici am pus > 1 pt ca nu o sa sterg notita in mod direct cand e deschis modalu vizualizare. si in loc de '1 notes' o sa fie 'the note' simplu pt ca e doar una. 
                            //la fel si pt stergere, nu se sterge in mod direct, ci doar la selectare multipla, si normal ca o sa fie mai mult de 0 mereu
                            <Text style={styles.textModalConfirmare}>Archive {<Text style={{color: "cyan"}}>{listaNotiteSelectate.length > 1 ? listaNotiteSelectate.length : ''}</Text>} {listaNotiteSelectate.length > 1 ? 'notes?' : 'the note?'} </Text>
                        ) :
                        toBeDeletedAll ? (
                            <Text style={styles.textModalConfirmare}>Delete permanently {<Text style={{color: "cyan"}}>all</Text>} notes from the trash ?</Text>
                        ) :
                        toBeRestored ? (
                            <Text style={styles.textModalConfirmare}>Restore {<Text style={{color: "cyan"}}>{listaNotiteSelectate.length !== 0 ? listaNotiteSelectate.length : ''}</Text>} {listaNotiteSelectate.length !== 0 ? 'notes?' : 'the note?'} </Text>
                        ) : 
                        vizualizareGunoi ? (
                            <Text style={styles.textModalConfirmare}>Delete {<Text style={{color: "cyan"}}>{listaNotiteSelectate.length !== 0 ? listaNotiteSelectate.length : ''}</Text>} {listaNotiteSelectate.length !== 0 ? 'notes from the trash?' : 'the note from the trash?'} </Text>
                        ) : 
                        toBeDeleted ? (
                            <Text style={styles.textModalConfirmare}>Throw {<Text style={{color: "cyan"}}>{listaNotiteSelectate.length > 1 ? listaNotiteSelectate.length : ''}</Text>} {listaNotiteSelectate.length > 1 ? 'notes into the trash?' : 'the note into the trash?'} </Text>
                        ) :
                        flagDeleteImagine ? (
                            <Text style={styles.textModalConfirmare}>Delete the photo ?</Text>
                        ) :
                        (
                            <>
                            </>
                        )

                        }
                    </View>
                    <View style={{width: "100%", height: "50%"}}>
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {left: "3%", backgroundColor:"#00c3e3"}]}
                            onPress={listaNotiteSelectate.length !== 0 ? handleConfirmare : handleConfirmareSingulara}
                        >
                            <Text style={styles.textModalConfirmare}>YES</Text> 
                        </TouchableOpacity>
                    
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {right: "3%", backgroundColor:"#EDEADE"}]}
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