"use strict"

//_____Генерация кнопок_____
let array_hreft = ['/1_iframe_ban', '/1_iframe_ban_check',
                '/2_questionnaire', '/3_list_of_products',
                '/4_registration', '/5_load_file',
                '/6_discharge_file', '/7_search_engine',
                '/8_audio_video', '/9_video',
                '/10_weather_forecast'];
 // Массив для данных вызова страницы сайта
let array_text = ['1_Запрет использования iframe в сайте',
                '1.2_Проверка запрета на использование iframe',
                '2_Викторина',
                '3_Работа с Excell (чтение данных с файла excel, сохранение, экспорт в PDF и excell)',
                '4_Регистрация (логин и пароль)',
                '5_загрузка файла (pdf, word, фото, музыка, видео) на базу данных',
                '6_скачивание файла (pdf, word, фото, музыка, видео) на рабочий компьютер',
                '7_Статичный и динамический поиск данных SQL',
                '8_Запуск аудио в сайте',
                '9_Запуск видео в сайте',
                '10_API прогноз погоды'
                ];
let array_bottom = array_hreft.length; // Количество кнопок
let footer_id = document.getElementById('footer_id'); //
for (let n = 0; n < array_bottom; n++) {
    let new_a = document.createElement('a'); //
    new_a.href = array_hreft[n];  //
    footer_id.append(new_a); //
    let new_div = document.createElement('div'); //
    new_div.textContent = array_text[n]; //
    new_a.append(new_div); //
};

//________________________________________________________
