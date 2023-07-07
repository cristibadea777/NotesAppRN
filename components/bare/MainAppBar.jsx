import { faBars, faRecycle, faSort } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Text, TouchableOpacity, View } from "react-native"

const MainAppBar = ( {  styles, vizualizareNotite, vizualizareArhiva, vizualizareGunoi, 
                        handleGolireCosGunoi, handleOnPressOpenModalMeniu, culoarePictograme, setVisibilityModalAlegereSortare} ) => {
    return(
        <View style={[styles.containerBara]}>

        <View style={styles.containerBaraStanga}>
          <TouchableOpacity 
              onPress={handleOnPressOpenModalMeniu}
              style={{paddingLeft: 7}}
          >
              <FontAwesomeIcon icon={faBars} size={33} color={culoarePictograme}/>
          </TouchableOpacity>
          {
                vizualizareNotite ? (
                  <Text style={styles.textBara}>All Notes</Text>
                )
                :
                vizualizareArhiva ? (
                  <Text style={styles.textBara}>Archive</Text>
                )
                :
                vizualizareGunoi ? (
                  <Text style={styles.textBara}>Trash</Text>
                )
                :
                (
                  <>
                  </>
                )
              }
        </View>

        <View style={styles.containerBaraDreapta}>
          {
            vizualizareGunoi ? (
              <TouchableOpacity 
                onPress={handleGolireCosGunoi}
                style={{paddingRight: 7}}
              >
                <FontAwesomeIcon icon={faRecycle} size={25} color={culoarePictograme}/>
              </TouchableOpacity>
            ) :
            vizualizareNotite ? (
              <TouchableOpacity
                onPress={ () => { setVisibilityModalAlegereSortare(true) } }
                style={{paddingRight: 7}}
              >
                <FontAwesomeIcon icon={faSort} size={25} color={culoarePictograme}/>
              </TouchableOpacity>
            ): (
              <>
              </>
            )
          }
        </View>
      </View>
    )
}
export default MainAppBar