
const firebaseConfig = {
    apiKey: "AIzaSyBFtqYG8OVlI4E8VdBEMW9mLCBhfeUHHeI",
    authDomain: "stimeforone.firebaseapp.com",
    projectId: "stimeforone",
    storageBucket: "stimeforone.appspot.com",
    messagingSenderId: "302327929792",
    appId: "1:302327929792:web:7f6a874a88fc988fc28625",
    measurementId: "G-WF2R2WM1Y6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  class Timer {
    constructor () {
        this.myTimer
        this.timeToString        
    } 
    start(){
        this.myTimer = setInterval(function () {
            let countMs = new Date() - new Date(sessionStorage.getItem('timeStart'))
            let date0 = new Date(0)
            date0.setSeconds(countMs/1000)
            this.timeToString = date0.toISOString().substr(11, 8)     
            document.getElementById('timer').textContent = `Работа ${this.timeToString}`      
        }
        , delay)
    }
    stop(){
        clearInterval(this.myTimer)
        //document.getElementById('timer').textContent = "Таймер"
    } 
}


let sname 
let myName
let ID
let Title 
let Brak = ''
let Commit = ''
let Full =''
let delay = 1000

let durOl = 0 
let durSe = 0 
let durKo = 0 
let durSa = 0 
let durMa = 0 




const myTimer = new Timer()



//если з-р не выбран - все заблокировать
sname = document.querySelector('#sname').value
if (sname === 'Кто сегодня звукорежиссер?') {
    document.getElementById('start').disabled = true
    document.getElementById('postfactum').disabled = true

    inputFormsDisabled (true)

    document.getElementById('stop').disabled = true
    document.getElementById('statButton').disabled = true
}

document.querySelector('#sname').addEventListener('change', function() {
    document.getElementById('statButton').disabled = false
    document.getElementById('start').disabled = false
    document.getElementById('postfactum').disabled = true
    myName = readMyName()
})


document.getElementById('postfactum').addEventListener('click', function() {
    document.getElementById('timeStart').textContent = sessionStorage.getItem('timeStart')  
    let newTimeStart = prompt('введи новое время в формате YYYY-MM-DDTHH:MM:SS')

    //alert(`Тебе ${age} лет!`); // Тебе 100 лет!

    console.log(new Date(newTimeStart))

    if (new Date(newTimeStart) == 'Invalid Date') {
        let isBoss = confirm(`Уверены: ${new Date(newTimeStart)}?`)

        isBoss ? 
            alert ('ха, я просто не изменю и все'):
            console.log()

    } else { 
        let isBoss = confirm(`Уверены: ${new Date(newTimeStart)}?`)

        ///Invalid Date!!!!

        isBoss ? 
        sessionStorage.setItem('timeStart', new Date(newTimeStart)):
        document.getElementById('timeStart').textContent = sessionStorage.getItem('timeStart')

        document.getElementById('timeStart').textContent = sessionStorage.getItem('timeStart') }
        

})




document.querySelector('#start').addEventListener('click', function() {
    myTimer.start()
    clearForm()

    sessionStorage.setItem('timeStart', new Date())
    document.getElementById('timeStart').textContent = sessionStorage.getItem('timeStart')

    inputFormsDisabled (false)

    document.getElementById('postfactum').disabled = false
    document.getElementById('stop').disabled = false
    document.getElementById('sname').disabled = true
    document.getElementById('start').disabled = true  
})

// let checkbox = document.querySelector('#checkDelete');

// checkbox.addEventListener('change', function() {
//   if (this.checked) {
//     console.log("Checkbox is checked..");
//     $el = $el.replace(new RegExp(`[${charsDelete}]`, "g"), "") 
//     document.querySelector('#result').textContent = $el
//   } else {
//     console.log("Checkbox is not checked..");
//   }
// });

// let ns = document.getElementById('ns')
// ns.addEventListener('change', function() { 
//         document.getElementById('tBrak').value += 'несинхрон, '
//         console.log('NS')
//     }
//     )


//     nr = document.getElementById('nr')
//     nr.addEventListener('change', function() { 
//         document.getElementById('tBrak').value += 'низкая разборчивость, '
//     }
//     )

//     document.getElementById('ni').addEventListener('change', function() { 
//         document.getElementById('tBrak').value += 'нелинейные искажения, '
//     }
//     )

//     it = document.getElementById('it').addEventListener('change', function() { 
//         document.getElementById('tBrak').value += 'искажения тембра, '
//     }
//     )

//     p = document.getElementById('p').addEventListener('change', function() { 
//         document.getElementById('tBrak').value += 'провалы, '
//     }
//     )

//     pp = document.getElementById('pp')
//     pp.addEventListener('change', function() { 
//         document.getElementById('tBrak').value += 'перепады, '
//     }
//     )
document.querySelector('#contentID').addEventListener('change', function() {

    console.log(document.querySelector('#contentID').value)
    const idTest = document.querySelector('#contentID').value.toUpperCase()
    document.querySelector('#contentID').value = idTest
    db.collection(selectCollectionInBase()).where("ID", "==", idTest)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                my = doc.data()

                let tStart = new Date(0)
                tStart.setSeconds(my.timeStart.seconds) 

                alert (`АХТУНГ!!! ID:${idTest} есть в базе, смотрел ${my.name}, ${tStart}, брак: ${my.Brak}, комментарии: ${my.Commit}`)
                console.log(doc.id, " => ", doc.data())
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})

document.querySelector('#stop').addEventListener('dblclick', function() { 
    myTimer.stop()

    sname = document.querySelector('#sname').value
    ID = document.querySelector('#contentID').value
    Title = document.querySelector('#contentTitle').value
    Brak = document.querySelector('#tBrak').value
    Commit = document.querySelector('#commit').value
    
    document.querySelector('#swFull').checked ?
        Full = true:
        Full = false
    

    inputFormsDisabled (true)

    document.getElementById('postfactum').disabled = true
    document.getElementById('start').disabled = false
    document.getElementById('sname').disabled = false
    document.getElementById('stop').disabled = true
    
    let timeStop = new Date()
    document.getElementById('timeStop').textContent = timeStop
    
    let timeStart = new Date(sessionStorage.getItem('timeStart'))

    console.log('timeStart: ', timeStart)
    console.log('timeStop: ', timeStop);
    console.log('Звукорежиссер: ', myName)
    console.log('ID: ', ID)
    console.log('Название передачи: ', Title)
    console.log('Наличие брака: ', Brak)
    console.log('Комментарии: ', Commit)
    console.log('Полный отсмотр: ', Full)
    

    
    db.collection(selectCollectionInBase()).add({
        name: myName,
        timeStart: timeStart,
        timeStop: timeStop,
        ID: ID,
        Title: Title,
        Brak: Brak,
        Commit: Commit,
        Full: Full
    })
    .then((docRef) => {
        alert(`Все хорошо!!!\nDocument written with ID: \n${docRef.id}`);
    })
    .catch((error) => {
        alert(`ничего не получилось...\n свяжитесь с разработчиком`)
        console.error("Error adding document: ", error);
    });

})

let clickStatistic = document.querySelector('#statButton')
clickStatistic.addEventListener('click', function() { 
    
  
  
    let dataNow = new Date();
    let smenaStart = new Date();
    durOl = 0 
    durSe = 0 
    durKo = 0 
    durSa = 0 
    durMa = 0 

console.log("dataNow.getHour", dataNow.getHours())
    if (dataNow.getHours()>= 9 && dataNow.getHours() < 21) {
        //Дневная смена
       
        smenaStart.setHours(9);
        smenaStart.setMinutes(0)   
    } else if (dataNow.getHours() >= 21) {
        //Ночная смена
       
        smenaStart.setHours(21);
        smenaStart.setMinutes(0)
    } else if (dataNow.getHours() < 9) { //<9
        //Ночная смена следующая дата( после 00:00) 
        
        
        smenaStart.setDate(dataNow.getDate()-1)
        smenaStart.setHours(21);
        smenaStart.setMinutes(0)
    }


db.collection(selectCollectionInBase()).where("timeStart", ">", smenaStart)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //debugger
            
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data())
            my=doc.data()
            tStart=my.timeStart
            tStop=my.timeStop
            duration = tStop.seconds - tStart.seconds
            console.log("my",my.name)
            if (my.name==="Саша") {
                durSa += duration
            } else if (my.name==="Костя") {
                durKo += duration
            } else if (my.name==="Марк") {
                durMa += duration
            } else if (my.name==="Сергей") {
                durSe += duration
            } else if (my.name==="Олег") {
                durOl += duration
            }
            console.log("my",my.name)
            console.log("tStart", tStart.seconds)
            


            //my.name
           
        });
    
let ddate = new Date(0);
        ddate.setSeconds(durSa);
        let durSaST = ddate.toISOString().substr(11, 8);
ddate = new Date(0);
        ddate.setSeconds(durMa); 
        let durMaST = ddate.toISOString().substr(11, 8);
ddate = new Date(0);
        ddate.setSeconds(durKo); 
        let durKoST = ddate.toISOString().substr(11, 8);
ddate = new Date(0);
        ddate.setSeconds(durOl);
        let durOlST = ddate.toISOString().substr(11, 8);
ddate = new Date(0);
        ddate.setSeconds(durSe);
        let durSeST = ddate.toISOString().substr(11, 8);
    
  
document.getElementById('statistic').textContent = `ОБНОВЛЕНО: ${new Date()}`
document.getElementById('sa').textContent = `Саша за смену отработал: ${durSaST}`
document.getElementById('ma').textContent = `Марк за смену отработал: ${durMaST}`
document.getElementById('ko').textContent = `Костя за смену отработал: ${durKoST}`
document.getElementById('ol').textContent = `Олег за смену отработал: ${durOlST}`
document.getElementById('se').textContent = `Серега за смену отработал: ${durSeST}`


 
    
    
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

console.log('statistic')


})



//!!! не удалять - можно проверять разные запросы на чтение базы
// db.collection("users").where("name", "==", 'Олег')
//     .get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             //debugger
//             //debugger
//             console.log(doc.id, " => ", doc.data());     
//         });
    
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });

function selectCollectionInBase() {
    document.URL == 'http://localhost:5000/' ?
    collection = 'test':
    collection = 'users'

    console.log(document.URL)
    console.log('firebase', collection)
    return collection
}

function inputFormsDisabled (bool) {
    document.getElementById('contentID').disabled = bool
    document.getElementById('contentTitle').disabled = bool
    document.getElementById('swFull').disabled = bool   
    document.getElementById('checkBrak').disabled = bool
    document.getElementById('tBrak').disabled = bool
    document.getElementById('commit').disabled = bool
}

function readMyName() {
    sname = document.getElementById('sname').value

    if (sname == 1) {
        myName = 'Олег'
    } else if (sname == 2) {
        myName = 'Марк'
    } else if (sname == 3) {
        myName = 'Саша'
    } else if (sname == 4) {
        myName = 'Костя'
    } else if (sname == 5) {
        myName = 'Сергей'
    }
    return myName
}

function clearForm() {
    document.getElementById('contentID').value = ''
    document.getElementById('contentTitle').value = ''
    document.getElementById('tBrak').value = ''
    document.getElementById('timeStop').textContent = ''
    document.getElementById('commit').textContent = ''
    document.getElementById('commit').value = ''
    document.getElementById('swFull').checked = false   
}
