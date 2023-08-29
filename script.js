// Inspired by: https://dribbble.com/shots/3545421-017-Email-receipt

function $(e) { return document.querySelector(e); }

var next = $('.next');
var prev = $('.prev');
var index = 0;

let Questions = [
  {
    text: "Выберите район",
    answers: [
      "Все районы", "Ворошиловский", "Залупинский"
    ],
    type: "checkbox",
    userAnswers: []
  },
  {
    text: "Выберите количество комнат",
    answers: [
      "Студия", "1-комнатная", "2-комнатная", "3-комнатная", "дохуя-комнатная"
    ],
    type: "checkbox",
    userAnswers: []
  },
  {
    text: "Выберите примерную планировку",
    answers: [
      "чё это значит?", "я гей"
    ],
    type: "checkbox",
    userAnswers: []
  },
  {
    text: "Выберите этап сдачи",
    answers: [
      "Пустырь", "Котлаван", "Голый дом", "Норм дом"
    ],
    type: "checkbox",
    userAnswers: []
  },
  {
    text: "Примерный бюджет",
    answers: [
      "Пачка дошика", "10.000р", "от 50.000р до 100.000р", "от 100.000р до 200.000р",
      "от 200.000р до 500.000р", "от 500.000р до 100.000.000р", "у меня бесконечно денег нах"
    ],
    type: "radio",
    userAnswers: []
  },
  {
    text: "Выберите вариант связи",
    answers: [
      "Факс", "Голуби", "Почта России", "Яндекс.доставка"
    ],
    type: "radio",
    userAnswers: []
  },
]
/*
var randomText = [
  {
    title: "Yeah Mr. White! Yeah Science!",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum atque placeat, blanditiis soluta possimus voluptatem ea nostrum illo, in facere perspiciatis eveniet voluptatum ex quia vel eaque optio, veritatis odio!"
  },
  {
    title: "Yeah Mr. White! Yeah Science!",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, quos, vero earum cumque debitis nesciunt doloribus saepe, eaque, dolore ea aut. Soluta voluptatem magnam possimus suscipit culpa at impedit tempora, perferendis ducimus reprehenderit eos? Expedita ipsa, natus. Sapiente laboriosam vero, minus possimus esse odio fuga dolore minima eius, tenetur tempora!"
  },
  {
    title: "Yeah Mr. White! Yeah Science!",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fugit inventore."
  },
  {
    title: "Yeah Mr. White! Yeah Science!",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fugit inventore. <br>1. Lorem Ipsum <br>2. Lorem Ipsum <br>3. Lorem Ipsum <br>4. Lorem Ipsum"
  } 
];

$('.content__title').innerHTML = randomText[0].title;
$('.content__desc').innerHTML = randomText[0].desc;
*/

//ReloadContent();

function ReloadContent(modifier) {
  toggleView();
  setTimeout(function () {

    let text = "";
    text += `<h3>${Questions[index].text}</h3>\n`;

    for (let i = 0; i < Questions[index].answers.length; i++) {
      let checked = "";
      if (i == 0) checked = "checked";

      text += `<label class="mcui-checkbox form-label">
      <input name="name" required type="${Questions[index].type}" id="button${Number(i)}" ${checked}>
      <div>
        <svg class="mcui-check" viewBox="-2 -2 35 35" aria-hidden="true">
          <title>checkmark-circle</title>
          <polyline points="7.57 15.87 12.62 21.07 23.43 9.93" />
        </svg>
      </div>
      <div><p class="form-text">${Questions[index].answers[i]}</p></div>
      </label>`
    }

    $('.tt').innerHTML = `<form id=\"form-content\">${text}</form>`;
    //$('.content__title').innerHTML = randomText[index].title;
    //$('.content__desc').innerHTML = randomText[index].desc;      
  }, 400)
  //$('main').classList.remove('view' + index + '--active');
  //$('main').classList.add('view' + (index + modifier) + '--active');
}












// function ReloadContent(modifier) {
//   toggleView();
//   setTimeout(function () {

//     let text = "";
//     text += `<h3>${Questions[index].text}</h3>\n`;

//     for (let i = 0; i < Questions[index].answers.length; i++) {
//       let checked = "";
//       if (i == 0) checked = "checked";

//       text += `<p><input name="name" required type="${Questions[index].type}" id="button${Number(i)}" ${checked}> ${Questions[index].answers[i]}</p>`
//     }

//     $('.tt').innerHTML = `<form id=\"form-content\">${text}</form>`;
//     //$('.content__title').innerHTML = randomText[index].title;
//     //$('.content__desc').innerHTML = randomText[index].desc;      
//   }, 500)
//   //$('main').classList.remove('view' + index + '--active');
//   //$('main').classList.add('view' + (index + modifier) + '--active');
// }







//let questionIndex = 0;
next.addEventListener('click', function () {
  if (index < Questions.length - 1) {
    // Сбор ответов
    for (let i = 0; i < Questions[index].answers.length; i++) {
      if (document.getElementById(`button${Number(i)}`).checked) {
        Questions[index].userAnswers.push(i);
      }
    }

    ReloadContent(1);
    index++;
  } else {
    // Действия после последнего вопроса
    alert('Действия после последнего вопроса');
    //alert(Questions);
  }
}, false);

prev.addEventListener('click', function () {
  ReloadContent(-1);

  if (index > 0) index--;
}, false)

function toggleView() {
  $('main').classList.add('fade-out');
  setTimeout(function () {
    $('main').classList.remove('fade-out');
  }, 400)
}