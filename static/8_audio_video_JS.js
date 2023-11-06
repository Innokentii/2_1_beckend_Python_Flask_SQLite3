"use strict"

let _8_modal_table = document.getElementById('_8_modal_table'); // (модальное окно загрузки);
_8_modal_table.style.display = 'none'; // (Скрытие модального окна загрузки);

//Запрос данных с базы данных
let data = ''; // Имена файлов
let N_len = 0; // Количество строк
let N = 0; // Cчет строк

//Глобальная переменная для функции прокрутки музыки
let N_count_scrolling = 0;

//Глобальные переменные Функция переключения
let _8_play_id = document.getElementById('_8_play_id');
let _8_pause_id = document.getElementById('_8_pause_id');
_8_pause_id.style.display = 'none';

//Глобальные переменные регулятора звука
let _8_sound_id = document.getElementById('_8_sound_id');
let _8_not_sound_id = document.getElementById('_8_not_sound_id');
_8_not_sound_id.style.display = 'none';
let load_sound_parent_id = document.getElementById('load_sound_parent_id');
let load_sound_id = document.getElementById('load_sound_id');

document.addEventListener('DOMContentLoaded', _ => {
    //Запрос имен песен
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/8_audio_video_get_2', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            N_len = data.length;
            audio_gen(N, data);
        }
    }
    xhr.send();
});

//Генерация строк аудио
let _8_table_create = document.getElementById('_8_table_create'); // Thead для генерации строк
let _8_av_img = document.getElementById('_8_av_img'); // Иконка аудио и видео
let _8_hidden_audio = document.getElementById('_8_hidden_audio'); //Скрытый аудио плеер

//Функция вызова аудио и видео
async function audio_gen(num_gen, data) {
    _8_modal_table.style.display = ''; // (Показ модального окна загрузки);
    //POST запрос
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/8_audio_video_post', true);
    xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    xhr.send(JSON.stringify({ 'param2': num_gen }));
    //GET запрос
    fetch('/8_audio_video_get')
        .then(response => {return response.blob()})
        .then(blob => {
            let blobData = new Blob([blob]);
            let blobUrl = URL.createObjectURL(blobData);
            gen_table(blobUrl, num_gen, data);
            _8_modal_table.style.display = 'none'; // (Скрытие модального окна загрузки);
        })
        .catch(error => {
            console.error('Ощибка при получении blob данных: ', error)
        });
};

// Функция генерации таблицы
function gen_table(blobUrl, N, data) {
    let new_tr = document.createElement('tr');
    new_tr.id = `tr_id_${N}`;
    _8_table_create.append(new_tr);
    //Создание скрытой аудио дорожки
    let AV = new Audio();
    AV.src = blobUrl;
    //Цикл генерации строки
    for (let n = 0; n < 6; n++) {
        let new_td = document.createElement('td');
        new_tr.append(new_td);
        if (n == 0) { new_td.textContent = N + 1 };
        if (n == 1) {
            if (data[N].split('').length > 30) {
                new_td.textContent = (data[N].split('')).slice(0, 27).join('') + '...';
            }
            else {
                new_td.textContent = data[N];
            }
        };
        if (n == 2) { new_td.textContent = AV.album };
        if (n == 3) { new_td.textContent = AV.artist };
        if (n == 4) { new_td.textContent = AV.genre };
        if (AV.picture) {
            _8_av_img.src = AV.picture;
        }
        else {
            _8_av_img.src = '/static/8_icon_audio.png';
        }
        if (n == 5) {
            let new_audio = document.createElement('audio');
            new_audio.src = blobUrl;
            new_audio.volume = 0.5;
            new_audio.controls = true;
            new_audio.id = `aud_${N}`;
            new_td.append(new_audio);
        };
    }
    N += 1;
    if (N < N_len) {
        audio_gen(N, data);
    }
}

// Функция выбора музыки;
document.addEventListener('click', (e) => {
    let target = e.target;
    let parent = target.parentNode;

    for (let n = 0; n < N_len; n++) {
        if (parent.id == `tr_id_${n}`) {
            N_count_scrolling = n;
            //POST запрос конкретной музыки
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/8_audio_video_post_4', true);
            xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
            xhr.send(JSON.stringify({ 'param3': n }));

            //GET запрос конкретной музыки
            let xhr3 = new XMLHttpRequest();
            xhr3.open('GET', '/8_audio_video_get_4', true);
            xhr3.onreadystatechange = function() {
                if (xhr3.readyState == 4 && xhr3.status == 200) {
                    let data_2 = JSON.parse(xhr3.responseText);
                    text_movement(data_2);
                }
            }
            xhr3.send();

            //POST запрос
            let xhr2 = new XMLHttpRequest();
            xhr2.open('POST', '/8_audio_video_post', true);
            xhr2.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
            xhr2.send(JSON.stringify({ 'param2': n }));
            //GET запрос
            fetch('/8_audio_video_get')
                .then(response => { return response.blob() })
                .then(blob => {
                    let blobData = new Blob([blob]);
                    let blobUrl = URL.createObjectURL(blobData);
                    _8_hidden_audio.src = blobUrl;
                    _8_hidden_audio.volume = 0.5;
                    if (_8_play_id.style.display == 'none') {
                        _8_hidden_audio.play();
                    }
                })
                .catch(error => {
                    console.error('Ощибка при получении blob данных: ', error)
                });
        }
    }
});

//Функция карусельного движения названия музыки
function text_movement(text) {
    let lenText = text.split('').length;
    if (lenText>30) {
        let text_2 = text.split('').slice(0, 27).join('') + '...';
        _8_name_audio.textContent = text_2;
        text = text + "__________________"
        lenText = text.split('').length;
        let ms = (lenText * 120);
        let setTimeout_f = setTimeout(()=>{
            let parent_text_comm = setInterval(text_mov_gen(text, lenText), ms);
            _8_table_create.addEventListener('mousedown', _ => {clearInterval(parent_text_comm)});
        }, 1000);
        _8_table_create.addEventListener('mousedown', _ => {clearInterval(setTimeout_f)});
        function text_mov_gen(t, L) {
            let text_w = t.split('');
            let N_count_intervak = 0;
            let text_comm_child = setInterval(function () {
                let text_w_2 = text_w;
                let x_per = text_w_2[0];
                for (let j = 0; j < L; j++) {
                    if (j==(L-1)) {
                        text_w_2[j] = x_per;
                    }
                    else {
                        text_w_2[j] = text_w[j + 1];
                    };
                }
                let text_comm = text_w.slice(0, 27).join('') + '...';
                _8_name_audio.textContent = text_comm;
                N_count_intervak += 1;
            }, 120)
            _8_table_create.addEventListener('mousedown', _ => {clearInterval(text_comm_child)})
        }
    }
    else {
        _8_name_audio.textContent = text;
    }
}

//Запуск музыки
_8_play_id.addEventListener('click', _ => {
    if (_8_hidden_audio.src != '') {
        _8_play_id.style.display = 'none';
        _8_pause_id.style.display = '';
        _8_hidden_audio.play();
    }

});

//Остановка музыки
_8_pause_id.addEventListener('click', _ => {
    _8_play_id.style.display = '';
    _8_pause_id.style.display = 'none';
    _8_hidden_audio.pause();
});

//Переключение музыки в лево
let _8_next_left_id = document.getElementById('_8_next_left_id');
_8_next_left_id.addEventListener('click', _ => {
    if (_8_hidden_audio.src == '') {
        _8_hidden_audio.src = document.getElementById(`aud_${N_count_scrolling}`).src;
    }
    else {
        if (N_count_scrolling == 0) {
            N_count_scrolling = N_len - 1;
            _8_hidden_audio.src = document.getElementById(`aud_${N_len - 1}`).src;
        }
        else {
            N_count_scrolling -= 1;
            _8_hidden_audio.src = document.getElementById(`aud_${N_count_scrolling}`).src;
        }
    }
    if (_8_play_id.style.display == 'none') {
        _8_hidden_audio.play();
    }
    if (_8_play_id.style.display == 'none') {
        _8_hidden_audio.play();
    }
});

//Переключение музыки в право
let _8_next_right_id = document.getElementById('_8_next_right_id');
_8_next_right_id.onclick = () => {next_right_f();}

function next_right_f() {
    if (_8_hidden_audio.src == '') {
        _8_hidden_audio.src = document.getElementById(`aud_${N_count_scrolling}`).src;
    }
    else {
        if (N_count_scrolling == N_len - 1) {
            N_count_scrolling = 0;
            _8_hidden_audio.src = document.getElementById(`aud_${0}`).src;
        }
        else {
            N_count_scrolling += 1;
            _8_hidden_audio.src = document.getElementById(`aud_${N_count_scrolling}`).src;
        }
    }
    if (_8_play_id.style.display == 'none') {
        _8_hidden_audio.play();
    }
    if (_8_play_id.style.display == 'none') {
        _8_hidden_audio.play();
    }
};

//переключение при остановке аудио
_8_hidden_audio.onended = () => {next_right_f()};

//Функция регулировки звука
load_sound_parent_id.onclick = (e) => {
    let x_pos = e.offsetX;
    console.log(x_pos);
    load_sound_id.style.width = `${x_pos}px`;
    _8_hidden_audio.volume = x_pos / 200;
    if (_8_hidden_audio.volume == 0) {
        _8_sound_id.style.display = 'none';
        _8_not_sound_id.style.display = '';
    }
    else {
        _8_sound_id.style.display = '';
        _8_not_sound_id.style.display = 'none';
    }
}

// Функция мгновенного отключения звука
_8_sound_id.onclick = () => {
    _8_sound_id.style.display = 'none';
    _8_not_sound_id.style.display = '';
    load_sound_id.style.width = `${0}px`;
    _8_hidden_audio.volume = 0 / 200;
} 

// Функция контроля загрузки музыки
let _8_load_blue_id = document.getElementById('_8_load_blue_id');
let _8_load_red_id = document.getElementById('_8_load_red_id');
setInterval(()=> {
    _8_load_red_id.style.width = `${(_8_hidden_audio.currentTime / _8_hidden_audio.duration) * 300}px`;
}, 200);

//Функция мнгновенной регулировки трека музыки
let _8_load_audio_ = document.getElementById('_8_load_audio_');
_8_load_audio_.onclick = (e) => {
    try {
        let x_pos = e.offsetX;
        _8_hidden_audio.currentTime = (x_pos / 300) * _8_hidden_audio.duration;
    }
    catch(error) {
        console.log(`Произошла ошибка${error}`);
    }
}