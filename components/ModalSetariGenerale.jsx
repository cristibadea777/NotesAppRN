///daca e pt prima oara (nu se gasesc tabele in db) - se seteaza o variabila cu true
///var = true => nu se poate inchide decat cand se salveaza - buton cancel, bara de sus a modalului - dezactivate - nu se randeaza
///in rest, modalu o sa fie cel obisnuit pt alegerea schemei de culori 

import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "./Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"


const ModalSetariGenerale = ( {visibilityModalSetariGenerale, setVisibilityModalSetariGenerale, setVisibilityModalAlegereCuloare,
                                setSetareCurenta, culoareFundalAplicatie, culoareTextAplicatie, culoareGeneralaFundalNotita, 
                                culoareGeneralaTextNotita, culoareButonNewNotita, culoareButonEditNotita, styles,
                                setCuloareFundalAplicatie,  setCuloareTextAplicatie, setCuloareGeneralaFundalNotita, 
                                setCuloareGeneralaTextNotita, setCuloareButonNewNotita, setCuloareButonEditNotita, updateSetari,
                                culoareBaraAplicatie, setCuloareBaraAplicatie, culoarePictograme, setCuloarePictograme
                            } ) => {

    const [tempCuloareFundalAplicatie,          setTempCuloareFundalAplicatie]          = useState('')
    const [tempCuloareTextAplicatie,            setTempCuloareTextAplicatie]            = useState('')
    const [tempCuloareGeneralaFundalNotita,     setTempCuloareGeneralaFundalNotita]     = useState('')
    const [tempCuloareGeneralaTextNotita,       setTempCuloareGeneralaTextNotita]       = useState('')
    const [tempCuloareButonNewNotita,           setTempCuloareButonNewNotita]           = useState('')
    const [tempCuloareButonEditNotita,          setTempCuloareButonEditNotita]          = useState('')
    const [tempCuloareBaraAplicatie,            setTempSetCuloareBaraAplicatie]         = useState('')
    const [tempCuloarePictograme,               setTempCuloarePictograme]               = useState('')
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
        }, [visibilityModalSetariGenerale]
    )

    const handleCloseModal = () => {
        setVisibilityModalSetariGenerale(false)
    }

    const handlePressOk = () => {
        //salvare in baza de date 
        //nu e ca si la modal setari notite, cand nu salvam nimic in bd pt ca tinea doar de notita curenta a carei culori se schimbau
        updateSetari(culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareBaraAplicatie, culoarePictograme)
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
        handleCloseModal()
    }

    //fundalAplicatie, textAplicatie, fundalNotitaDefault, textNotitaDefault, butonNewNotita, butonEditNotita
    const handlePressAlegereCuloareSetare = (setare) => {
        setSetareCurenta(setare)
        setVisibilityModalAlegereCuloare(true)
    }

    return (
        <Modal
            visible={visibilityModalSetariGenerale}
            animationType="slide"
        >
            <View style={styles.containerPrincipal}>

                <View style={{height: "20%", alignItems: "center", justifyContent: "center"}}>
                    <Text style={styles.textTitluModal}> Settings </Text>
                </View>
                
                <ScrollView style={{backgroundColor: "white", borderWidth: 0.3}}>
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













                </ScrollView>

                <View style={{height: "20%", flexDirection: "row", padding: 7}}>
                    <View style={{width: "50%", alignItems: "center"}}>
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {height: "50%", width: "50%", backgroundColor: "#00c3e3", marginBottom: "7%" }]}
                            onPress={handlePressOk}
                        > 
                            <Text style={styles.textButonModal}>OK</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: "50%", alignItems: "center"}}>
                        <TouchableOpacity 
                            style={[styles.butonConfirmare, {height: "50%", width: "50%", backgroundColor: "#EDEADE", marginBottom: "7%"}]}
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