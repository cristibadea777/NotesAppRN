import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system'

const db = SQLite.openDatabase('notite.db')

//Baza de Date
//deschide baza de date / sau o creaza daca nu exista 

const creareTabelNotita = () => {
  // Creare tabel Notita
  db.transaction(
    tx => {
      tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ' +
              'Notita (id INTEGER PRIMARY KEY AUTOINCREMENT, titlu TEXT, continut TEXT, stare TEXT, culoareFundal TEXT, culoareText TEXT, dataCreare TEXT, dataModificare TEXT, favorita TEXT);',
          [], 
          () => console.log('Table Notita created successfully'),
          error => console.log('Error creating table:\n' + JSON.stringify(error))
      ) 
    } 
  )
}


















//aici modificat. sa se ia primele favorite. sa accepte ca arg const setate in app de directie ASC/DESC si campul sortarii 
const getNotite = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Notita WHERE stare = ?',
          ["activa"],
          (_, resultSet) => {
            resolve(resultSet.rows._array); //returneaza  resolve cu result-setul
          },
          (_, error) => {
            console.log('Eroare:\n' + JSON.stringify(error));
            resolve([]); //in caz de eroare se returneaza in promisiune un array gol
          }
        )
      })
    })
  }








  const getNotiteGunoi = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Notita WHERE stare = ?',
          ["aruncata"],
          (_, resultSet) => {
            resolve(resultSet.rows._array); 
          },
          (_, error) => {
            console.log('Eroare:\n' + JSON.stringify(error));
            resolve([]);
          }
        );
      });
    });
  }
  

const getDate = () => {
  let date = new Date()
  console.log(date)
  let data = ( (date.getDate() < 10 ? '0' : '') + date.getDate() ) + '-' + ( (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1) ) + '-' + date.getFullYear() + '   ' + ( (date.getHours() < 10 ? '0' : '') + date.getHours() )+ ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  return data
}

const adaugaNotita = (titlu, continut, culoareText, culoareFundal) => {
    let dataAzi = getDate()
    db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Notita (titlu, continut, stare, culoareText, culoareFundal, dataCreare, dataModificare, favorita) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [titlu, continut, "activa", culoareText, culoareFundal, dataAzi, dataAzi, "false"],
                (txObj, resultSet) => {
                    console.log('Notita inserată, id: ' + resultSet.insertId)
                },
                error => console.log('Eroare:\n' + JSON.stringify(error))
            )
        }
    )
}


const deleteNotita = (notita) => {
  let dataAzi = getDate()
  db.transaction(tx => 
    {
      tx.executeSql(
        'UPDATE Notita SET (stare, dataModificare) = (?, ?) WHERE id = ?',
        ["aruncata", dataAzi, notita.id],
        (txObj, resultSet) => {
          console.log("Notita stearsa:\n" + notita.id) 
        },
        error => console.log('Eroare:\n' + JSON.stringify(error))
      )
    }  
  )
}


const deleteNotitaPermanent = (notita) => {
  db.transaction(tx => 
    {
      tx.executeSql(
        'DELETE FROM Notita WHERE id = ?',
        [notita.id],
        (txObj, resultSet) => {
          console.log("Notita stearsa permanent:\n" + notita.id) 
        },
        error => console.log('Eroare:\n' + JSON.stringify(error))
      )
    }  
  )
}

const restaurareNotitaStearsa = (notita) => {
  let dataAzi = getDate()
  db.transaction(tx => 
    {
      tx.executeSql(
        'UPDATE Notita SET (stare, dataModificare) = (?, ?) WHERE id = ?',
        ["activa", dataAzi, notita.id],
        (txObj, resultSet) => {
          console.log("Notita restaurata:\n" + notita.id) 
        },
        error => console.log('Eroare:\n' + JSON.stringify(error))
      )
    }  
  )
}

const deleteAllNotiteGunoi = () => {
  db.transaction(tx => 
    {
      tx.executeSql(
        'DELETE FROM Notita WHERE stare = "aruncata"',
        [],
        (txObj, resultSet) => {
          console.log("Cos de gunoi golit:\n") 
        },
        error => console.log('Eroare:\n' + JSON.stringify(error))
      )
    }  
  )
}

const arhivareNotita = (notita) => {
  let dataAzi = getDate()
  db.transaction(tx => 
    {
      tx.executeSql(
        'UPDATE Notita SET (stare, dataModificare) = (?, ?) WHERE id = ?',
        ["arhivata", dataAzi ,notita.id],
        (txObj, resultSet) => {
          console.log("Notita arhivata:\n" + notita.id) 
        },
        error => console.log('Eroare:\n' + JSON.stringify(error))
      )
    }  
  )
}

const getNotiteArhivate = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Notita WHERE stare = ?',
        ["arhivata"],
        (_, resultSet) => {
          resolve(resultSet.rows._array); //returneaza  resolve cu result-setul
        },
        (_, error) => {
          console.log('Eroare:\n' + JSON.stringify(error));
          resolve([]); //in caz de eroare se returneaza in promisiune un array gol
        }
      )
    })
  })
}

//setare notita ca fiind favorita/normala
const favorizeazaNotita = (notita) => {
  let stareFavorita = notita.favorita
  if(stareFavorita === "false")
    stareFavorita = true
  else
    stareFavorita = false
  db.transaction(tx => 
    {
      tx.executeSql(
        'UPDATE Notita SET (favorita) = ? WHERE id = ?',
        [stareFavorita, notita.id],
        (txObj, resultSet) => {
          console.log("Notita favorizata" + stareFavorita + ":\n" + notita.id) 
        },
        error => console.log('Eroare:\n' + JSON.stringify(error))
      )
    }  
  )
}

//functie de stergere a bazei de date 
//functia este asincrona (async) ca sa putem utiliza "await" pt functia de stergere a bazei de date din sistem
//functia de stergere este asincrona, deci folosim "await" pt a nu trece la alta functie pana ce nu termina de sters
//daca vreau sa o folosesc intr-un useEffect, trebuie sa o infasor si intr-un useCallback(..cod functie.., [])
const dropDatabaseAsync = async () => {
  //baza de date este in sistemul de fisiere, directorul sursa, /SQLite/
  const databaseFile = `${FileSystem.documentDirectory}SQLite/notite.db`
  try{
      await FileSystem.deleteAsync(databaseFile) //asteptam ca FileSystem sa termine de sters baza de date
      console.log("Baza de date stearsa")
  } 
  catch(error){
      console.log("Baza de date nu s-a sters, eroare:\n" + JSON.stringify(error))
  }
}

//salvare noul titlu, continut, culori, si setat date pt notita
//starea o setam in alte functii
const updateNotita = (notita, titlu, continut, culoareText, culoareFundal) => {
  let dataAzi = getDate()
  db.transaction(tx => 
    {
      tx.executeSql(
        'UPDATE Notita SET (titlu, continut, culoareText, culoareFundal, dataCreare, dataModificare) = (?, ?, ?, ?, ?, ?) WHERE id = ?',
        [titlu, continut, culoareText, culoareFundal, notita.dataCreare, dataAzi, notita.id],
        (txObj, resultSet) => {
          console.log("Notita editata.\n") 
        },
        error => console.log('Eroare:\n' + JSON.stringify(error))
      )
    }  
  )
}

const creareTabelSetare = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ' + 
            'Setare (id INTEGER PRIMARY KEY AUTOINCREMENT, culoareGeneralaTextNotita TEXT, culoareGeneralaFundalNotita TEXT, culoareFundalAplicatie TEXT, culoareTextAplicatie TEXT, culoareButonNewNotita TEXT, culoareButonEditNotita TEXT, culoareBaraAplicatie TEXT, culoarePictograme TEXT, culoareButonRestore TEXT, culoareButonDelete TEXT, culoareButonArchive TEXT, culoareNotitaSelectata TEXT);',
          [],
          () => resolve("Table Setare created successfully"),
          error => reject('Error creating table:\n' + JSON.stringify(error))
        )
      }
    )
  })
}

//verificare existenta setari -- returneaza lungimea inregistrarilor sub forma de promisiune (daca e 0, inseamna ca nu exista)
//daca nu exista (app se lanseaza pt prima oara) atunci se creaza setarile initiale hardcodate
const verificareExistentaSetari = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Setare',
        [],
        (_, resultSet) => {
          resolve(resultSet.rows.length); //returneaza  resolve cu lungimea result-setul
        },
        (_, error) => {
          console.log('Eroare:\n' + JSON.stringify(error));
          resolve([]); //in caz de eroare se returneaza in promisiune un array gol
        }
      )
    })
  })
}
          
//creare setari initiale
const creareSetariInitiale = (culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata ) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Setare (culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                ["#1e1e1e", "white",  "#232B2B", "cyan", "#1e1e1e",  "#232B2B", "#1e1e1e", "cyan", "white", "red", "yellow", "cyan"],
                (_, resultSet) => {
                    console.log('Setari create')
                    resolve(["#1e1e1e", "white",  "#232B2B", "cyan", "#1e1e1e",  "#232B2B", "#1e1e1e", "cyan", "white", "red", "yellow", "cyan"])
                },
                (_, error) => {
                  console.log('Eroare:\n' + JSON.stringify(error));
                  resolve([]); //in caz de eroare se returneaza in promisiune un array gol
                }
            )
        }
    )
  })
}

//preluare setari 
const preluareSetari = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Setare',
        [],
        (_, resultSet) => {
          resolve(resultSet.rows._array); //returneaza  resolve cu lungimea result-setul
        },
        (_, error) => {
          console.log('Eroare:\n' + JSON.stringify(error));
          resolve([]); //in caz de eroare se returneaza in promisiune un array gol
        }
      )
    })
  })
}

//update  setari
const updateSetari = (culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => 
      {
        tx.executeSql(
          'UPDATE Setare SET (culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata) = (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE id = 1',
          [culoareGeneralaFundalNotita, culoareGeneralaTextNotita, culoareFundalAplicatie, culoareTextAplicatie, culoareButonNewNotita, culoareButonEditNotita, culoareBaraAplicatie, culoarePictograme, culoareButonRestore, culoareButonDelete, culoareButonArchive, culoareNotitaSelectata],
          (txObj, resultSet) => {
            console.log("Setari schimbate.\n") 
          },
          error => console.log('Eroare:\n' + JSON.stringify(error))
        )
      }  
    )
  })
}



export{
    creareTabelNotita,
    creareTabelSetare,
    getNotite, 
    adaugaNotita,
    dropDatabaseAsync,
    deleteNotita,
    deleteNotitaPermanent,
    getNotiteGunoi,
    restaurareNotitaStearsa,
    deleteAllNotiteGunoi,
    arhivareNotita,
    getNotiteArhivate,
    updateNotita,
    verificareExistentaSetari,
    preluareSetari, 
    creareSetariInitiale,
    updateSetari
}