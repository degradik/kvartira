function $(e) { return document.querySelector(e); }

var next = $('.next');
var prev = $('.prev');
var index = 0;

let Questions = [
  {
    text: "Выберите район",
    answers: [
      "Все районы", "Ворошиловский", "Железнодорожный", "Кировский", "Ленинский", "Октябрьский", "Первомайский", "Пролетарский", "Советский"
    ],
    type: "checkbox",
    userAnswers: []
  },
  {
    text: "Выберите количество комнат",
    answers: [
      "Студия", "1-комнатная", "2-комнатная", "3-комнатная", "Любое"
    ],
    type: "checkbox",
    userAnswers: []
  },
  /*
  {
    text: "Выберите примерную планировку",
    answers: [
      "чё это значит?", "я гей"
    ],
    type: "checkbox",
    userAnswers: []
  },
  */
  {
    text: "Выберите этап сдачи",
    answers: [
      "Котлаван", "Этот год", "Следующий год", "Дом сдан"
    ],
    type: "checkbox",
    userAnswers: []
  },
  {
    text: "Примерный бюджет",
    answers: [
      "До 5 млн. руб", "До 10 млн. руб", "Более 10 млн. руб"
    ],
    type: "radio",
    userAnswers: []
  },
  {
    text: "Способ оплаты",
    answers: [
      "Наличный расчет", "Ипотека", "Жилищный сертификат", "В рассрочку", "Другое"
    ],
    type: "radio",
    userAnswers: []
  },
  {
    text: "Выберите вариант связи",
    answers: [
      "WhatsApp", "Telegram", "Звонок"
    ],
    type: "radio",
    userAnswers: []
  },
];
let phoneNumber;
/*
var wage = document.getElementById("modal");
wage.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        alert("hui");
    }
});*/

let contentReloading = false;
let cashedUserAnswers = [];

function ReloadContent() {
  contentReloading = true;
  toggleView();
  setTimeout(function () {

    let text = "";
    text += `<h3>${Questions[index].text}</h3>\n`;

    for (let i = 0; i < Questions[index].answers.length; i++) {
      let checked = "";
      if (i == 0) checked = "checked";

      text += `<label class="mcui-checkbox form-label vertical-shake">
      <input name="name" required type="${Questions[index].type}" id="button${Number(i)}" ${false}>
      <div>
        <svg class="mcui-check" viewBox="-2 -2 35 35" aria-hidden="true">
          <title>checkmark-circle</title>
          <polyline points="7.57 15.87 12.62 21.07 23.43 9.93" />
        </svg>
      </div>
      <div><p class="form-text"><span class="" id="shakableText">${Questions[index].answers[i]}</span></p></div>
      </label>`
    }

    // Если последний вопрос, добавлять поле для номер и при переключении записывать его значение и добавлять в письмо
    if (index + 1 == Questions.length) {
        //text += `<input name="guruweba_example_range" type="range" min="70000000000" max="89999999999" />`;
        text += `
            <label class="mcui-checkbox form-label">
                <input class="tel-input" type="tel" id="phone" placeholder="Введите номер телефона" />
            </label>
        `;
        //$(".phone").mask("+7(999)999-9999");
    }

    $('.tt').innerHTML = `<div id=\"content\">${text}</div>`; 

    for (let i = 0; i < cashedUserAnswers.length; i++) {
        document.getElementById(`button${Number(cashedUserAnswers[i])}`).checked = true;
    }

    cashedUserAnswers = [];

    contentReloading = false;
  }, 400)
}

function ShakeTexts() {
    let lines = document.querySelectorAll('#shakableText');
    //Обходим каждый найденный элемент 
    for  (let line of lines) {
        line.className = "vertical-shake";
    }

    setTimeout(function() {
        let lines = document.querySelectorAll('#shakableText');
        //Обходим каждый найденный элемент 
        for  (let line of lines) {
            line.className = "";
        }
    }, 350);
}

function ClickNext() {
    //alert(contentReloading);
    if (contentReloading) return;
    //alert(index + "    " + Questions.length);
    if (index < Questions.length) {
      // Сбор ответов
      for (let i = 0; i < Questions[index].answers.length; i++) {
          if (document.getElementById(`button${Number(i)}`).checked) {
              Questions[index].userAnswers.push(i);
          }
      }
      if (Questions[index].userAnswers.length <= 0) {   
          ShakeTexts();

          return;
      }

      if (index >= Questions.length - 1) {
          // Действия после последнего вопроса
          phoneNumber = document.getElementById(`phone`).value;

          if (phoneNumber == "") {
              //alert('Введите номер телефона');
              ShakeTexts();
              return;
          } else {
              alert('Действия после последнего вопроса');
          }

          let value = "";

          for(let i = 0; i < Questions.length; i++) {
              let answersText = "";
              for(let j = 0; j < Questions[i].userAnswers.length; j++) {
                  answersText += Questions[i].answers[Questions[i].userAnswers[j]];
                  if (j < Questions[i].userAnswers.length - 1) {
                      answersText += ", ";
                  }
              }
              value += Questions[i].text + ":  " + answersText + "\n";
          }
          value += `Номер телефона: ${phoneNumber}`;
          // Добавить номер телефона
          alert(value);

          /*
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "https://formspree.io/f/xknlrdqg", true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({
              Answers: value
          }));
          */
          //alert(Questions);
      } else { 
          ReloadContent();
          index++;
      }
    }
}

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter"){
      //alert("Enter Key is Pressed")
      ClickNext();
  }
});

next.addEventListener('click', function () {
  ClickNext();
}, false);

prev.addEventListener('click', function () {
  if (contentReloading) return;

  ReloadContent();

  if (index > 0) {
      index--; 

      cashedUserAnswers = Questions[index].userAnswers;
      
      Questions[index].userAnswers = [];
      if (index < Questions.length - 1) {
        Questions[index + 1].userAnswers = [];
      }
  }
}, false)

function toggleView() {
  $('main').classList.add('fade-out');
  setTimeout(function () {
    $('main').classList.remove('fade-out');
  }, 400)
}


// Фрондэнд для телефонов
// Спец поле для номер телефона
// Как-то уведомлять пользователя о завершении опроса