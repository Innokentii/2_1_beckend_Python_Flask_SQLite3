"use strict"

let _7_modal_table = document.getElementById('_7_modal_table'); // (модальное окно загрузки);
_7_modal_table.style.display = 'none'; // (Скрытие модального окна загрузки);

//Функции вывода и закрытия результата поиска
let _7_body = document.getElementById('_7_body_id');
_7_body.style.display = 'none';
let _7_input_id = document.getElementById('_7_input_id');
_7_input_id.addEventListener('keydown', _ => {_7_body.style.display = '';});
document.addEventListener('mousedown', _ => {_7_body.style.display = 'none';});

//Функция старта динамического поиска
_7_input_id.addEventListener('keydown', _ => {
    _7_input_id.oninput = function() {
        let value = _7_input_id.value;
        let list = document.querySelectorAll('#_7_table_id > tr > td');
    
        if (value != '') {
            list.forEach(elem => {
                if(elem.innerText.search(value) == -1) {
                    elem.classList.add('work_class_hidden')
                }
                else {
                    elem.classList.remove('work_class_hidden')  
                }
            })
        }
        else {
            list.forEach(elem => {
                elem.classList.remove('work_class_hidden')
            })
        }
    }
});

// Функция запроса данных
let data = '';
let data_work = '';
document.addEventListener('DOMContentLoaded', _ => {get_start()})
function get_start() {
    let xhr = new XMLHttpRequest();
    //Запрос с базы данных перечня файлов
    xhr.open('GET', '/7_search_engine_get', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
            data_work = JSON.parse(xhr.responseText);
            data_connections(data, data.length)
        }
    }
    xhr.send();
}

//Функция перетусовки данных
let new_obj;
function data_connections(obj, len_row) {
    new_obj = obj;
    for (let n=0; n<len_row; n++) {
        new_obj[n] = (new_obj[n][0] + '/' + new_obj[n][1] + 'byte/' + new_obj[n][2] + '/' + new_obj[n][3]);
    }
    gen_td(len_row, new_obj)
    gen_td_table(len_row, new_obj)
}

//Функция генерации столбцов
function gen_td(len_row, texts_row) {
    let _7_table_id = document.getElementById('_7_table_id');
    for (let n=0; n<len_row; n++) {
        let new_tr = document.createElement('tr');
        _7_table_id.append(new_tr);
        let new_td = document.createElement('td');
        new_td.textContent = texts_row[n];
        new_td.value = (n + 1);
        new_tr.append(new_td);
    }
}

// Генерации результата поиска
let _7_result_table_id = document.getElementById('_7_result_table_id');
function gen_td_table(len_row, texts_row) {
    for (let n=0; n<len_row; n++) {
        let new_tr = document.createElement('tr');
        _7_result_table_id.append(new_tr);
        let new_td = document.createElement('td');
        new_td.textContent = texts_row[n];
        new_td.className = 'new_table work_class_hidden';
        new_td.value = (n + 1);
        new_tr.append(new_td);
    }
}

//Функция вывода поиска
let _7_button_id = document.getElementById('_7_button_id');
_7_button_id.addEventListener('click', _ => {
    let value = _7_input_id.value;
    let list = document.querySelectorAll('#_7_result_table_id > tr > td');
    if (value != '') {
        list.forEach(elem => {
            if (elem.innerText.search(value) == -1) {
                elem.classList.add('work_class_hidden')
            }
            else {
                elem.classList.remove('work_class_hidden')
            }
        })
    }
    else {
        list.forEach(elem => {
            elem.classList.remove('work_class_hidden')
        })
    }
});


//Функция выбора поиска
let index_file_load = '';

let svg_file = ['.docx', '.xlsx', '.jpg', '.png', '.mp3', '.mp4'];
let svg_img = ['word_format_id', 'excell_format_id', 'img_format_id', 'img_format_id', 'mp3_format_id', 'mp4_format_id'];

let none_format_id = document.getElementById('none_format_id');

let _7_table_id = document.getElementById('_7_table_id');
let _7_footer_id = document.getElementById('_7_footer_id');
_7_footer_id.style.display = 'none';
let _7_name_id = document.getElementById('_7_name_id');
let _7_size_id = document.getElementById('_7_size_id');
let _7_date_id = document.getElementById('_7_date_id');
let _7_time_id = document.getElementById('_7_time_id');

_7_table_id.addEventListener('mousedown', (e) => {object_selection(e)});
_7_result_table_id.addEventListener('mousedown', (e) => {object_selection(e)});

function object_selection(e) {
    index_file_load = '';
    document.getElementById('none_format_id').style.display = 'none';
    for (let n=0; n<svg_img.length; n++) {
        document.getElementById(svg_img[n]).style.display = 'none';
    }
    for (let n=0; n<data_work.length; n++) {
        if (e.target.value == (n + 1)) {
            _7_footer_id.style.display = '';
            if (data_work[n][0].split('').length > 20) {
                _7_name_id.textContent = ((data_work[n][0].split('')).slice(0, 18)).join('') + '...';
            }
            else {
                _7_name_id.textContent = data_work[n][0];
            }
            _7_size_id.textContent = data_work[n][1];
            _7_date_id.textContent = data_work[n][2];
            _7_time_id.textContent = data_work[n][3];
            index_file_load = n;
            let work_svg = data_work[n][0].split('');
            let index = work_svg.findLastIndex(el=>el=='.');
            work_svg = work_svg.slice(index);
            work_svg = work_svg.join('');
            for (let n=0; n<svg_file.length; n++) {
                if (work_svg == svg_file[n]) {
                    document.getElementById(svg_img[n]).style.display = '';
                    break
                }
            }
            break
        }
    }
    //Функция скачивания
    let _7_down_load_id = document.getElementById('_7_down_load_id');
    _7_modal_table.style.display = ''; // (Показ модального окна загрузки);
    //POST запрос на сервер
    let xhttp2 = new XMLHttpRequest();
    xhttp2.open('POST', '/7_search_engine_get_blob_obj', true);
    xhttp2.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    xhttp2.send(JSON.stringify({ 'param1': index_file_load }));

    //GET запрос файлов
    fetch('/7_search_engine_get_blob_obj')
        .then(response => {return response.blob()})
        .then(blob => {
            let blobData = new Blob([blob]);
            let blobUrl = URL.createObjectURL(blobData);
            _7_down_load_id.href = blobUrl;
            _7_down_load_id.download = data_work[index_file_load][0];
            _7_modal_table.style.display = 'none'; // (Скрытие модального окна загрузки);
        })
        .catch(error => {
            console.error('Ощибка при получении blob данных: ', error);
        })
};


