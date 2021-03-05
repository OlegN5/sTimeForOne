console.log('001')
const firebaseConfig = {
    apiKey: "AIzaSyBFtqYG8OVlI4E8VdBEMW9mLCBhfeUHHeI",
    authDomain: "stimeforone.firebaseapp.com",
    projectId: "stimeforone",
    storageBucket: "stimeforone.appspot.com",
    messagingSenderId: "302327929792",
    appId: "1:302327929792:web:7f6a874a88fc988fc28625",
    measurementId: "G-WF2R2WM1Y6"
  }
  console.log('002')
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  var db = firebase.firestore()

  console.log('003')
  class Timer {
    constructor () {
        this.myTimer
        this.timeToString
        this.delay = 1000        
    } 
    start() {
        this.myTimer = setInterval(function () {
            let countMs = new Date() - new Date(localStorage.getItem('timeStart'))
            let date0 = new Date(0)
            date0.setSeconds(countMs/1000)
            this.timeToString = date0.toISOString().substr(11, 8)     
            document.getElementById('timer').textContent = `Работа ${this.timeToString}`      
        }
        , this.delay)
    }
    stop(){
        clearInterval(this.myTimer)
    } 
}

console.log('004')
// let sname 
// let ID
// let Title 
// let Brak = ''
// let Commit = ''
// let Full =''

const myTimer = new Timer()
console.log('005')
window.onload = function() {

    if (localStorage.timeStart) {
        console.log('в онлоад')
        let sbros = confirm (`Продолжить? (если 'отменить', то данные сбросятся...)`)
        
        sbros ?
            contin():
            notContin();
    }

    
}
 function notContin () {
    localStorage.removeItem('timeStart')
    localStorage.removeItem('contentID')
    localStorage.removeItem('contentTitle')
    localStorage.removeItem('tBrak')
    localStorage.removeItem('commit')
    localStorage.removeItem('swFull')
    clearForm()
    console.log('notContin')

    document.getElementById('start').disabled = false
    document.getElementById('postfactum').disabled = true

    inputFormsDisabled (true)

    document.getElementById('stop').disabled = true
    document.getElementById('statButton').disabled = false


    if  (localStorage.myName) { 
        document.querySelector('#sname').value = MyNameToValue(localStorage.myName)
        document.getElementById('timeStart').textContent = localStorage.timeStart
    
        document.getElementById('start').disabled = false
        document.getElementById('postfactum').disabled = true

        inputFormsDisabled (true)

        document.getElementById('stop').disabled = true
        document.getElementById('statButton').disabled = false
    }
 }

 function contin () {
    console.log('contin')
    myTimer.start()
    document.getElementById('timeStart').textContent = localStorage.timeStart
    
    document.getElementById('start').disabled = true
    document.getElementById('postfactum').disabled = false

    inputFormsDisabled (false)

    document.getElementById('stop').disabled = false
    document.getElementById('statButton').disabled = false

        if  (localStorage.myName) { 
            document.getElementById('sname').value = MyNameToValue(localStorage.myName)
            document.getElementById('sname').disabled = true
        
            document.getElementById('start').disabled = true
            document.getElementById('postfactum').disabled = false

            inputFormsDisabled (false)

            document.getElementById('stop').disabled = false
            document.getElementById('statButton').disabled = false
        }
 }




inputInit ()

console.log('006')
function inputInit () {
if (localStorage.contentID) {
    document.querySelector('#contentID').value = localStorage.contentID.trim()
} else {
    localStorage.contentID = ' '
}

if (localStorage.contentTitle) {
    document.querySelector('#contentTitle').value = localStorage.contentTitle.trim()
} else {
    localStorage.contentTitle = ' '
}

if (localStorage.tBrak) {
    document.querySelector('#tBrak').value = localStorage.tBrak.trim()
} else {
    localStorage.tBrak = ' '
}

if (localStorage.commit) {
    document.querySelector('#commit').value = localStorage.commit.trim()
} else {
    localStorage.commit = ' '
}

if (localStorage.swFull) {
    document.querySelector('#swFull').checked = Boolean(Number(localStorage.swFull))
    console.log('swFull, local если определена', localStorage.swFull)
} else {
    localStorage.swFull = 0
    console.log('swFull, local если не определена', localStorage.swFull)
}
}

console.log('007')
if  (sessionStorage.data) {
    //myData = sessionStorage.data
    let userData = JSON.parse(sessionStorage.data);
    console.log('userData', userData)
    console.log('в выборе сохранять?')
    let savedata = confirm(`Есть несохраненные данные: ${userData.name}, ${userData.ID}, ${userData.Title} - начало ${new Date(userData.timeStart)}, окончание ${new Date(userData.timeStop)}. Сохранить?`)
    savedata ? 
      save():
      notSave()
}
console.log('008')


console.log('009')
function save() {
  alert('сохраняю')
  console.log('sessionStorage.data on save', sessionStorage.data)
  let userData = JSON.parse(sessionStorage.data);
  console.log('userData on save', userData)
  const data = {
    name: userData.name,
    dataAdded: new Date (userData.dataAdded),
    timeStart: new Date (userData.timeStart),
    timeStop: new Date (userData.timeStop),
    ID: userData.ID,
    Title: userData.Title,
    Brak: userData.Brak,
    Commit: userData.Commit,
    Full: userData.Full,
    addFrom: userData.addFrom,
    version: userData.version
}
    console.log('data on save', data)
    console.log('в сохранении даты')
    recordToBasa (data)
}

function notSave() {
    alert('не буду сохранять')
    sessionStorage.removeItem('data')
    localStorage.removeItem('timeStart')
    document.getElementById('stop').disabled = true
    inputFormsDisabled (true)
    document.getElementById('postfactum').disabled = true
    document.getElementById('start').disabled = false
    document.getElementById('sname').disabled = false
    localStorage.removeItem('contentID')
    localStorage.removeItem('contentTitle')
    localStorage.removeItem('tBrak')
    localStorage.removeItem('commit')
    localStorage.removeItem('swFull')


}

//если з-р не выбран - все заблокировать
console.log('кто')
console.log(document.getElementById('sname').value)

if (document.getElementById('sname').value === 'Кто сегодня звукорежиссер?') {
    console.log("Кто с з/р?")
    document.getElementById('start').disabled = true
    document.getElementById('postfactum').disabled = true

    inputFormsDisabled (true)

    document.getElementById('stop').disabled = true
    document.getElementById('statButton').disabled = true
}

if (!(document.getElementById('sname').value === 'Кто сегодня звукорежиссер?')) {
    console.log("выбрано имя поэтому следующие действия")
    document.getElementById('start').disabled = false
    document.getElementById('postfactum').disabled = true

    inputFormsDisabled (true)

    document.getElementById('stop').disabled = true
    document.getElementById('statButton').disabled = true
}

document.getElementById('sname').addEventListener('change', function() {
    console.log("з/р поменялся")
    document.getElementById('statButton').disabled = false
    document.getElementById('start').disabled = false
    document.getElementById('postfactum').disabled = true
    localStorage.myName = readMyName()
    if (document.getElementById('sname').value === 'Кто сегодня звукорежиссер?') {
        console.log("з/р поменялся на: кто с з/р?")
        document.getElementById('start').disabled = true
        document.getElementById('postfactum').disabled = true
    
        inputFormsDisabled (true)
    
        document.getElementById('stop').disabled = true
        document.getElementById('statButton').disabled = true
    }
})

document.querySelector('#start').addEventListener('click', function() {
    myTimer.start()
    clearForm()
    inputInit ()

    localStorage.setItem('timeStart', new Date())
    document.getElementById('timeStart').textContent = localStorage.getItem('timeStart')

    inputFormsDisabled (false)

    document.getElementById('postfactum').disabled = false
    document.getElementById('stop').disabled = false
    document.getElementById('sname').disabled = true
    document.getElementById('start').disabled = true  
})

document.getElementById('postfactum').addEventListener('click', function() {
    document.getElementById('timeStart').textContent = localStorage.getItem('timeStart')  
    let newTimeStart = prompt('введи новое время в формате YYYY-MM-DDTHH:MM:SS')


    console.log(new Date(newTimeStart))

    if (new Date(newTimeStart) == 'Invalid Date') {
        const is = confirm(`Уверены: ${new Date(newTimeStart)}?`)

        is ? 
            alert ('ха, я просто не изменю и все'):
            console.log()

    } else { 
        const is = confirm(`Уверены: ${new Date(newTimeStart)}?`)
        is ? 
        localStorage.setItem('timeStart', new Date(newTimeStart)):
        document.getElementById('timeStart').textContent = localStorage.getItem('timeStart')


        document.getElementById('timeStart').textContent = localStorage.getItem('timeStart') }

})






document.querySelector('#contentID').addEventListener('change', function() {

    console.log(document.querySelector('#contentID').value)
    const idTest = document.querySelector('#contentID').value.toUpperCase()
    document.querySelector('#contentID').value = idTest
    localStorage.contentID = idTest
    console.log("поиск по базе снаружи")
    console.log("idTest", idTest)
    if (!(idTest === '') & !(idTest === ' ')) {
        console.log("поиск по базе внутри")
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
    }
    

})
document.querySelector('#contentTitle').addEventListener('change', function() {

    console.log(document.querySelector('#contentTitle').value)
    const titleTest = document.querySelector('#contentTitle').value.toUpperCase()
    document.querySelector('#contentTitle').value = titleTest
    localStorage.contentTitle = titleTest
    
})

document.querySelector('#tBrak').addEventListener('change', function() {
    localStorage.tBrak = document.querySelector('#tBrak').value
})

document.querySelector('#commit').addEventListener('change', function() {
    localStorage.commit = document.querySelector('#commit').value
})
    
document.querySelector('#swFull').addEventListener('change', function() {
    document.querySelector('#swFull').checked ?
    localStorage.swFull = 1:
    localStorage.swFull = 0

    //localStorage.swFull = document.querySelector('#swFull').checked


})

document.querySelector('#stop').addEventListener('dblclick', function() { 
    myTimer.stop()
    console.log('dblclick')
    document.querySelector('#stop').disabled = true
    document.querySelector('#postfactum').disabled = true
    inputFormsDisabled (true)


    //sname = document.querySelector('#sname').value

    //myName = readMyName()
    ID = localStorage.contentID
    if (ID === ' ') {ID = ''}
    Title = localStorage.contentTitle
    if (Title === ' ') {Title = ''}
    Brak = localStorage.tBrak
    if (Brak === ' ') {Brak = ''}
    Commit = localStorage.commit
    if (Commit === ' ') {Commit = ''}
    Full = Boolean(Number(localStorage.swFull))
    
    
    let timeStop = new Date()
    document.getElementById('timeStop').textContent = timeStop
    let timeStart = new Date(localStorage.timeStart)
    let dataAdded = new Date()
    const addFrom = 'sTimeForOne'
    let version = document.getElementById('version').textContent
    
    
    console.log('лог финальной записи в базу')
    console.log('timeStart: ', timeStart)
    console.log('timeStop: ', timeStop);
    console.log('Звукорежиссер: ', localStorage.myName)
    console.log('ID: ', ID)
    console.log('Название передачи: ', Title)
    console.log('Наличие брака: ', Brak)
    console.log('Комментарии: ', Commit)
    console.log('Полный отсмотр: ', Full)
    console.log('version: ', version)


    const data = {
        name: localStorage.myName,
        dataAdded,
        timeStart: timeStart,
        timeStop: timeStop,
        ID: ID,
        Title: Title,
        Brak: Brak,
        Commit: Commit,
        Full: Full,
        addFrom,
        version
    }
    sessionStorage.data = JSON.stringify(data)
    let userData = JSON.parse(sessionStorage.data);
    console.log('data', data)
    console.log('sessionStorage.data', userData)
    localStorage.removeItem('timeStart')
    recordToBasa(data)
})

function recordToBasa (data) {
db.collection(selectCollectionInBase()).add(data)
    .then((docRef) => {
        alert(`Все хорошо!!!\nDocument written with ID: \n${docRef.id}`);
        document.getElementById('stop').disabled = true
        inputFormsDisabled (true)
        document.getElementById('postfactum').disabled = true
        document.getElementById('start').disabled = false
        document.getElementById('sname').disabled = false
        sessionStorage.removeItem('data')
        localStorage.removeItem('timeStart')
        localStorage.removeItem('contentID')
        localStorage.removeItem('contentTitle')
        localStorage.removeItem('tBrak')
        localStorage.removeItem('commit')
        localStorage.removeItem('swFull')
    })
    .catch((error) => {
        

        alert(`ничего не получилось...\n свяжитесь с разработчиком`)
        console.error("Error adding document: ", error);
    });
}

document.querySelector('#statButton').addEventListener('click', function() { 
            document.getElementById('statButton').disabled = true
            
        
        
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
        document.getElementById('statButton').disabled = false

})

document.querySelector('#statButton').addEventListener('dblclick', function() {
    alert('один раз ...')
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
    console.log(`input blok ${bool}`)
    document.getElementById('contentID').disabled = bool
    document.getElementById('contentTitle').disabled = bool
    document.getElementById('swFull').disabled = bool   
    //document.getElementById('checkBrak').disabled = bool
    document.getElementById('tBrak').disabled = bool
    document.getElementById('commit').disabled = bool
}

function readMyName() {
    sname = document.getElementById('sname').value

    if (sname == 1) {
        return 'Олег'
    } else if (sname == 2) {
        return 'Марк'
    } else if (sname == 3) {
        return 'Саша'
    } else if (sname == 4) {
        return 'Костя'
    } else if (sname == 5) {
        return 'Сергей'
    } else {
        return 'Кто сегодня звукорежиссер?'
    }
}

function MyNameToValue(myName) {
    if (myName === 'Олег') {
        return 1
    } else if (myName === 'Марк') {
        return 2
    } else if (myName === 'Саша') {
        return 3
    } else if (myName === 'Костя') {
        return 4
    } else if (myName === 'Сергей') {
        return 5
    } else if (myName === 'Кто сегодня звукорежиссер?') {
        return 0
    }

     
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
