"use strict"

// Запрет перезагрузки функции open_account()
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

// Вывод таблицы
addEventListener('DOMContentLoaded', _ => {
    // обработки данных из Python
    let table_row_name = document.getElementById('table_row_name');
    let table_row_size = document.getElementById('table_row_size');
    let table_row_date = document.getElementById('table_row_date');
    let table_row_time = document.getElementById('table_row_time');

    //Колонка имен
    table_row_name = table_row_name.textContent;
    table_row_name = table_row_name.split('');
    table_row_name = table_row_name.slice(1, -1);
    table_row_name = table_row_name.join('');
    table_row_name = table_row_name.split(')(');
    for (let n = 0; n < table_row_name.length; n++) {
        table_row_name[n] = table_row_name[n].replace("',", '')
        table_row_name[n] = table_row_name[n].replace("'", '')
    }
    console.log(table_row_name);

    //Колонка объема памяти файла
    table_row_size = table_row_size.textContent;
    table_row_size = table_row_size.split('');
    table_row_size = table_row_size.slice(1, -1);
    table_row_size = table_row_size.join('');
    table_row_size = table_row_size.split(')(');
    for (let n = 0; n < table_row_size.length; n++) {
        table_row_size[n] = table_row_size[n].replace("',", '')
        table_row_size[n] = table_row_size[n].replace("'", '')
    }

    console.log(table_row_size);
    //Колонка Даты загрузки
    table_row_date = table_row_date.textContent;
    table_row_date = table_row_date.split('');
    table_row_date = table_row_date.slice(1, -1);
    table_row_date = table_row_date.join('');
    table_row_date = table_row_date.split(')(');
    for (let n = 0; n < table_row_date.length; n++) {
        table_row_date[n] = table_row_date[n].replace("',", '')
        table_row_date[n] = table_row_date[n].replace("'", '')
    }
    console.log(table_row_date);
    //Колонка времени загрузки
    table_row_time = table_row_time.textContent;
    table_row_time = table_row_time.split('');
    table_row_time = table_row_time.slice(1, -1);
    table_row_time = table_row_time.join('');
    table_row_time = table_row_time.split(')(');
    for (let n = 0; n < table_row_time.length; n++) {
        table_row_time[n] = table_row_time[n].replace("',", '')
        table_row_time[n] = table_row_time[n].replace("'", '')
    }
    console.log(table_row_time);

    // Генерация строк
    let table_row_num = document.getElementById('table_row_num').textContent;
    table_row_num = Number(table_row_num);
    let _6_thead_id = document.getElementById('_6_thead_id');
    for (let n = 0; n < table_row_num; n++) {
        let new_tr = document.createElement('tr');
        _6_thead_id.append(new_tr);
        for (let N = 0; N < 6; N++) {
            let new_td = document.createElement('td');
            if (N == 0) { new_td.textContent = n + 1 };
            if (N == 1) {
                if (table_row_name[n].split('').length > 28) {
                    new_td.textContent = (table_row_name[n].split('').slice(0, 25)).join('') + '...';
                }
                else {
                    new_td.textContent = table_row_name[n];
                }
            };
            if (N == 2) { new_td.textContent = table_row_size[n] };
            if (N == 3) { new_td.textContent = table_row_date[n] };
            if (N == 4) { new_td.textContent = table_row_time[n] };
            if (N == 5) { 
                let new_button = document.createElement('button');
                new_button.textContent = 'скачать';
                new_button.value = `Val_${n + 1}`;
                new_td.append(new_button); 
            }
            new_tr.append(new_td)
        };
    };
}) 

// Функция запросов в Python
let table_row_num = document.getElementById('table_row_num').textContent;
table_row_num = Number(table_row_num);
let _6_input_id = document.getElementById('_6_input_id');
let _6_discharge_file = document.querySelector('._6_discharge_file');

addEventListener('mousedown', (e) => {
    if (e.target.value == 'Button_1_val') {_6_input_id.value = 0; discharge_file_start()};
    if (e.target.value == 'Button_2_val') {_6_input_id.value = 'A'; discharge_file_start()};
    for (let n=0; n<table_row_num; n++) {
        if (e.target.value == `Val_${n+1}`) {_6_input_id.value = n+1; discharge_file_start()};
    }
})

function discharge_file_start() {
    let _6_form = document.getElementById('_6_form');
    _6_form.method="post";
    _6_form.submit();
    return false
}