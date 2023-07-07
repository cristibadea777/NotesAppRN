///daca e pt prima oara (nu se gasesc tabele in db) - se seteaza o variabila cu true
///var = true => nu se poate inchide decat cand se salveaza - buton cancel, bara de sus a modalului - dezactivate - nu se randeaza
///in rest, modalu o sa fie cel obisnuit pt alegerea schemei de culori 

import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "../Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import BaraModal from "../bare/BaraModal"


const ModalSetariGenerale = ( {visibilityModalSetariGenerale, setVisibilityModalSetariGenerale, setVisibilityModalAlegereCuloare,
                                setSetareCurenta, culoareFundalAplicatie, culoareTextAplicatie, culoareGeneralaFundalNotita, 
                                culoareGeneralaTextNotita, culoareButonNewNotita, culoareButonEditNotita, styles,
                                setCuloareFundalAplicatie,  setCuloareTextAplicatie, setCuloareGeneralaFundalNotita, 
                                setCuloareGeneralaTextNotita, setCuloareButonNewNotita, setCuloareButonEditNotita, updateSetari,
                                culoareBaraAplicatie, setCuloareBaraAplicatie, culoarePictograme, setCuloarePictograme,
                                culoareNotitaSelectata, culoareButonArchive, culoareButonDelete, culoareButonRestore,
                                setCuloareNotitaSelectata, setCuloareButonArchive, setCuloareButonDelete, setCuloareButonRestore,
                            } ) => {

    const [tempCuloareFundalAplicatie,          setTempCuloareFundalAplicatie]          = useState('')
    const [tempCuloareTextAplicatie,            setTempCuloareTextAplicatie]            = useState('')
    const [tempCuloareGeneralaFundalNotita,     setTempCuloareGeneralaFundalNotita]     = useState('')
    const [tempCuloareGeneralaTextNotita,       setTempCuloareGeneralaTextNotita]       = useState('')
    const [tempCuloareButonNewNotita,           setTempCuloareButonNewNotita]           = useState('')
    const [tempCuloareButonEditNotita,          setTempCuloareButonEditNotita]          = useState('')
    const [tempCuloareBaraAplicatie,            setTempSetCuloareBaraAplicatie]         = useState('')
    const [tempCuloarePictograme,               setTempCuloarePictograme]               = useState('')
    const [tempCuloareNotitaSelectata,          setTempCuloareNotitaSelectata]          = useState('')
    const [tempCuloareButonArchive,             setTempCuloareButonArchive]             = useState('')
    const [tempCuloareButonDelete,              setTempCuloareButonDelete]              = useState('')
    const [tempCuloareButonRestore,             setTempCuloareButonRestore]             = useState('')
    //mereu cand se va deschide modalul, se vor seta variabilele temp, in caz ca utilizatul da cancel, sa se reseteze setarile
    useEffect(
        () => {
            setTempCuloareFundalAplicatie(culoareFundalAplicatie)
            setTempCuloareTextAplicatie(culoareTextAplicatie)
            setTempCuloareGeneralaFundalNotita(culoareGeneralaFundalNotita)
            setTempCuloareGeneralaTextNotita(culoareGeneralaTextNotita)
            setTempCuloareButonNewNotita(culoareButonNewNotita)
            setTempCuloareButonEditNotita(culoareButonEditNotita)
            setTempSetCuloareBaraAplicatie(culoareBaraAplicatie)
            setTempCuloarePictograme(culoarePictograme)
            setTempCuloareNotitaSelectata(culoareNotitaSelectata)
            setTempCuloareButonArchive(culoareButonArchive)
            setTempCuloareButonDelete(culoareButonDelete)
            setTempCuloareButonRestore(culoareButonRestore)
        }, [visibilityModalSetariGenerale]
    )

    const handlePressDefault = () => {
        //le setez ca sa se re-randeze. apoi salvez in BD valorile pe care le stiu deja, cele default
        setCuloareGeneralaFundalNotita("#1e1e1e") 
        setCuloareGeneralaTextNotita("white")
        setCuloareFundalAplicatie("#232B2B")
        setCuloareTextAplicatie("cyan")
        setCuloareButonNewNotita("#1e1e1e")
        setCuloareButonEditNotita("#232B2B")
        setCuloareBaraAplicatie("black")
        setCuloarePictograme("#00FFFF")
        setCuloareButonArchive("yellow")
        setCuloareButonDelete("red")
        setCuloareButonRestore("white")
        setCuloareNotitaSelectata("cyan")
        updateSetari("#1e1e1e", "white",  "#232B2B", "cyan", "#1e1e1e",  "#232B2B", "black", "cyan", "white", "red", "yellow", "cyan")
    }

    const handleCloseModal = () => {
        setVisibilityModalSetariGenerale(false)
    }

    const handlePressOk = () => {
        //salvare in baza de date 
        //nu e ca si la modal setari notite, cand nu salvam nimic in bd pt ca tinea doar de notita curenta a carei culori se schimbau
        updateSetari(culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata)
        handleCloseModal()
    }

    const handlePressCancel = () => {
        //setarile se reseteaza inapoi, cu cele temp
        //se salveaza in bd doar daca dam ok, deci nu le resetam si in bd, doar in contextu aplicatiei
        setCuloareFundalAplicatie(tempCuloareFundalAplicatie)
        setCuloareTextAplicatie(tempCuloareTextAplicatie)
        setCuloareGeneralaFundalNotita(tempCuloareGeneralaFundalNotita) 
        setCuloareGeneralaTextNotita(tempCuloareGeneralaTextNotita)
        setCuloareButonNewNotita(tempCuloareButonNewNotita)
        setCuloareButonEditNotita(tempCuloareButonEditNotita)
        setCuloareBaraAplicatie(tempCuloareBaraAplicatie)
        setCuloarePictograme(tempCuloarePictograme)
        setCuloareNotitaSelectata(tempCuloareNotitaSelectata)
        setCuloareButonArchive(tempCuloareButonArchive)
        setCuloareButonDelete(tempCuloareButonDelete)
        setCuloareButonRestore(tempCuloareButonRestore)
        handleCloseModal()
    }

    const handlePressAlegereCuloareSetare = (setare) => {
        setSetareCurenta(setare)
        setVisibilityModalAlegereCuloare(true)
    }

    return (
        <Modal
            visible={visibilityModalSetariGenerale}
            animationType="slide"
            onRequestClose={handlePressCancel}
        >
            <View style={styles.containerPrincipal}>

                <BaraModal
                        styles                  = {styles}
                        handleCloseModal        = {handlePressCancel} 
                        culoarePictograme       = {culoarePictograme}
                        vizualizareNotite       = {false}
                        handleOpenModalSetari   = {""}
                />

                <View style={{height: "20%", alignItems: "center", justifyContent: "center"}}>
                    <Text style={styles.textTitluModal}> Settings </Text>
                </View>
                
                <ScrollView style={{borderWidth: 0.3}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{width: "60%", margin: 7, padding: 7}}>
                            <Text style={styles.textModal}> App Background Color </Text>
                        </View>
                        <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    handlePressAlegereCuloareSetare("fundalAplicatie")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareFundalAplicatie}/>
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
                                    handlePressAlegereCuloareSetare("textAplicatie")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareTextAplicatie}/>
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
                                    handlePressAlegereCuloareSetare("fundalNotitaDefault")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareGeneralaFundalNotita}/>
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
                                    handlePressAlegereCuloareSetare("textNotitaDefault")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareGeneralaTextNotita}/>
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
                                    handlePressAlegereCuloareSetare("butonNewNotita")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareButonNewNotita}/>
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
                                    handlePressAlegereCuloareSetare("butonEditNotita")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareButonEditNotita}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{width: "60%", margin: 7, padding: 7}}>
                            <Text style={styles.textModal}> App Bar Color  </Text>
                        </View>
                        <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    handlePressAlegereCuloareSetare("baraAplicatie")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareBaraAplicatie}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{width: "60%", margin: 7, padding: 7}}>
                            <Text style={styles.textModal}> Pictograms Color  </Text>
                        </View>
                        <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    handlePressAlegereCuloareSetare("pictograme")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoarePictograme}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>






                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{width: "60%", margin: 7, padding: 7}}>
                            <Text style={styles.textModal}> Selected Notes Color  </Text>
                        </View>
                        <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    handlePressAlegereCuloareSetare("selectieNotita")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareNotitaSelectata}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{width: "60%", margin: 7, padding: 7}}>
                            <Text style={styles.textModal}> Archive Button Color  </Text>
                        </View>
                        <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    handlePressAlegereCuloareSetare("butonArhiva")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareButonArchive}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{width: "60%", margin: 7, padding: 7}}>
                            <Text style={styles.textModal}> Delete Button Color  </Text>
                        </View>
                        <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    handlePressAlegereCuloareSetare("butonDelete")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareButonDelete}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={{width: "60%", margin: 7, padding: 7}}>
                            <Text style={styles.textModal}> Restore Button Color  </Text>
                        </View>
                        <View style={{width: "40%", margin: 7, padding: 7, alignItems: "center"}}>
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={() => {
                                    handlePressAlegereCuloareSetare("butonRestore")
                                }}
                            >
                                <View style={{borderColor: "black", borderWidth: 3, borderRadius: 100, margin: 3}}>
                                    <FontAwesomeIcon icon={faCircle} size={37} color={culoareButonRestore}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>



                    
                </ScrollView>

                <View style={{height: "20%", flexDirection: "row", padding: 7}}>
                    <View style={{width: "33%", alignItems: "center"}}>
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {height: "50%", width: "70%", backgroundColor: "#00c3e3", marginBottom: "7%" }]}
                            onPress={handlePressOk}
                        > 
                            <Text style={styles.textButonModal}>SAVE</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: "33%", alignItems: "center"}}>
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {height: "50%", width: "70%", backgroundColor: "#EDEADE", marginBottom: "7%"}]}
                            onPress={handlePressDefault}
                        > 
                            <Text style={styles.textButonModal}>DEFAULT</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: "33%", alignItems: "center"}}>
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {height: "50%", width: "70%", backgroundColor: "#11574a", marginBottom: "7%"}]}
                            onPress={handlePressCancel}
                        > 
                            <Text style={styles.textButonModal}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                

            </View>

        </Modal>
    )
}
export default ModalSetariGenerale