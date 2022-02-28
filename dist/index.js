console.log("001");
const firebaseConfig = {
  apiKey: "AIzaSyBFtqYG8OVlI4E8VdBEMW9mLCBhfeUHHeI",
  authDomain: "stimeforone.firebaseapp.com",
  projectId: "stimeforone",
  storageBucket: "stimeforone.appspot.com",
  messagingSenderId: "302327929792",
  appId: "1:302327929792:web:7f6a874a88fc988fc28625",
  measurementId: "G-WF2R2WM1Y6",
};
console.log("002");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


var chatid = "-1001476218810";
var tokenTel = "5097081300:AAGaq_J8zZiImhfZIR1U9XjnJjvH_vKYiTI";
var text = "Всем привет! <b>Я ваш бот</b> информатор!";

// otpravka(tokenTel,text,chatid);

function otpravka(tokenTel,text,chatid){
  var z=$.ajax({  
  type: "POST",  
  url: "https://api.telegram.org/bot"+tokenTel+"/sendMessage?chat_id="+chatid,
  data: "parse_mode=HTML&text="+encodeURIComponent(text), 
  }); 
 };





console.log("003");
class Timer {
  constructor() {
    this.myTimer;
    this.timeToString;
    this.delay = 1000;
  }
  start() {
    this.myTimer = setInterval(function () {
      let countMs = new Date() - new Date(localStorage.getItem("timeStart"));
      let date0 = new Date(0);
      date0.setSeconds(countMs / 1000);
      this.timeToString = date0.toISOString().substr(11, 8);
      document.getElementById(
        "timer"
      ).textContent = `Работа ${this.timeToString}`;
    }, this.delay);
  }
  stop() {
    clearInterval(this.myTimer);
  }
}

// console.log("004");
// let sname
// let ID
// let Title
// let Brak = ''
// let Commit = ''
// let Full =''

const myTimer = new Timer();
// console.log("005");
window.onload = function () {
  if (localStorage.timeStart) {
    console.log("в онлоад");
    let sbros = confirm(
      `Продолжить? (если 'отменить', то данные сбросятся...)`
    );

    sbros ? contin() : notContin();
  }
};

function notContin() {
  localStorage.removeItem("timeStart");
  localStorage.removeItem("contentID");
  localStorage.removeItem("contentTitle");
  localStorage.removeItem("tBrak");
  localStorage.removeItem("commit");
  localStorage.removeItem("swFull");
  localStorage.removeItem("timeStartReal");
  clearForm();
  console.log("notContin");

  document.getElementById("start").disabled = false;
  document.getElementById("postfactum").disabled = true;

  inputFormsDisabled(true);

  document.getElementById("stop").disabled = true;
  document.getElementById("statButton").disabled = false;

  if (localStorage.myName) {
    document.querySelector("#sname").value = MyNameToValue(localStorage.myName);
    document.getElementById("timeStart").textContent = localStorage.timeStart;

    document.getElementById("start").disabled = false;
    document.getElementById("postfactum").disabled = true;

    inputFormsDisabled(true);

    document.getElementById("stop").disabled = true;
    document.getElementById("statButton").disabled = false;
  }
}

function contin() {
  // console.log("contin");
  myTimer.start();
  document.getElementById("timeStart").textContent = localStorage.timeStart;

  document.getElementById("start").disabled = true;
  document.getElementById("postfactum").disabled = false;

  inputFormsDisabled(false);

  document.getElementById("stop").disabled = false;
  document.getElementById("statButton").disabled = false;

  if (localStorage.myName) {
    document.getElementById("sname").value = MyNameToValue(localStorage.myName);
    document.getElementById("sname").disabled = true;

    document.getElementById("start").disabled = true;
    document.getElementById("postfactum").disabled = false;

    inputFormsDisabled(false);

    document.getElementById("stop").disabled = false;
    document.getElementById("statButton").disabled = false;
  }

}

inputInit();

// console.log("006");
function inputInit() {
  if (localStorage.contentID) {
    document.querySelector("#contentID").value = localStorage.contentID.trim();
  } else {
    localStorage.contentID = " ";
  }

  if (localStorage.contentTitle) {
    document.querySelector(
      "#contentTitle"
    ).value = localStorage.contentTitle.trim();
  } else {
    localStorage.contentTitle = " ";
  }

  if (localStorage.tBrak) {
    document.querySelector("#tBrak").value = localStorage.tBrak.trim();
  } else {
    localStorage.tBrak = " ";
  }

  if (localStorage.commit) {
    document.querySelector("#commit").value = localStorage.commit.trim();
  } else {
    localStorage.commit = " ";
  }

  if (localStorage.swFull) {
    document.querySelector("#swFull").checked = Boolean(
      Number(localStorage.swFull)
    );
    // console.log("swFull, local если определена", localStorage.swFull);
  } else {
    localStorage.swFull = 0;
    // console.log("swFull, local если не определена", localStorage.swFull);
  }
}

// console.log("007");
if (sessionStorage.data) {
  //myData = sessionStorage.data
  let userData = JSON.parse(sessionStorage.data);
  // console.log("userData", userData);
  // console.log("в выборе сохранять?");
  let savedata = confirm(
    `Есть несохраненные данные: ${userData.name}, ${userData.ID}, ${
      userData.Title
    } - начало ${new Date(userData.timeStart)}, окончание ${new Date(
      userData.timeStop
    )}. Сохранить?`
  );
  otpravka(tokenTel, `Проверь! Вероятно данные не сохранились ${userData.name} ${userData.ID} ${userData.Title} ${userData.timeStart} - ${userData.timeStop}`, chatid);


  savedata ? save() : notSave();
}
// console.log("008");

// console.log("009");
function save() {
  alert("сохраняю");
  // console.log("sessionStorage.data on save", sessionStorage.data);
  let userData = JSON.parse(sessionStorage.data);
  // console.log("userData on save", userData);
  const data = {
    name: userData.name,
    dataAdded: new Date(userData.dataAdded),
    timeStart: new Date(userData.timeStart),
    timeStop: new Date(userData.timeStop),
    timeStartReal: new Date(userData.timeStartReal),
    ID: userData.ID,
    Title: userData.Title,
    Brak: userData.Brak,
    Commit: userData.Commit,
    Full: userData.Full,
    addFrom: userData.addFrom,
    version: userData.version,
  };
  // console.log("data on save", data);
  // console.log("в сохранении даты");
  recordToBasa(data);
}

function notSave() {
  alert("не буду сохранять");
  sessionStorage.removeItem("data");
  localStorage.removeItem("timeStart");
  document.getElementById("stop").disabled = true;
  inputFormsDisabled(true);
  document.getElementById("postfactum").disabled = true;
  document.getElementById("start").disabled = false;
  document.getElementById("sname").disabled = false;
  localStorage.removeItem("contentID");
  localStorage.removeItem("contentTitle");
  localStorage.removeItem("tBrak");
  localStorage.removeItem("commit");
  localStorage.removeItem("swFull");
  localStorage.removeItem("timeStartReal");
}

//если з-р не выбран - все заблокировать
// console.log("кто");
// console.log(document.getElementById("sname").value);

if (document.getElementById("sname").value === "Кто сегодня звукорежиссер?") {
  console.log("Кто с з/р?");
  document.getElementById("start").disabled = true;
  document.getElementById("postfactum").disabled = true;

  inputFormsDisabled(true);

  document.getElementById("stop").disabled = true;
  document.getElementById("statButton").disabled = true;
}

if (
  !(document.getElementById("sname").value === "Кто сегодня звукорежиссер?")
) {
  console.log("выбрано имя поэтому следующие действия");
  document.getElementById("start").disabled = false;
  document.getElementById("postfactum").disabled = true;

  inputFormsDisabled(true);

  document.getElementById("stop").disabled = true;
  document.getElementById("statButton").disabled = true;
}

document.getElementById("sname").addEventListener("change", function () {
  console.log("з/р поменялся");
  document.getElementById("statButton").disabled = false;
  document.getElementById("start").disabled = false;
  document.getElementById("postfactum").disabled = true;
  localStorage.myName = readMyName();
  if (document.getElementById("sname").value === "Кто сегодня звукорежиссер?") {
    console.log("з/р поменялся на: кто с з/р?");
    document.getElementById("start").disabled = true;
    document.getElementById("postfactum").disabled = true;

    inputFormsDisabled(true);

    document.getElementById("stop").disabled = true;
    document.getElementById("statButton").disabled = true;
  }
});


document.querySelector("#news").addEventListener("click", function () {

  
  alert(`добавлены сокращения, бот телеграм, защита от пустых записей`);

})



document.querySelector("#start").addEventListener("click", function () {

  // if (localStorage.getItem("timeStart")) {
  //   alert("Есть незавершенная работа! Сначала завершите работу в другой вкладке.")
  //   return
  // }

  text = `<b>${document.getElementById("sname").value}</b>`

  otpravka(tokenTel, text, chatid);



  myTimer.start();




  clearForm();
  inputInit();

  localStorage.setItem("timeStart", new Date());
  localStorage.setItem("timeStartReal", new Date());
  document.getElementById("timeStart").textContent = localStorage.getItem(
    "timeStart"
  );

  inputFormsDisabled(false);

  document.getElementById("postfactum").disabled = false;
  document.getElementById("stop").disabled = false;
  document.getElementById("sname").disabled = true;
  document.getElementById("start").disabled = true;
});

document.getElementById("postfactum").addEventListener("click", function () {
  document.getElementById("timeStart").textContent = localStorage.getItem(
    "timeStart"
  );
  console.log("ЧИСЛО!!!", new Date().getDate());
  console.log("ДАТА", new Date());
  let newTimeStart = prompt(
    `введи время в формате YYYY,MM,DD,HH[0-23],MM`,
    `${new Date().getFullYear()},${
      new Date().getMonth() + 1
    },${new Date().getDate()},`
  );
  if (newTimeStart) {
    newTimeStart = newTimeStart.split(",");

    if (!newTimeStart[5]) {
      newTimeStart[5] = "00";
    }
    if (!newTimeStart[6]) {
      newTimeStart[6] = "00";
    }

    enterData = new Date(
      Number(newTimeStart[0]),
      Number(newTimeStart[1]) - 1,
      Number(newTimeStart[2]),
      Number(newTimeStart[3]),
      Number(newTimeStart[4]),
      Number(newTimeStart[5]),
      Number(newTimeStart[6])
    );

    console.log("НОВАЯ ДАТА", enterData);
    // tttt
    timeBylo = localStorage.getItem("timeStart")

    if (enterData == "Invalid Date") {
      const is = confirm(`Уверены: ${enterData}?`);

      is ? alert("ха, я просто не изменю и все") : console.log();
    } else {
      const is = confirm(`Уверены: ${enterData}?`);
      is
        ? localStorage.setItem("timeStart", enterData)
        : (document.getElementById(
            "timeStart"
          ).textContent = localStorage.getItem("timeStart"));

      document.getElementById("timeStart").textContent = localStorage.getItem(
        "timeStart"
      );
      text = `<b>${document.getElementById("sname").value}</b>\nпоменял время старта\nс ${timeBylo}\nна ${enterData}\n<b>${document.getElementById("contentID").value}\n${document.getElementById("contentTitle").value}</b>\nОМАКСИ`
      otpravka(tokenTel, text, chatid);

    }
  }
});

document.querySelector("#contentID").addEventListener("change", function () {
  console.log(document.querySelector("#contentID").value);
  const idTest = document.querySelector("#contentID").value.toUpperCase();
  document.querySelector("#contentID").value = idTest;
  localStorage.contentID = idTest;
  console.log("поиск по базе снаружи");
  console.log("idTest", idTest);
  if (!(idTest == "") & !(idTest == " ")) {
    console.log("поиск по базе внутри");
    db.collection(selectCollectionInBase())
      .where("ID", "==", idTest)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          my = doc.data();

          let tStart = new Date(0);
          tStart.setSeconds(my.timeStart.seconds);

          alert(
            `АХТУНГ!!! ID:${idTest} есть в базе, смотрел ${my.name}, ${tStart}, брак: ${my.Brak}, комментарии: ${my.Commit}`
          );
          text = `<b>${localStorage.myName}</b>\nсмотрит передачу\n<b>${localStorage.contentID}\n${localStorage.contentTitle}</b>\nранее смотрел\n<b>${my.name}\n${tStart}</b>`
          otpravka(tokenTel, text, chatid);


          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
});
document.querySelector("#contentTitle").addEventListener("change", function () {
  console.log(document.querySelector("#contentTitle").value);
  let titleTest = document.querySelector("#contentTitle").value.toUpperCase();
  idText = ''
  if (titleTest === 'ДЗ') {titleTest='ДВЕ ЗВЕЗДЫ'
  idText='07DZ0'}
  if (titleTest === 'ДР') {titleTest='DANCE РЕВОЛЮЦИЯ'
  idText='07DR0'}
  if (titleTest === 'ДУ') {titleTest='ДОБРОЕ УТРО'}
  if (titleTest === 'НСВ') {titleTest='НАЕДИНЕ СО ВСЕМИ'
  idText='14NV0'}
  if (titleTest === 'НД') {titleTest='НА ДАЧУ'
  idText='14DN0'}
  if (titleTest === 'Н') {titleTest='НОВОСТИ'}
  if (titleTest === 'О') {titleTest='ОЛИМПИАДА'}
  if (titleTest === 'Р') {titleTest='РЕКЛАМА'}
  if (titleTest === 'ПК') {titleTest='ПРАЗДНИЧНЫЙ КОНЦЕРТ'
  idText='07'}
  if (titleTest === 'ПС') {titleTest='ПРИЕМКА СИГНАЛА'}
  if (titleTest === 'ДП') {titleTest='ДАВАЙ ПОЖЕНИМСЯ'
  idText='19DP0'}
  if (titleTest === 'СК') {titleTest='СВОЯ КОЛЕЯ'
  idText='07SK0'}
  if (titleTest === 'АА') {titleTest='АБРАКАДАБРА'
  idText='14'}
  if (titleTest === 'УМ') {titleTest='УГАДАЙ МЕЛОДИЮ'
  idText='08UM0'}
  if (titleTest === 'МП') {titleTest='МОДНЫЙ ПРИГОВОР'
  idText='19MP1'}
  if (titleTest === 'ВП') {titleTest='ВРЕМЯ ПОКАЖЕТ'
  idText='14VP'}
  if (titleTest === '?') {titleTest='ЧТО? ГДЕ? КОГДА?'
  idText='08GK0'}
  if (titleTest === 'ЧГК') {titleTest='ЧТО? ГДЕ? КОГДА?'  
  idText='08GK0'}
  if (titleTest === 'МЖ') {titleTest='МУЖСКОЕ/ЖЕНСКОЕ'
  idText='14MJ'}
  if (titleTest === 'ДУ') {titleTest='ДОБРОЕ УТРО'}
  if (titleTest === 'ТИ') {titleTest='ТЕСТ ИНТЕЛЛИГЕЙН'}
  if (titleTest === 'ТП') {titleTest='ТЕСТ ПРЕСЕТА'}
  if (titleTest === 'ЖЖ') {titleTest='ЖЕНСКИЙ ЖУРНАЛ'
  idText='15JJ'}
  if (titleTest === 'ЖД') {titleTest='ЖИЗНЬ ДРУГИХ'
  idText='08JD0'}
  if (titleTest === 'ВУ') {titleTest='ВЕЧЕРНИЙ УРГАНТ'
  idText='08VU'}
  if (titleTest === 'З') {titleTest='ЗДОРОВЬЕ'
  idText='11ZD0'}
  if (titleTest === 'А') {titleTest='АНОНСЫ'}
  if (titleTest === 'С') {titleTest='СПЕЦПРОЕКТЫ'}
  if (titleTest === 'ГД') {titleTest='ГОЛОС.ДЕТИ'}
  if (titleTest === 'Г') {titleTest='ГОЛОС'
  idText='07GD0'}
  if (titleTest === 'Г6') {titleTest='ГОЛОС.60+'}
  if (titleTest === 'ПГ') {titleTest='ПУСТЬ ГОВОРЯТ'
  idText='19PG0'}
  if (titleTest === 'БИ') {titleTest='БОЛЬШАЯ ИГРА'
  idText='19BI0'}
  if (titleTest === 'ДТ') {titleTest='ДОК-ТОК'
  idText='19DT0'}
  if (titleTest === 'ДПИ') {titleTest='ДОКТОРА ПРОТИВ ИНТЕРНЕТА'
  idText='08DP00'}
  if (titleTest === 'НЗ') {titleTest='НЕПУТЕВЫЕ ЗАМЕТКИ'}
  if (titleTest === 'ИГ') {titleTest='ИГРАЙ ГАРМОНЬ, ЛЮБИМАЯ'}
  if (titleTest === 'Ч') {titleTest='ЧАСОВОЙ'
  idText='03CA0'}
  if (titleTest === 'ВВ') {titleTest='ВИДЕЛИ ВИДЕО'
  idText='19VV0'}
  if (titleTest === 'ТТ') {titleTest='ТОЧЬ-В-ТОЧЬ'
  idText='07TT0'}
  if (titleTest === 'СП') {titleTest='СЛОВО ПАСТЫРЯ'}
  if (titleTest === 'УУ') {titleTest='УМНИКИ И УМНИЦЫ'
  idText='08UU0'}
  if (titleTest === 'СВ') {titleTest='СЕГОДНЯ ВЕЧЕРОМ'
  idText='19SV0'}
  if (titleTest === 'ЛВ') {titleTest='ЛУЧШЕ ВСЕХ'
  idText='08LV0'}
  if (titleTest === '101') {titleTest='101 ВОПРОС ВЗРОСЛОМУ'}
  if (titleTest === 'П') {titleTest='ПОЗНЕР'}
  if (titleTest === 'ЖЗ') {titleTest='ЖИТЬ ЗДОРОВО'
  idText='11JZ0'}
  if (titleTest === 'ЛП') {titleTest='ЛЕДНИКОВЫЙ ПЕРИОД'}
  if (titleTest === 'ПЧ') {titleTest='ПОЛЕ ЧУДЕС'
  idText='08PC0'}
  if (titleTest === 'ЯПЗ') {titleTest='Я ПОЧТИ ЗНАМЕНИТ'}
  if (titleTest === 'ТА') {titleTest='ТРИ АККОРДА'
  idText='07TA0'}
  if (titleTest === 'ЧИЗ') {titleTest='ЧЕЛОВЕК И ЗАКОН'
  idText='03CZ'}
  if (titleTest === 'НС') {titleTest='НОВОСТИ СПОРТА'}
  if (titleTest === 'Н') {titleTest='НОВОСТИ'}
  if (titleTest === 'НСД') {titleTest='НА САМОМ ДЕЛЕ'
  idText='19SD0'}
  if (titleTest === 'РПЛ') {titleTest='РАЗБОР ОЦЕНКИ ПЕРЕДАЧ С В.Лазуткиным'
  idText='XXX'}
  if (titleTest === 'РПБ') {titleTest='РАЗБОР ОЦЕНКИ ПЕРЕДАЧ С А.Бордаченковым'
  idText='XXX'}
  if (titleTest === '1') {titleTest='ВЫЗОВ В АЗП-1'}
  if (titleTest === 'АКП') {titleTest='РАБОТА В АКП'}
  if (titleTest === 'КХСМ') {titleTest='КТО ХОЧЕТ СТАТЬ МИЛЛИОНЕРОМ?'
  idText='08KH0'}
  
  document.querySelector("#contentTitle").value = titleTest;
  localStorage.contentTitle = titleTest;
  
  document.querySelector("#contentID").value = idText;
  
  

});

document.querySelector("#tBrak").addEventListener("change", function () {
  localStorage.tBrak = document.querySelector("#tBrak").value;
});

document.querySelector("#commit").addEventListener("change", function () {
  localStorage.commit = document.querySelector("#commit").value;
});

document.querySelector("#swFull").addEventListener("change", function () {
  document.querySelector("#swFull").checked
    ? (localStorage.swFull = 1)
    : (localStorage.swFull = 0);

  //localStorage.swFull = document.querySelector('#swFull').checked
});

document.querySelector("#stop").addEventListener("dblclick", function () {
  myTimer.stop();
  ID = localStorage.contentID;
  if (ID === " ") {
    ID = "";
  }
  Title = localStorage.contentTitle;
  if (Title === " ") {
    Title = "";
  }
  if (ID === "" && Title === "") {
    var str = new String(`ВНИМАНИЕ! НЕТ НИ НАЗВАНИЯ НИ ID. ЗАПИСАТЬ В БАЗУ НЕ МОГУ!!!`);
    alert(str);
    return
  }
  



  console.log("dblclick");
  document.querySelector("#stop").disabled = true;
  document.querySelector("#postfactum").disabled = true;
  inputFormsDisabled(true);

  //sname = document.querySelector('#sname').value

  //myName = readMyName()
  ID = localStorage.contentID;
  if (ID === " ") {
    ID = "";
  }
  Title = localStorage.contentTitle;
  if (Title === " ") {
    Title = "";
  }
  Brak = localStorage.tBrak;
  if (Brak === " ") {
    Brak = "";
  }
  Commit = localStorage.commit;
  if (Commit === " ") {
    Commit = "";
  }
  Full = Boolean(Number(localStorage.swFull));

  let timeStartReal = new Date(localStorage.timeStartReal);
  let timeStop = new Date();
  document.getElementById("timeStop").textContent = timeStop;
  let timeStart = new Date(localStorage.timeStart);
  let dataAdded = new Date();
  const addFrom = "sTimeForOne";
  let version = document.getElementById("version").textContent;

  console.log("лог финальной записи в базу");
  console.log("timeStart: ", timeStart);
  console.log("timeStop: ", timeStop);
  console.log("Звукорежиссер: ", localStorage.myName);
  console.log("ID: ", ID);
  console.log("Название передачи: ", Title);
  console.log("Наличие брака: ", Brak);
  console.log("Комментарии: ", Commit);
  console.log("Полный отсмотр: ", Full);
  console.log("version: ", version);

  const data = {
    name: localStorage.myName,
    dataAdded,
    timeStart,
    timeStop,
    timeStartReal,
    ID,
    Title,
    Brak,
    Commit,
    Full,
    addFrom,
    version,
  };
  sessionStorage.data = JSON.stringify(data);
  let userData = JSON.parse(sessionStorage.data);
  console.log("data", data);
  console.log("sessionStorage.data", userData);
  localStorage.removeItem("timeStart");
  console.log("хронометраж", timeStop - timeStart);
  durMin1 = ((timeStop - timeStart)/1000)/60


  if (ID == '') {
    ttt =`<b>${localStorage.myName}</b>\nдобавил передачу\n<b>${Title}\nбез ID</b>`
    otpravka(tokenTel, ttt, chatid);

  }
  if (Title == '') {
    ttt =`<b>${localStorage.myName}</b>\nдобавил передачу\n<b>без названия</b>`
    otpravka(tokenTel, ttt, chatid);

  }
 
  if (durMin1 > 120 || durMin1 < 1)  {
    ttt =`<b>${localStorage.myName}</b>\nдобавил передачу\n${ID}\n<b>${Title}</b>\nхр.: ${Math.floor(durMin1)} минут`
    otpravka(tokenTel, ttt, chatid);
  }

  recordToBasa(data);

});

function recordToBasa(data) {
  db.collection(selectCollectionInBase())
    .add(data)
    .then((docRef) => {
      alert(`Все хорошо!!!\nDocument written with ID: \n${docRef.id}`);
      document.getElementById("stop").disabled = true;
      inputFormsDisabled(true);
      document.getElementById("postfactum").disabled = true;
      document.getElementById("start").disabled = false;
      document.getElementById("sname").disabled = false;
      
      if (localStorage.getItem("commit") != ' ') {
        otpravka(tokenTel,`<b>${localStorage.myName}</b>\nдобавил передачу\n<b>${localStorage.contentTitle}</b>\nс комментариями:\n<i>'${localStorage.getItem("commit")}'</i>`, chatid);
      } else {
        otpravka(tokenTel,`<b>${localStorage.myName}</b>\nдобавил передачу\n<b>${localStorage.contentID}\n${localStorage.contentTitle}</b>`, chatid);
      }
      
      sessionStorage.removeItem("data");
      localStorage.removeItem("timeStart");
      localStorage.removeItem("contentID");
      localStorage.removeItem("contentTitle");
      localStorage.removeItem("tBrak");
      localStorage.removeItem("commit");
      localStorage.removeItem("swFull");
      localStorage.removeItem("timeStartReal");
    })
    .catch((error) => {
      alert(`ничего не получилось...\n свяжитесь с разработчиком`);
      console.error("Error adding document: ", error);
    });
}

document.querySelector("#statButton").addEventListener("click", function () {
  document.getElementById("statButton").disabled = true;

  let dataNow = new Date();
  let smenaStart = new Date();
  durOl = 0;
  durSe = 0;
  durKo = 0;
  durSa = 0;
  durMa = 0;
  durIn = 0;
  durSn = 0;

  console.log("dataNow.getHour", dataNow.getHours());

  if (dataNow.getHours() >= 9 && dataNow.getHours() < 21) {
    //Дневная смена

    smenaStart.setHours(9);
    smenaStart.setMinutes(0);
  } else if (dataNow.getHours() >= 21) {
    //Ночная смена

    smenaStart.setHours(21);
    smenaStart.setMinutes(0);
  } else if (dataNow.getHours() < 9) {
    //<9
    //Ночная смена следующая дата( после 00:00)

    smenaStart.setDate(dataNow.getDate() - 1);
    smenaStart.setHours(21);
    smenaStart.setMinutes(0);
  }

  db.collection(selectCollectionInBase())
    .where("timeStart", ">", smenaStart)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //debugger

        console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        my = doc.data();
        tStart = my.timeStart;
        tStop = my.timeStop;
        duration = tStop.seconds - tStart.seconds;
        console.log("my", my.name);
        if (my.name === "Саша") {
          durSa += duration;
        } else if (my.name === "Костя") {
          durKo += duration;
        } else if (my.name === "Марк") {
          durMa += duration;
        } else if (my.name === "Сергей Измайлов") {
          durSe += duration;
        } else if (my.name === "Олег") {
          durOl += duration;
        } else if (my.name === "Инна") {
          durIn += duration;
        } else if (my.name === "Сергей Неретин") {
          durSn += duration;
        }
        // console.log("my", my.name);
        // console.log("tStart", tStart.seconds);

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
      ddate = new Date(0);
      ddate.setSeconds(durIn);
      let durInST = ddate.toISOString().substr(11, 8);
      ddate = new Date(0);
      ddate.setSeconds(durSn);
      let durSnST = ddate.toISOString().substr(11, 8);

      document.getElementById(
        "statistic"
      ).textContent = `ОБНОВЛЕНО: ${new Date()}`;
      document.getElementById(
        "sa"
      ).textContent = `Саша за смену отработал: ${durSaST}`;
      document.getElementById(
        "ma"
      ).textContent = `Марк за смену отработал: ${durMaST}`;
      document.getElementById(
        "ko"
      ).textContent = `Костя за смену отработал: ${durKoST}`;
      document.getElementById(
        "ol"
      ).textContent = `Олег за смену отработал: ${durOlST}`;
      document.getElementById(
        "se"
      ).textContent = `Сергей И. за смену отработал: ${durSeST}`;
      document.getElementById(
        "in"
      ).textContent = `Инна за смену отработала: ${durInST}`;
      document.getElementById(
        "sn"
      ).textContent = `Сергей Н. за смену отработал: ${durSnST}`;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  // console.log("statistic");
  document.getElementById("statButton").disabled = false;
});

document.querySelector("#statButton").addEventListener("dblclick", function () {
  alert("один раз ...");
});

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
  document.URL == "http://localhost:8000/"
    ? (collection = "test")
    : (collection = "users");

  // console.log(document.URL);
  // console.log("firebase", collection);
  return collection;
}

function inputFormsDisabled(bool) {
  console.log(`input blok ${bool}`);
  document.getElementById("contentID").disabled = bool;
  document.getElementById("contentTitle").disabled = bool;
  document.getElementById("swFull").disabled = bool;
  //document.getElementById('checkBrak').disabled = bool
  document.getElementById("tBrak").disabled = bool;
  document.getElementById("commit").disabled = bool;
}

function readMyName() {
  sname = document.getElementById("sname").value;

  if (sname == 1) {
    return "Олег";
  } else if (sname == 2) {
    return "Марк";
  } else if (sname == 3) {
    return "Саша";
  } else if (sname == 4) {
    return "Костя";
  } else if (sname == 5) {
    return "Сергей Измайлов";
  } else if (sname == 6) {
    return "Инна";
  } else if (sname == 7) {
    return "Сергей Неретин";
  } else {
    return "Кто сегодня звукорежиссер?";
  }
}

function MyNameToValue(myName) {
  if (myName === "Олег") {
    return 1;
  } else if (myName === "Марк") {
    return 2;
  } else if (myName === "Саша") {
    return 3;
  } else if (myName === "Костя") {
    return 4;
  } else if (myName === "Сергей Измайлов") {
    return 5;
  } else if (myName === "Инна") {
    return 6;
  } else if (myName === "Сергей Неретин") {
    return 7;
  } else if (myName === "Кто сегодня звукорежиссер?") {
    return 0;
  }
}

function clearForm() {
  document.getElementById("contentID").value = "";
  document.getElementById("contentTitle").value = "";
  document.getElementById("tBrak").value = "";
  document.getElementById("timeStop").textContent = "";
  document.getElementById("commit").textContent = "";
  document.getElementById("commit").value = "";
  document.getElementById("swFull").checked = false;
}
