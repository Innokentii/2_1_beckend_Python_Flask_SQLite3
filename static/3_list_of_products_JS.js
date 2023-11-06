"use strict"

//Генерация таблицы с excell
let append_td = document.getElementById('list_of_products_thead_id');
let _3_exc_f_ = document.getElementById('_3_exc_f_id');
_3_exc_f_ = _3_exc_f_.textContent;
_3_exc_f_ = _3_exc_f_.split('][');
for (let n = 0; n < _3_exc_f_.length; n++) {
    _3_exc_f_[n] = _3_exc_f_[n].split(';|; ');
};
console.log(_3_exc_f_);
for (let N = 0; N < _3_exc_f_.length; N++) {
    let new_tr = document.createElement('tr');
    append_td.append(new_tr);
    for (let n = 0; n < 9; n++) {
        let new_td = document.createElement('td');
        new_td.contentEditable = true;
        if (_3_exc_f_[N][n] == "None" || _3_exc_f_[N][n] == " 0") {
            new_td.textContent = '';
        }
        else {
            new_td.textContent = _3_exc_f_[N][n];
        }
        new_tr.append(new_td);
    }
};

//Передача обратной информации в Python
function data_transmission_python() {
    let _3_exc_py_ = document.getElementById('_3_exc_py_id');
    let count_tr = document.querySelectorAll('#list_of_products_thead_id > tr').length - 1;

    let data_py = '';
    for (let N=0; N<count_tr; N++) {
        let data_py_row = '';
        for (let n=0; n<9; n++) {
            let tr = document.querySelector(`#list_of_products_thead_id > tr:nth-child(${N + 2}) > td:nth-child(${n + 1})`);
            if (n != 8) {
                data_py_row += tr.textContent + ';|;';
            }
            else {
                data_py_row += tr.textContent
            }
        }
        data_py += '[' + data_py_row + ']';
    };
    _3_exc_py_.value = data_py;
};

//Импорт в Excell файл
function export_excell_file() {
    var table2excell = new Table2Excel();
    table2excell.export(document.querySelectorAll('#data'))
}

//Импорт в PDF файл
function export_PDF_file() {
    $('#data_pdf').printThis();
}