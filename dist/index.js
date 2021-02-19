//$el = document.querySelector('#editor').textContent

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




let timeStart = 0
let timeStop = 0
let sname 
let myName
let ID
let Title 
let Brak = ''
let Commit = ''
let Full =''
let time = 0
let min = 0
let hour = 0
let st = true
let delay = 1000
let myTimer


let changeN = document.querySelector('#sname')
changeN.addEventListener('change', function() {
    document.getElementById('start').disabled = false


})


let clickStart = document.querySelector('#start')
clickStart.addEventListener('click', function() { 
    //st = true
    


    
    clearInterval(myTimer)
    time = 0
    min = 0
    hour = 0
    timer = document.getElementById('timer')
    myTimer = setInterval(function () {
     
        time = time + 1
        if (min >= 60) {
            time = 0
            min = 0
            hour = hour +1
            
        }
        if (time >= 60) {
            time = 0
            min = min + 1
        }
       
        // if (st) {
        //     ///clearTimeout(request, delay)
        // } else{
        //     clearInterval(delay)
        // }
        timer.textContent = `${hour}:${min}:${time}`
        //insertAdjacentHTML('beforeend', time) 
        
    }, delay);


    document.getElementById('contentID').value = ''
    document.getElementById('contentTitle').value = ''
    document.getElementById('tBrak').value = ''
    document.getElementById('timeStop').textContent = ''


    document.getElementById('commit').textContent = ''
    document.getElementById('commit').value = ''
    document.getElementById('swFull').checked = false

    document.getElementById('sname').disabled = true
    document.getElementById('contentID').disabled = false
    document.getElementById('contentTitle').disabled = false
    document.getElementById('tBrak').disabled = false
    document.getElementById('commit').disabled = false
    document.getElementById('stop').disabled = false
    document.getElementById('start').disabled = true
    document.getElementById('swFull').disabled = false

    //document.querySelector('#')
    console.log('start')
    timeStart = new Date()
    ///console.log('timeStart: ', timeStart);
    //let time = 0
    document.getElementById('timeStart').textContent = timeStart

})




let clickStop = document.querySelector('#stop')



clickStop.addEventListener('dblclick', function() { 
    clearInterval(myTimer)
    document.getElementById('timer').textContent = "Таймер"
    time=0
    min=0
    hour=0


    sname = document.querySelector('#sname').value
    ID = document.querySelector('#contentID').value
    Title = document.querySelector('#contentTitle').value
    Brak = document.querySelector('#tBrak').value
    Commit = document.querySelector('#commit').value
    
    
    if (document.querySelector('#swFull').checked) {
        Full = true

    } else {
        Full = false
    }

    document.getElementById('sname').disabled = false
    document.getElementById('contentID').disabled = true
    document.getElementById('contentTitle').disabled = true
    document.getElementById('tBrak').disabled = true
    document.getElementById('commit').disabled = true
    document.getElementById('stop').disabled = true
    document.getElementById('start').disabled = false
    document.getElementById('swFull').disabled = true
    
   

    if (sname === 1) {
        myName = 'Олег'
    } else if (sname === 2) {
        myName = 'Марк'
    } else if (sname === 3) {
        myName = 'Саша'
    } else if (sname === 4) {
        myName = 'Костя'
    } else if (sname === 5) {
        myName = 'Сергей'
    }


    timeStop = new Date()
    document.getElementById('timeStop').textContent = timeStop
    
    console.log('timeStart: ', timeStart)
    console.log('timeStop: ', timeStop);
    console.log('Звукорежиссер: ', myName)
    console.log('ID: ', ID)
    console.log('Название передачи: ', Title)
    console.log('Наличие брака: ', Brak)
    console.log('Комментарии: ', Commit)
    console.log('Полный отсмотр: ', Full)
   
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
    } else {
        myName =''
    }
    
    // let work = {
    //     name: myName,
    //     timeStart: timeStart,
    //     timeStop: timeStop,
    //     ID: ID,
    //     Title: Title,
    //     Brak: Brak,
    //     Commit: Commit,
    //     Full: Full
    //   };
      
    //   console.log('Json: ', work)


    //   let json = JSON.stringify(work)

     


      db.collection("users").add({
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


// clickStop.addEventListener('click', function() {
//     alert('Двойной клик!!!')
//    }
//    )

// var myModal = document.getElementById('myModal')

// myModal.addEventListener('show.bs.modal', function (event) {
//   if (!data) {
//     return event.preventDefault() // stops modal from being shown
//   }
// })







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