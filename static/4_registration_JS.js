"use strict"

//Текст замечаний
let _4_danger_span = document.getElementById('_4_danger_span');

//Открытие и закрытие видимости пароля
let open_password_1 = document.querySelector('#open_password_1 > div');
let password_1 = document.querySelector('#open_password_1 > input');
open_password_1.addEventListener('click', _ => {
    if (password_1.type == 'password') {
        password_1.type = 'text';
    }
    else {
        password_1.type = 'password'
    }
});

//Открытие и закрытие видимости пароля
let open_password_2 = document.querySelector('#open_password_2 > div');
let password_2 = document.querySelector('#open_password_2 > input');
open_password_2.addEventListener('click', _ => {
    if (password_2.type == 'password') {
        password_2.type = 'text';
    }
    else {
        password_2.type = 'password'
    }
});

//Открытие и закрытие видимости пароля
let open_password_3 = document.querySelector('#open_password_3 > div');
let password_3 = document.querySelector('#open_password_3 > input');
open_password_3.addEventListener('click', _ => {
    if (password_3.type == 'password') {
        password_3.type = 'text';
    }
    else {
        password_3.type = 'password'
    }
});

// Кнопка регистранции
let _4_button_1 = document.getElementById('_4_button_1');

// Открытие кнопки регистрации
let login_go_open = document.querySelector('.registration_body > div:nth-child(1)');
let _4_input_1_id = document.getElementById('_4_input_1_id');
let _4_input_2_id = document.getElementById('_4_input_2_id');
let _4_input_2_2_id = document.getElementById('_4_input_2_2_id');
let _4_input_3_id = document.getElementById('_4_input_3_id');

login_go_open.addEventListener('keydown', _ => {
    if (_4_input_1_id.value != '' && _4_input_2_id.value != '' && _4_input_3_id.value != '' && _4_input_2_2_id.value != '') {
        _4_button_1.disabled = false;
    }
    else {
        _4_button_1.disabled = true;
    }
});

// Регистрация нового аккаунта
let _4_input_4_id = document.getElementById('_4_input_4_id');
let _4_input_5_id = document.getElementById('_4_input_5_id');
let reg_id = document.getElementById('reg_id');
let login_open = document.getElementById('login_open');
let login_open_password = document.getElementById('login_open_password');
let not_go_id = document.getElementById('not_go_id');

not_go_id.addEventListener('keydown', _ => {
    login_open.value = '';
    login_open_password.value = '';
    let _4_open_user = document.getElementById('_4_open_user');
    _4_open_user.style.display = 'none';
    let name = document.querySelector('#_4_open_user > span:nth-child(2)');
    let phone = document.querySelector('#_4_open_user > span:nth-child(4)');
    let mail = document.querySelector('#_4_open_user > span:nth-child(6)');
    name.textContent = '';
    phone.textContent = '';
    mail.textContent = '';
})

function save_account() {
    _4_danger_span.style.color = 'red';
    _4_danger_span.textContent = '';
    if (_4_input_1_id.value == '') {
        _4_danger_span.textContent = 'введите ФИО;';
    }
    if (_4_input_2_id.value == '') {
        _4_danger_span.textContent = 'введите ваш номер телефона;';
    }
    if (_4_input_2_2_id.value == '') {
        _4_danger_span.textContent = 'введите вашу эл.почту;';
    }
    if (_4_input_3_id.value == '') {
        _4_danger_span.textContent = 'придумайте логин';
    }
    if (_4_input_1_id.value != '' && _4_input_2_id.value != ''  && _4_input_2_2_id.value != '' && _4_input_3_id.value != '') {
        if (_4_input_4_id.value != _4_input_5_id.value) {
            _4_danger_span.textContent = 'вы неправильно повторили пароль;';
        }
        else {
            _4_danger_span.textContent = '';
            _4_button_1.type = 'submit';
            reg_id.method = 'post';
            reg_id.submit();
        }
    }
}

// Запрет перезагрузки функции open_account()
_4_button_1.onclick = (e) => {e.preventDefault(); save_account();}

// Регистрация
document.addEventListener('DOMContentLoaded', _ => {
    if (_4_danger_span.textContent == 'вы зарегистрированы)') {
        _4_danger_span.style.color = 'green';
    }
});

// Вывод сохраненных аккаунтов
addEventListener('DOMContentLoaded', _ => {
    let _4_table = document.getElementById('_4_table');
    let span_python_info = document.getElementById('span_python_info');
    
    let text_info = span_python_info.textContent;
    text_info = text_info.split('');
    text_info = text_info.slice(1, -1)
    text_info = text_info.join('');
    text_info = text_info.split(')(');
    for (let n=0; n<text_info.length; n++) {
        let new_tr = document.createElement('tr');
        _4_table.append(new_tr);
        let new_td_1 = document.createElement('td');
        new_td_1.textContent = text_info[n].split("', '")[1];
        new_tr.append(new_td_1);
        let new_td_2 = document.createElement('td');
        new_td_2.textContent = text_info[n].split("', '")[2];
        new_tr.append(new_td_2);
    }
})

// Запрет ввода в ФИО сторонних символов
_4_input_1_id.addEventListener('keydown', (e) => {
    if ([',','?','.','{','}','[',']',"\\",'|','/',':',';','!','&','^','%','#','№','+','-','*','0','1','2','3','4','5','6','7','8','9'].includes(e.key)==true) {
        e.preventDefault();
    }
});

// Запрет ввода в номер телефона сторонних символов и символов больше чем чисел в номере телефона
_4_input_2_id.addEventListener('keydown', (e) => {
    if (['0','1','2','3','4','5','6','7','8','9', '+','Backspace'].includes(e.key)==false) {
        e.preventDefault();
    }
    let work_list = _4_input_2_id.value;
    work_list = work_list.split('');
    if (['Backspace'].includes(e.key)==false) {
        if (work_list[0] == '+') {
            if (work_list.length == 12) {
                e.preventDefault();
            }
        }
        else {
            if (work_list.length == 11) {
                e.preventDefault();
            }
        }
    }
});

// Проверка правильности ввода эл.почты
reg_id.addEventListener('keydown', (e) => {
    let text_work = _4_input_2_2_id.value;
    text_work = text_work.split('');
    let confirmation_accoun = 0;
    for (let n=0; n<text_work.length; n++) {
        if (text_work[n] == '@') {
            if (confirmation_accoun == 0) {
                confirmation_accoun += 1;
            }
            else {
                break
            }
        }
        if (text_work[n] == '.') {
            if (confirmation_accoun == 0) {
                confirmation_accoun += 1;
            }
            else {
                confirmation_accoun += 1;
                break
            }
        }
        if(e.key == '.') {
            confirmation_accoun += 1;
        }
    }
    if (confirmation_accoun == 2) {
        _4_danger_span.textContent = '';
    }
    else {
        _4_button_1.disabled = true;
        _4_danger_span.textContent = 'неправильно введена эл.почта;';
    }
});

// Вход в Аккаунт
let _4_button_2 = document.getElementById('_4_button_2');
let not_go_id_2 = document.getElementById('not_go_id_2');

not_go_id_2.addEventListener('keydown', _ => {
    _4_input_1_id.value = '';
    _4_input_2_id.value = '';
    _4_input_2_2_id.value = '';
    _4_input_3_id.value = '';
    _4_input_4_id.value = '';
    _4_input_5_id.value = '';
});

function open_account() {
    let span_python_info = document.getElementById('span_python_info');
    let login_open = document.getElementById('login_open');
    let _4_danger_open = document.getElementById('_4_danger_open');
    
    let text_info = span_python_info.textContent;
    text_info = text_info.split(')(');
    for (let n=0; n<text_info.length; n++) {
        text_info[n] = text_info[n].split("', '");
    }
    _4_danger_open.style.display = 'flex';
    for (let n=0; n < text_info.length; n++) {
        if (text_info[n][1] == login_open.value) {
            console.log(1);
            reg_id.method = 'post';
            reg_id.submit();
            break
        }
    }
}
// Запрет перезагрузки функции open_account()
_4_button_2.onclick = (e) => {e.preventDefault(); open_account()}

// Проверка пароля при входе
addEventListener('DOMContentLoaded', _ => {
    let password_open = document.getElementById('password_open');
    let span_python_info = document.getElementById('span_python_info');
    let text_info = span_python_info.textContent;
    let _4_open_user = document.getElementById('_4_open_user');
    _4_open_user.style.display = 'none';

    text_info = text_info.split('');
    text_info = text_info.slice(1, -1)
    text_info = text_info.join('');
    text_info = text_info.split(')(');
    for (let n=0; n<text_info.length; n++) {
        text_info[n] = text_info[n].split("', '");
    }

    for (let N=0; N<text_info.length; N++) {
        for (let n=0; n<text_info[N].length; n++) {
            console.log(text_info[N][n])
            if (text_info[N][n] == password_open.textContent) {
                let name = document.querySelector('#_4_open_user > span:nth-child(2)');
                let phone = document.querySelector('#_4_open_user > span:nth-child(4)');
                let mail = document.querySelector('#_4_open_user > span:nth-child(6)');
                name.textContent = text_info[N][2];
                phone.textContent = text_info[N][3];
                mail.textContent = text_info[N][4];
                _4_open_user.style.display = 'flex';
            }
        }
    }

});
