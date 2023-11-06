'use strict' // (Установка Java Script на строгий язык синтаксиса);

//===================================================================================================//
//                                  Импортированные файлы и модули                                   //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

//===================================================================================================//
//                                       Глобальные переменные                                       //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

let _9_start_video_id = document.getElementById('_9_start_video_id'); // (Кнопка IMG старта);
let _9_stop_video_id = document.getElementById('_9_stop_video_id'); // (Кнопка IMG остановки);
let _9_work_video_id = document.getElementById('_9_work_video_id'); // (Основное видео VIDEO для просмотра);
let _9_big_video_id = document.getElementById('_9_big_video_id'); // (Кнопка IMG для выведения видео на весь экран);
let _9_low_video_id = document.getElementById('_9_low_video_id'); // (Кнопка IMG для выведения видео из полноэкранного режима);
let _9_screen_id = document.getElementById('_9_screen_id'); // (Экран основного видео для просмотров);
let _9_controller_video_id = document.getElementById('_9_controller_video_id'); // (Контроллер основного видео);
let _9_load_video_id = document.getElementById('_9_load_video_id'); // (Блок загрузки);
let _9_load_video_work_id = document.getElementById('_9_load_video_work_id'); // (Индикатор загрузки);
let screenHeight = window.screen.height; // (Высота рабочего монитора);
let screenWidth = window.screen.width; // (Ширина рабочего монитора);
let _9_scroll_video_id = document.getElementById('_9_scroll_video_id'); // Блок для генерации загружаемых с БД видео файлов;
let count_gen_row_video = 0; // Счет подсчет клонирования строк видео;
let _9_templare_gen_video_id = document.getElementById('_9_templare_gen_video_id'); // Темплейт для клонирования (необходим для генерации загружаемыз с БД видео файлов);
let new_video = _9_templare_gen_video_id.content.querySelector('div > div > video'); // Переменная для присвоения src к тегу <video>;
let new_video_name = _9_templare_gen_video_id.content.querySelector('div > div > span'); // Переменная для присвоения аименования к тегу <span>;
let new_div_clone = _9_templare_gen_video_id.content.querySelector('div');
let time_hidden_controller = 0; // Счет времени до момента скрытия контроллера;
let _9_modal_table = document.getElementById('_9_modal_table'); // (модальное окно загрузки);

//===================================================================================================//
//                                 Одноразовые функции и события                                     //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

_9_modal_table.style.display = 'none'; // (Скрытие модального окна загрузки);

_9_stop_video_id.style.display = 'none'; // (сокрытие кнопки остановки при загрузке сайта);

_9_low_video_id.style.display = 'none'; // (Сокрытие кнопки для выведения видео из полноэкранного режима);

document.addEventListener('DOMContentLoaded', _ => {
    // ajax - "GET" запрос для загрузки имен видео с базы данных;
    let xhr = new XMLHttpRequest(); // XMLHttp метод для ajax "GET" запроса;
    xhr.open('GET', '/9_video_get_1_file', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText); // Список имен видеофайлов в JSON формате

            function x_f(data) {
                // Функция генерации списка видео для выбора;

                _9_modal_table.style.display = ''; // (Показ модального окна загрузки);
                // ajax - "POST" запрос для загрузки видео с базы данных;
                let xhr2 = new XMLHttpRequest(); // XMLHttp метод для ajax "POST" запроса;
                xhr2.open('POST', '/9_video_get_post_1_file', true);
                xhr2.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
                xhr2.send(JSON.stringify({ 'param': count_gen_row_video }));

                // fetch - "GET" запрос для загрузки видео с базы данных;
                fetch('/9_video_get_post_1_file')
                    .then(response => { return response.blob()} )
                    .then(blob => {
                        _9_modal_table.style.display = 'none'; // (Скрытие модального окна загрузки);
                        let blob_url = new Blob([blob]);
                        let new_url = URL.createObjectURL(blob_url);
                        if (data[count_gen_row_video].split('').length > 30) {
                            new_video_name.innerText = data[count_gen_row_video].split('').slice(0, 27).join('') + '...';
                        }
                        else {
                            new_video_name.innerText = data[count_gen_row_video];
                        };
                        new_video.src = new_url;
                        new_video.id = `_9_video_${count_gen_row_video}_id`
                        new_div_clone.id = `_9_temp_cl_${count_gen_row_video}_id`;
                        let clone_templ = _9_templare_gen_video_id.content.cloneNode(true);
                        _9_scroll_video_id.append(clone_templ);
                        if (count_gen_row_video == 0) {_9_work_video_id.src = new_url}
                        count_gen_row_video += 1;
                        if (count_gen_row_video<data.length) {x_f(data)};
                    })
                    .catch(error => {
                        console.error('Ощибка при получении blob данных: ', error)
                    });
            };
            x_f(data); // Вызов функции x_f()
        }
    }
    xhr.send();
});

_9_controller_video_id.style.display = 'none'; // (Скрытие конроллера);

//===================================================================================================//
//                      Многоразовые функции и события вызовов функций                               //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

_9_screen_id.onmousedown = (e) => {
    // Функция запуска и остановки видео;
    if (e.target == _9_work_video_id) {
        if (_9_work_video_id.paused) {
            _9_work_video_id.play(); // (Запуск видео)
        }
        else {
            _9_work_video_id.pause(); // (Остановка видео)
        }
    }
}

_9_start_video_id.onmousedown = () => {
    // Функция запуска видео;
    _9_work_video_id.play(); // (Запуск видео)
    _9_start_video_id.style.display = 'none'; // (Сокрытие кнопки старт);
    _9_stop_video_id.style.display = ''; // (Вскрытие кнопки стоп);
};

_9_stop_video_id.onmousedown = () => {
    // Функция остановки видео;
    _9_work_video_id.pause(); // (Остановка видео)
    _9_start_video_id.style.display = ''; // (Вскрытие кнопки старт);
    _9_stop_video_id.style.display = 'none'; // (Скрытие кнопки стоп);
};

_9_big_video_id.onmousedown = () => {
    // Функция полноэкранного режима основного видео;
    if (_9_screen_id.requestFullscreen) {
        _9_screen_id.requestFullscreen();
    } else if (_9_screen_id.mozRequestFullScreen) {
        _9_screen_id.mozRequestFullScreen();
    } else if (_9_screen_id.webkitRequestFullscreen) {
        _9_screen_id.webkitRequestFullscreen();
    }
    _9_screen_id.style.display = 'flex'; // (Введение flex расположения блоков для смену позиции в нижнюю часть экрана контроллера);
    _9_controller_video_id.style.position = 'absolute'; // (Введение позиции контроллера на абсолют для смену позиции в нижнюю часть экрана);
    _9_controller_video_id.style.width = `${screenWidth}px`; // (Увеличение ширины блока контроллера видео на ширину экрана);
    _9_load_video_id.style.width = '90%'; // (Увеличение ширины индикатора загрузки);
    _9_big_video_id.style.display = 'none'; // (Сокрытие кнопки для выведения видео на весь экран);
    _9_low_video_id.style.display = ''; // (Вскрытие кнопки для выведения видео из полноэкранного режима);
    _9_controller_video_id.style.top = `${screenHeight - 30}px`; // (Спуск контроллера в нижнюю часть экрана);
    _9_work_video_id.width = `${screenWidth}`; // (Увеличение ширины видео на весь экран);
};

// События вызова функции [exit_the_screen_f()] необходимые для перехвата действия document "Escape";
document.addEventListener('fullscreenchange', _ => { exit_the_screen_f() }); // (Событи запуска функции exit_the_screen_f() - "полноэкранное изменение");
document.addEventListener('webkitfullscreenchange', _ => { exit_the_screen_f() }); // (Событи запуска функции exit_the_screen_f() - "webkit полноэкранное изменение");
document.addEventListener('mozfullscreenchange', _ => { exit_the_screen_f() }); // (Событи запуска функции exit_the_screen_f() - "moz полноэкранное изменение");
document.addEventListener('MSFullscreenChange', _ => { exit_the_screen_f() }); // (Событи запуска функции exit_the_screen_f() - "MS полноэкранное изменение");

_9_low_video_id.onmousedown = () => {
    // Функция вызова по "клику" функций = [manual_exit_the_screen_f(), Returning_Controller_values_f()];
    manual_exit_the_screen_f(); // (Вызов функции: "Функция выведения основного видео из режима полноэкранного режима");
    Returning_Controller_values_f(); // (Вызов функции: "Функция возврата параметров блока контроллера и прилагающий к нему тегов");
};

_9_scroll_video_id.onmousedown = (e) => {
    // Функция выбора видео из блока с id = "_9_templare_gen_video_id";
    let target = e.target;
    let parent = target.parentNode.parentNode;
    for (let n=0; n<count_gen_row_video; n++) {
        if (parent.id == `_9_temp_cl_${n}_id`) {
            let target_video = document.getElementById(`_9_video_${n}_id`);
            _9_work_video_id.src = target_video.src;
            _9_work_video_id.volume = 0.5;
            if (_9_start_video_id.style.display == 'none') {
                _9_work_video_id.play();
            }
        }
    }
}

setInterval(() => {
    // Функция загрузки видео;
    _9_load_video_work_id.style.width = `${(_9_work_video_id.currentTime / _9_work_video_id.duration) * _9_load_video_id.offsetWidth - 3}px`;
}, 200);

_9_load_video_id.onmousedown = (e) => {
    let max_load = _9_load_video_id.offsetWidth;
    let current_load = e.offsetX;
    _9_work_video_id.currentTime = _9_work_video_id.duration * ((current_load / max_load));
};

_9_screen_id.onmousemove = () => {
    // Функция вскрытия блока контроллера;
    _9_controller_video_id.style.display = '';
    time_hidden_controller = 20;
    }

setInterval(() => {
    // Функция счета до скрытия контроллера;
    if (time_hidden_controller != 0) {time_hidden_controller -=1};
    if(time_hidden_controller == 0) {_9_controller_video_id.style.display = 'none';}
}, 100);



//===================================================================================================//
//                             Функции вызываемые другими функциями                                  //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

function exit_the_screen_f() {
    // Функция вызова по "Escape" функции = [Returning_Controller_values_f()];
    // (Данная функция нужна для перехвата "Escape");
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        // Условие для перехвата действия document "Escape";
        Returning_Controller_values_f() // (Запуск функции: "Функция возврата параметров блока контроллера и прилагающий к нему тегов");
    }
};

function manual_exit_the_screen_f() {
    // Функция выведения основного видео из режима полноэкранного режима;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};

function Returning_Controller_values_f() {
    // Функция возврата параметров блока контроллера и прилагающий к нему тегов;
    _9_screen_id.style.display = ''; // (Выведение flex расположения блоков);
    _9_controller_video_id.style.position = ''; // (Выведение позиции контроллера);
    _9_controller_video_id.style.width = ''; // (Возврат ширины блока контроллера);
    _9_load_video_id.style.width = ''; // (Возврат ширины индикатора загрузки);
    _9_big_video_id.style.display = ''; // (Вскрытие кнопки для выведения видео на весь экран);
    _9_low_video_id.style.display = 'none'; // (Сокрытие кнопки для выведения видео из полноэкранного режима);
    _9_controller_video_id.style.top = ''; // (Спуск контроллера в нижнюю часть экрана);
    _9_work_video_id.width = '600'; // (Возврат ширины видео на весь экран);
};