"use strict"

// Запрет перезагрузки функции open_account()
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}

// Фильтр файлов по расширению у input file
let fileElement = document.getElementById("_5_input");
let _5_switches = document.querySelector('._5_switches');
let radio_button_1 = document.getElementById('_5_rad_1');
let radio_button_2 = document.getElementById('_5_rad_2');
let radio_button_3 = document.getElementById('_5_rad_3');
let radio_button_4 = document.getElementById('_5_rad_4');
let radio_button_5 = document.getElementById('_5_rad_5');
let radio_button_6 = document.getElementById('_5_rad_6');
let radio_button_7 = document.getElementById('_5_rad_7');

let format = ''
_5_switches.addEventListener('click', _ => {
    if (radio_button_1.checked == true) {format = 'jpg'; $('#_5_input').attr('accept', `.${format}`)};
    if (radio_button_2.checked == true) {format = 'png'; $('#_5_input').attr('accept', `.${format}`)};
    if (radio_button_3.checked == true) {format = 'xlsx'; $('#_5_input').attr('accept', `.${format}`)};
    if (radio_button_4.checked == true) {format = 'docx'; $('#_5_input').attr('accept', `.${format}`)};
    if (radio_button_5.checked == true) {format = 'mp3'; $('#_5_input').attr('accept', `.${format}`)};
    if (radio_button_6.checked == true) {format = 'mp4'; $('#_5_input').attr('accept', `.${format}`)};
    if (radio_button_7.checked == true) {format = ''; $('#_5_input').attr('accept', "")};
})


// Вывод изображения и Фильтр файлов по расширению у input file
function file_load(e) {
    // Предварительный запись файла (для отображения фото)
    let new_file_load = e.files[0];

    // Контроль формата
    if (radio_button_7.checked == false) {
        let fileExtension = "";
        if (fileElement.value.lastIndexOf(".") > 0) {
            fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.length);
            console.log(fileExtension);
        }
        if (fileExtension != format) {
            _5_input.value = '';
        }
    }

    // Вывод изображения
    let reader = new FileReader();
    reader.readAsDataURL(new_file_load);
    reader.onload = function () {
        let _5_img_ = document.getElementById('_5_img_');
        _5_img_.src = reader.result;
    }
};


