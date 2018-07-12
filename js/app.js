'use strict'

let score = 0;
let idx = 0;
let answered = 0;
const questions = [
    Question("здравствуйте", "hello"), 
    Question("мужчина", "man"),
    Question("спасибо", "thank you"),
    Question("пожалуйста", "please")
];

function Question(question, answer) {
    return {
        rus: question,
        eng: answer
    };
}

const changeQuestion = (qsn, index) => {
    const question = document.querySelector(".question");
    const input = document.querySelector(".answer");
    question.innerHTML = "";
    input.value = "";
    const newQuestion = document.createTextNode(qsn.rus);
    idx = index;
    question.appendChild(newQuestion);
    updateNav(index);
}

const updateQuestion = () => {
    const curr = questions[idx];
    const input = document.querySelector(".answer");
    if (++idx >= questions.length) {
        idx = 0;
    }
    answered++;

    if (input.value == curr.eng) {
        score++;
        console.log(score);
    }
    if (answered == questions.length) {
        exit();
    } else {
        changeQuestion(questions[idx], idx);
    }
}

const updateNav = index => {
    const items = document.querySelectorAll(".nav-item");
    const prev = document.querySelector(".nav-item--active");
    prev.classList.remove("nav-item--active");
    items[index].classList.add("nav-item--active");
}

const exit = () => {
    const apps = document.querySelectorAll(".app");
    for (let i = 0; i < apps.length; i++) {
        apps[i].classList.toggle("app--active");
    }
    const scoreNode = document.querySelector(".score");
    scoreNode.appendChild(document.createTextNode(`${score}/${questions.length}`))
}

(function init() {
    const qsn = document.querySelector(".question");
    qsn.appendChild(document.createTextNode(questions[0].rus));
})();

(function buildNav() {
    const container = document.querySelector(".nav-questions");
    const template = document.getElementById("nav-item-template");
    const item = template.content.querySelector(".nav-item");
    for (let i = 0; i < questions.length; i++) {
        const newNode = document.importNode(item, true);
        newNode.setAttribute("id", i);
        if (i == idx) {
            newNode.classList.add("nav-item--active");
        }
        newNode.addEventListener("click", e => {
            changeQuestion(questions[newNode.id], newNode.id);
        });
        container.appendChild(newNode);
    }
})();

(function setListeners() {
    const input = document.querySelector(".answer");
    input.addEventListener("keyup", e => {
        e.preventDefault();
        if (e.keyCode == 13) {
            updateQuestion();
        }
    });
})();
