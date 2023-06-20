import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system'

const db = SQLite.openDatabase('notite.db')

//Baza de Date
//deschide baza de date / sau o creaza daca nu exista 

const creareTabele = () => {
    // Creare tabel Notita
    db.transaction(
        tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Notita (id INTEGER PRIMARY KEY AUTOINCREMENT, titlu TEXT, continut TEXT)',
                [], 
                () => console.log('Table created successfully'),
                error => console.log('Error creating table: ', error)
            ) 
        } 
    )
}

const getNotite = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Notita',
          [],
          (_, resultSet) => {
            resolve(resultSet.rows._array); // Resolve with the array of results
          },
          (_, error) => {
            console.log('Eroare: ', error);
            resolve([]); //in caz de eroare se returneaza in promisiune un array gol
          }
        );
      });
    });
  };
  

const adaugaNotita = (titlu, continut) => {
    db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Notita (titlu, continut) VALUES (?, ?)',
                [titlu, continut],
                (txObj, resultSet) => {
                    console.log('Notita inserată, id: ' + resultSet.insertId)
                },
                error => console.log('Eroare:\n', error)
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
    console.log("Baza de date nu s-a sters, eroare:\n" + error)
}
}

export{
    creareTabele,
    getNotite, 
    adaugaNotita,
    dropDatabaseAsync,
}