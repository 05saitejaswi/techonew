//Questions
const questions = [
    { question: 'Name' },
    { question: 'Email Address', pattern: /\S+@\S+\.\S+/ },
    { question: 'Phone Number' },
    { question: 'College/Institution Name?' },
    { question: 'Year' },
    { question: 'City' },
    { question: 'State' },
    { question: 'Event Name' },
    { question: '', type: 'file', style: 'text-align:right', placeholer: '' },
    { question: 'Transaction ID' }
];

//Transitions time
const shakeTime = 100;
const switchTime = 200;

//Initial Question Position:
let position = 0;

//Dom Elements

const formBox = document.querySelector('#form-box');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//Events

document.addEventListener('DOMContentLoaded', getQuestion);

nextBtn.addEventListener('click', validate);

inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        validate();
    }
});

prevBtn.addEventListener("click", () => {
    position = position - 1;
    getQuestion();
});


//Functions

function getQuestion() {
    inputLabel.innerHTML = questions[position].question;

    inputField.type = questions[position].type || 'text';

    inputField.value = questions[position].answer || '';

    inputField.focus();

    progress.style.width = (position * 100) / questions.length + '%';

    prevBtn.className = position ? 'lni-arrow-left' : 'lni-user';

    showQuestion();
}

function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%'
}

function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputProgress.style.transition = 'none';
    inputProgress.style.width = 0;
    inputLabel.style.marginLeft = 0;
    inputGroup.style.border = null;
}

function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

function validate() {
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

function inputFail() {
    formBox.className = 'error';

    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);

        setTimeout(transform, shakeTime * 6, 0, 0);

        inputField.focus();
    }
}

function inputPass() {
    formBox.className = '';

    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    questions[position].answer = inputField.value;

    position++;

    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        formComplete();
    }
}

function formComplete() {
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(
        document.createTextNode(
            `Thank you for registering ${questions[0]
                .answer}. Hope to see you at the event!`
        )
    );
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}
