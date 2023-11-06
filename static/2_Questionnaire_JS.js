'use strict'

import {count_question} from '/static/2_Questionnaire_questions_JS.js' //Массив вопросов

//Опросник/тест (Стандартный код)__________________________________________
//Генерация круглых флажков
const question_div_generator = document.getElementById('question_div_generator')
for (let n = 0; n < count_question.length; n++) {
    let new_div = document.createElement('div');
    question_div_generator.append(new_div);
}

let question_queue = 0; //счет порядка вопросов
let right_answer = ['', 0]; //счетчик правильных ответов

let question_start_class = document.querySelector('.question_start_class');
let question_class = document.querySelector('.question_class');
let question_stop_class = document.querySelector('.question_stop_class');

let Question_h = document.getElementById('Question_h');
let Question = document.getElementById('Question');
let Q_1 = document.getElementById('Q_1');
let Q_1_Checked = document.getElementById('Q_1_Checked');
let Q_2 = document.getElementById('Q_2');
let Q_2_Checked = document.getElementById('Q_2_Checked');
let Q_3 = document.getElementById('Q_3');
let Q_3_Checked = document.getElementById('Q_3_Checked');
let Q_4 = document.getElementById('Q_4');
let Q_4_Checked = document.getElementById('Q_4_Checked');

//Кнопка старта
let button_start_id = document.getElementById('button_start_id')
button_start_id.addEventListener('click', _ => {
    question_start_class.style.display = 'none';
    question_class.style.display = 'flex';
    question_f()
})

//Подверждение ответа
let button_GO_id = document.getElementById('button_GO_id');
button_GO_id.addEventListener('click', _ => question_f());
function question_f() {
    if (question_queue != 0) {
        //При необходимости нужно дабовлять вопросы
        if (Q_1_Checked.checked) {right_answer[0] = Q_1_Checked.value};
        if (Q_2_Checked.checked) {right_answer[0] = Q_2_Checked.value};
        if (Q_3_Checked.checked) {right_answer[0] = Q_3_Checked.value};
        if (Q_4_Checked.checked) {right_answer[0] = Q_4_Checked.value};
        //счет правильных ответов
        if (right_answer[0] == (count_question[(question_queue - 1)])['Правильный_ответ']) {
            right_answer[1]++
        };
    }
    //Добавление текста вопросам
    if (question_queue < count_question.length) {
        document.querySelector(`#question_div_generator > div:nth-child(${question_queue + 1})`).style.background = 'green';
        Question_h.innerText = (count_question[question_queue])['Заголовок_вопроса'];
        Question.innerText = (count_question[question_queue])['Вопрос'];
        Q_1.innerText = (count_question[question_queue])['вопрос_№1'];
        Q_1_Checked.value = (count_question[question_queue])['вопрос_№1'];
        Q_1_Checked.checked = false;
        Q_2.innerText = (count_question[question_queue])['вопрос_№2'];
        Q_2_Checked.value = (count_question[question_queue])['вопрос_№2'];
        Q_2_Checked.checked = false;
        Q_3.innerText = (count_question[question_queue])['вопрос_№3'];
        Q_3_Checked.value = (count_question[question_queue])['вопрос_№3'];
        Q_3_Checked.checked = false;
        Q_4.innerText = (count_question[question_queue])['вопрос_№4'];
        Q_4_Checked.value = (count_question[question_queue])['вопрос_№4'];
        Q_4_Checked.checked = false;
    };

    //Итог
    if (question_queue == count_question.length) {
        question_stop_class.style.display = 'flex';
        question_class.style.display = 'none';
        document.getElementById('question_stop').innerText = ' ' + right_answer[1];
        for (let n = 0; n < count_question.length; n++) {
            document.querySelector(`#question_div_generator > div:nth-child(${n + 1})`).style.background = 'aqua';
        }
    };
    question_queue++;
}

//Кнопка возврата
let button_stop_id = document.getElementById('button_stop_id');
button_stop_id.addEventListener('click', _ => stop_question_f())
function stop_question_f() {
    question_start_class.style.display = 'flex';
    question_stop_class.style.display = 'none';
    question_queue = 0;
    right_answer = ['', 0];
}

//Опросник/тест (Генерированный в JS)__________________________________________

let question_JS_version = document.getElementById('question_JS_version');

//Стартовое окно
let new_div_1 = document.createElement('div');
new_div_1.className = 'question_start_class_JS';
question_JS_version.append(new_div_1);

let new_button_1 = document.createElement('button');
new_button_1.id = 'button_start_id_JS';
new_button_1.innerText = 'Начать тест';
new_div_1.append(new_button_1);

//Окно вопросов
let new_div_2 = document.createElement('div');
new_div_2.className = 'question_class_JS';
question_JS_version.append(new_div_2);

let new_div_3 = document.createElement('div');
new_div_3.id = 'question_div_generator_JS';
new_div_2.append(new_div_3);

let new_div_4 = document.createElement('div');
new_div_4.id = 'question_div_generator_JS';
new_div_2.append(new_div_4);

    let new_h3 = document.createElement('h3');
    new_h3.id = 'Question_h_JS';
    new_div_4.append(new_h3);

    let new_span_1 = document.createElement('span');
    new_span_1.id = 'Question_JS';
    new_span_1.className = 'question';
    new_div_4.append(new_span_1);

let new_div_5 = document.createElement('div');
new_div_5.className = 'input_radio_class';
new_div_2.append(new_div_5);

    //Инпут - 1
    let new_label_1 = document.createElement('label');
    new_div_5.append(new_label_1);

        let new_input_1 = document.createElement('input');
        new_input_1.name = "group_2";
        new_input_1.type = "radio";
        new_input_1.id="Q_1_Checked_JS";
        new_label_1.append(new_input_1);
        let new_span_R_1 = document.createElement('span');
        new_span_R_1.id="Q_1_JS";
        new_label_1.append(new_span_R_1);

    let new_br_1 = document.createElement('br');
    new_div_5.append(new_br_1);

    //Инпут - 2
    let new_label_2 = document.createElement('label');
    new_div_5.append(new_label_2);

        let new_input_2 = document.createElement('input');
        new_input_2.name = "group_2";
        new_input_2.type = "radio";
        new_input_2.id="Q_2_Checked_JS";
        new_label_2.append(new_input_2);
        let new_span_R_2 = document.createElement('span');
        new_span_R_2.id="Q_2_JS";
        new_label_2.append(new_span_R_2);

    let new_br_2 = document.createElement('br');
    new_div_5.append(new_br_2);

    //Инпут - 3
    let new_label_3 = document.createElement('label');
    new_div_5.append(new_label_3);

        let new_input_3 = document.createElement('input');
        new_input_3.name = "group_2";
        new_input_3.type = "radio";
        new_input_3.id="Q_3_Checked_JS";
        new_label_3.append(new_input_3);
        let new_span_R_3 = document.createElement('span');
        new_span_R_3.id="Q_3_JS";
        new_label_3.append(new_span_R_3);

    let new_br_3 = document.createElement('br');
    new_div_5.append(new_br_3);

    //Инпут - 4
    let new_label_4 = document.createElement('label');
    new_div_5.append(new_label_4);

        let new_input_4 = document.createElement('input');
        new_input_4.name = "group_2";
        new_input_4.type = "radio";
        new_input_4.id="Q_4_Checked_JS";
        new_label_4.append(new_input_4);
        let new_span_R_4 = document.createElement('span');
        new_span_R_4.id="Q_4_JS";
        new_label_4.append(new_span_R_4);

    let new_br_4 = document.createElement('br');
    new_div_5.append(new_br_4);

let new_div_6 = document.createElement('div');
new_div_2.append(new_div_6);

let new_button_2 = document.createElement('button');
new_button_2.id='button_GO_id_JS';
new_button_2.textContent = 'Далее';
new_div_6.append(new_button_2);

//Окно завершения текста
let new_div_7 = document.createElement('div');
new_div_7.className = 'question_stop_class_JS';
question_JS_version.append(new_div_7);

    let new_h3_2 = document.createElement('h3');
    new_h3_2.textContent = 'Итог опроса/теста';
    new_div_7.append(new_h3_2);

    let new_div_8 = document.createElement('div');
    new_div_7.append(new_div_8);

        let new_span_2 = document.createElement('span');
        new_span_2.textContent = 'Правильных ответов:';
        new_div_8.append(new_span_2);

        let new_span_3 = document.createElement('span');
        new_span_3.id="question_stop_JS";
        new_div_8.append(new_span_3);

    let new_button_3 = document.createElement('button');
    new_button_3.textContent = 'Завершить опрос/тест';
    new_button_3.id = 'button_stop_id_JS';
    new_div_7.append(new_button_3);

//Коды действий опроса

//Генерация круглых флажков
const question_div_generator_JS = document.getElementById('question_div_generator_JS')
for (let n = 0; n < count_question.length; n++) {
    let new_div = document.createElement('div');
    question_div_generator_JS.append(new_div);
}

let question_queue_JS = 0; //счет порядка вопросов
let right_answer_JS = ['', 0]; //счетчик правильных ответов

let question_start_class_JS = document.querySelector('.question_start_class_JS');
let question_class_JS = document.querySelector('.question_class_JS');
let question_stop_class_JS = document.querySelector('.question_stop_class_JS');

let Question_h_JS = document.getElementById('Question_h_JS');
let Question_JS = document.getElementById('Question_JS');
let Q_1_JS = document.getElementById('Q_1_JS');
let Q_1_Checked_JS = document.getElementById('Q_1_Checked_JS');
let Q_2_JS = document.getElementById('Q_2_JS');
let Q_2_Checked_JS = document.getElementById('Q_2_Checked_JS');
let Q_3_JS = document.getElementById('Q_3_JS');
let Q_3_Checked_JS = document.getElementById('Q_3_Checked_JS');
let Q_4_JS = document.getElementById('Q_4_JS');
let Q_4_Checked_JS = document.getElementById('Q_4_Checked_JS');

//Кнопка старта
let button_start_id_JS = document.getElementById('button_start_id_JS')
button_start_id_JS.addEventListener('click', _ => {
    question_start_class_JS.style.display = 'none';
    question_class_JS.style.display = 'flex';
    question_f_JS()
})

//Подверждение ответа
let button_GO_id_JS = document.getElementById('button_GO_id_JS');
button_GO_id_JS.addEventListener('click', _ => question_f_JS());
function question_f_JS() {
    if (question_queue_JS != 0) {
        //При необходимости нужно дабовлять вопросы
        if (Q_1_Checked_JS.checked) {right_answer_JS[0] = Q_1_Checked_JS.value};
        if (Q_2_Checked_JS.checked) {right_answer_JS[0] = Q_2_Checked_JS.value};
        if (Q_3_Checked_JS.checked) {right_answer_JS[0] = Q_3_Checked_JS.value};
        if (Q_4_Checked_JS.checked) {right_answer_JS[0] = Q_4_Checked_JS.value};
        //счет правильных ответов
        if (right_answer_JS[0] == (count_question[(question_queue_JS - 1)])['Правильный_ответ']) {
            right_answer_JS[1]++
        };
    }
    //Добавление текста вопросам
    if (question_queue_JS < count_question.length) {
        document.querySelector(`#question_div_generator_JS > div:nth-child(${question_queue_JS + 1})`).style.background = 'green';
        Question_h_JS.innerText = (count_question[question_queue_JS])['Заголовок_вопроса'];
        Question_JS.innerText = (count_question[question_queue_JS])['Вопрос'];
        Q_1_JS.innerText = (count_question[question_queue_JS])['вопрос_№1'];
        Q_1_Checked_JS.value = (count_question[question_queue_JS])['вопрос_№1'];
        Q_1_Checked_JS.checked = false;
        Q_2_JS.innerText = (count_question[question_queue_JS])['вопрос_№2'];
        Q_2_Checked_JS.value = (count_question[question_queue_JS])['вопрос_№2'];
        Q_2_Checked_JS.checked = false;
        Q_3_JS.innerText = (count_question[question_queue_JS])['вопрос_№3'];
        Q_3_Checked_JS.value = (count_question[question_queue_JS])['вопрос_№3'];
        Q_3_Checked_JS.checked = false;
        Q_4_JS.innerText = (count_question[question_queue_JS])['вопрос_№4'];
        Q_4_Checked_JS.value = (count_question[question_queue_JS])['вопрос_№4'];
        Q_4_Checked_JS.checked = false;
    };

    //Итог
    if (question_queue_JS == count_question.length) {
        question_stop_class_JS.style.display = 'flex';
        question_class_JS.style.display = 'none';
        document.getElementById('question_stop_JS').innerText = ' ' + right_answer_JS[1];
        for (let n = 0; n < count_question.length; n++) {
            document.querySelector(`#question_div_generator_JS > div:nth-child(${n + 1})`).style.background = 'aqua';
        }
    };
    question_queue_JS++;
}

//Кнопка возврата
let button_stop_id_JS = document.getElementById('button_stop_id_JS');
button_stop_id_JS.addEventListener('click', _ => stop_question_f_JS())
function stop_question_f_JS() {
    question_start_class_JS.style.display = 'flex';
    question_stop_class_JS.style.display = 'none';
    question_queue_JS = 0;
    right_answer_JS = ['', 0];
}

//Опросник/тест (Генерированный в JQuery)__________________________________________
let question_JQ_version = document.getElementById('question_JQ_version');

$('<div>')
    .attr('id', 'div_1_jQ')
    .addClass('question_start_class_JQ')
    .appendTo(question_JQ_version)

    $('<button>')
        .attr('id', 'button_start_id_JQ')
        .text('Начать тест')
        .appendTo('#div_1_jQ')

$('<div>')
    .attr('id', 'div_2_jQ')
    .addClass('question_class_JQ')
    .appendTo(question_JQ_version)

    $('<div>')
        .attr('id', 'question_div_generator_JQ')
        .appendTo('#div_2_jQ')

    $('<div>')
        .attr('id', 'div_4_jQ')
        .appendTo('#div_2_jQ')

        $('<h3>')
            .attr('id', 'Question_h_JQ')
            .appendTo('#div_4_jQ')

        $('<span>')
            .addClass('question')
            .attr('id', 'Question_JQ')
            .appendTo('#div_4_jQ')

    $('<div>')
        .attr('id', 'div_5_jQ')
        .addClass('input_radio_class')
        .appendTo('#div_2_jQ')

        $('<label>')
            .attr('id', 'label_id_1_JQ')
            .appendTo('#div_5_jQ')
            $('<input name="group_3" type="radio" id="Q_1_Checked_JQ">')
                .appendTo('#label_id_1_JQ')
            $('<span id="Q_1_JQ">')
                .appendTo('#label_id_1_JQ')
            $('<br>')
                .appendTo('#div_5_jQ')

        $('<label>')
            .attr('id', 'label_id_2_JQ')
            .appendTo('#div_5_jQ')
                $('<input name="group_3" type="radio" id="Q_2_Checked_JQ">')
                    .appendTo('#label_id_2_JQ')
                $('<span id="Q_2_JQ">')
                    .appendTo('#label_id_2_JQ')
                $('<br>')
                    .appendTo('#div_5_jQ')

        $('<label>')
            .attr('id', 'label_id_3_JQ')
            .appendTo('#div_5_jQ')
                $('<input name="group_3" type="radio" id="Q_3_Checked_JQ">')
                    .appendTo('#label_id_3_JQ')
                $('<span id="Q_3_JQ">')
                    .appendTo('#label_id_3_JQ')
                $('<br>')
                    .appendTo('#div_5_jQ')

        $('<label>')
            .attr('id', 'label_id_4_JQ')
            .appendTo('#div_5_jQ')
                $('<input name="group_3" type="radio" id="Q_4_Checked_JQ">')
                    .appendTo('#label_id_4_JQ')
                $('<span id="Q_4_JQ">')
                    .appendTo('#label_id_4_JQ')
                $('<br>')
                    .appendTo('#div_5_jQ')
                    
    $('<div id="div_6_jQ">')
        .appendTo('#div_2_jQ')

        $('<button id="button_GO_id_JQ">')
            .text('Далее')
            .appendTo('#div_6_jQ')

$('<div class="question_stop_class_JQ">')
    .appendTo(question_JQ_version)
    
    $('<h3>')
        .text('Итог опроса/теста')
        .appendTo('.question_stop_class_JQ')
    
    $('<div id="div_8_jQ">')
        .appendTo('.question_stop_class_JQ')

        $('<span>')
            .text('Правильных ответов: ')
            .appendTo('#div_8_jQ')

        $('<span id="question_stop_JQ">')
            .appendTo('#div_8_jQ')

    $('<button id="button_stop_id_JQ">')
        .text('Завершить опрос/тест')
        .appendTo('.question_stop_class_JQ')

//Коды действий опроса

//Генерация круглых флажков
const question_div_generator_JQ = document.getElementById('question_div_generator_JQ')
for (let n = 0; n < count_question.length; n++) {
    let new_div = document.createElement('div');
    question_div_generator_JQ.append(new_div);
}

let question_queue_JQ = 0; //счет порядка вопросов
let right_answer_JQ = ['', 0]; //счетчик правильных ответов

let question_start_class_JQ = document.querySelector('.question_start_class_JQ');
let question_class_JQ = document.querySelector('.question_class_JQ');
let question_stop_class_JQ = document.querySelector('.question_stop_class_JQ');

let Question_h_JQ = document.getElementById('Question_h_JQ');
let Question_JQ = document.getElementById('Question_JQ');
let Q_1_JQ = document.getElementById('Q_1_JQ');
let Q_1_Checked_JQ = document.getElementById('Q_1_Checked_JQ');
let Q_2_JQ = document.getElementById('Q_2_JQ');
let Q_2_Checked_JQ = document.getElementById('Q_2_Checked_JQ');
let Q_3_JQ = document.getElementById('Q_3_JQ');
let Q_3_Checked_JQ = document.getElementById('Q_3_Checked_JQ');
let Q_4_JQ = document.getElementById('Q_4_JQ');
let Q_4_Checked_JQ = document.getElementById('Q_4_Checked_JQ');

//Кнопка старта
let button_start_id_JQ = document.getElementById('button_start_id_JQ')
button_start_id_JQ.addEventListener('click', _ => {
    question_start_class_JQ.style.display = 'none';
    question_class_JQ.style.display = 'flex';
    question_f_JQ()
})

//Подверждение ответа
let button_GO_id_JQ = document.getElementById('button_GO_id_JQ');
button_GO_id_JQ.addEventListener('click', _ => question_f_JQ());
function question_f_JQ() {
    if (question_queue_JQ != 0) {
        //При необходимости нужно дабовлять вопросы
        if (Q_1_Checked_JQ.checked) {right_answer_JQ[0] = Q_1_Checked_JQ.value};
        if (Q_2_Checked_JQ.checked) {right_answer_JQ[0] = Q_2_Checked_JQ.value};
        if (Q_3_Checked_JQ.checked) {right_answer_JQ[0] = Q_3_Checked_JQ.value};
        if (Q_4_Checked_JQ.checked) {right_answer_JQ[0] = Q_4_Checked_JQ.value};
        //счет правильных ответов
        if (right_answer_JQ[0] == (count_question[(question_queue_JQ - 1)])['Правильный_ответ']) {
            right_answer_JQ[1]++
        };
    }
    //Добавление текста вопросам
    if (question_queue_JQ < count_question.length) {
        document.querySelector(`#question_div_generator_JQ > div:nth-child(${question_queue_JQ + 1})`).style.background = 'green';
        Question_h_JQ.innerText = (count_question[question_queue_JQ])['Заголовок_вопроса'];
        Question_JQ.innerText = (count_question[question_queue_JQ])['Вопрос'];
        Q_1_JQ.innerText = (count_question[question_queue_JQ])['вопрос_№1'];
        Q_1_Checked_JQ.value = (count_question[question_queue_JQ])['вопрос_№1'];
        Q_1_Checked_JQ.checked = false;
        Q_2_JQ.innerText = (count_question[question_queue_JQ])['вопрос_№2'];
        Q_2_Checked_JQ.value = (count_question[question_queue_JQ])['вопрос_№2'];
        Q_2_Checked_JQ.checked = false;
        Q_3_JQ.innerText = (count_question[question_queue_JQ])['вопрос_№3'];
        Q_3_Checked_JQ.value = (count_question[question_queue_JQ])['вопрос_№3'];
        Q_3_Checked_JQ.checked = false;
        Q_4_JQ.innerText = (count_question[question_queue_JQ])['вопрос_№4'];
        Q_4_Checked_JQ.value = (count_question[question_queue_JQ])['вопрос_№4'];
        Q_4_Checked_JQ.checked = false;
    };

    //Итог
    if (question_queue_JQ == count_question.length) {
        question_stop_class_JQ.style.display = 'flex';
        question_class_JQ.style.display = 'none';
        document.getElementById('question_stop_JQ').innerText = ' ' + right_answer_JQ[1];
        for (let n = 0; n < count_question.length; n++) {
            document.querySelector(`#question_div_generator_JQ > div:nth-child(${n + 1})`).style.background = 'aqua';
        }
    };
    question_queue_JQ++;
}

//Кнопка возврата
let button_stop_id_JQ = document.getElementById('button_stop_id_JQ');
button_stop_id_JQ.addEventListener('click', _ => stop_question_f_JQ())
function stop_question_f_JQ() {
    question_start_class_JQ.style.display = 'flex';
    question_stop_class_JQ.style.display = 'none';
    question_queue_JQ = 0;
    right_answer_JQ = ['', 0];
}