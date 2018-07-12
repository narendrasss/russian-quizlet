'use strict'

let isRunning = false;

let score = 0;
let idx = 0;
let answered = 0;
let questions = [];

/*
* Returns the index of the next unanswered question in questions.
*/
const getNextUnanswered = () => {
    for (let i = 0; i < questions.length; i++) {
        if (!questions[i].answered) {
            return i;
        }
    }
}

/*
* Returns true if the user answer is correct.
*/
const isCorrect = (question, input) => {
    return question.eng == input;
}

/*
* Returns num random questions from the questions database.
*/
const getQuestions = num => {
    let chosen = [];
    let result = [];
    while (result.length < num) {
        const idx = Math.floor(Math.random()*database.length);
        if (!chosen.includes(idx)) {
            chosen.push(idx);
            result.push(database[idx]);
        }
    }
    return result;
}

/*
* Changes the question to the question located at index.
*/
const changeQuestion = (qsn, index) => {
    const question = document.querySelector(".question");
    const input = document.querySelector(".answer");
    question.innerHTML = "";
    input.value = "";
    idx = index;
    question.appendChild(document.createTextNode(qsn.rus));
    updateNav(index);
}

const updateQuestion = () => {
    const curr = questions[idx];
    const input = document.querySelector(".answer");
    const items = document.querySelectorAll(".nav_item");

    if (isCorrect(curr, input.value)) {
        score++;
        items[idx].classList.add("nav_item--correct");
    } else {
        items[idx].classList.add("nav_item--incorrect");
    }

    curr.answered = true;
    answered++;
    if (++idx >= questions.length) {
        idx = getNextUnanswered();
    }
    if (answered == questions.length) {
        exit();
    } else {
        changeQuestion(questions[idx], idx);
    }
}

const updateNav = index => {
    const items = document.querySelectorAll(".nav_item");
    const prev = document.querySelector(".nav_item--active");
    prev.classList.remove("nav_item--active");
    items[index].classList.add("nav_item--active");
}

const exit = () => {
    // TODO: implement score system
}

function init() {
    const qsn = document.querySelector(".question");
    qsn.appendChild(document.createTextNode(questions[0].rus));
    buildNav();
}

function buildNav() {
    const container = document.querySelector(".nav--questions");
    const template = document.getElementById("nav-item-template");
    const item = template.content.querySelector(".nav_item");
    for (let i = 0; i < questions.length; i++) {
        const newNode = document.importNode(item, true);
        newNode.setAttribute("id", i);
        if (i == idx) {
            newNode.classList.add("nav_item--active");
        }
        newNode.addEventListener("click", e => {
            changeQuestion(questions[newNode.id], newNode.id);
        });
        container.appendChild(newNode);
    }
}

(function setListeners() {
    const input = document.querySelector(".answer");
    input.addEventListener("keyup", e => {
        e.preventDefault();
        if (e.keyCode == 13) {
            if (!isRunning) {
                questions = getQuestions(input.value);
                input.value = "";
                init();
                isRunning = true;
            } else {
                updateQuestion();
            }
        }
    });
})();
