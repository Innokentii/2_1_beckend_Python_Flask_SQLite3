'use strict' // (Установка Java Script на строгий язык синтаксиса);

//===================================================================================================//
//                                  Импортированные файлы и модули                                   //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

//===================================================================================================//
//                                       Глобальные переменные                                       //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

let _10_table_id = document.getElementById('_10_table_id'); // (Блок для генерации погодных данных за день);
let _10_button_id = document.getElementById('_10_button_id'); // (Кнопка вызова погодных данных на 64 часа);
let _10_lon_id = document.getElementById('_10_lon_id'); // (<input> ввода долготы);
let _10_lat_id = document.getElementById('_10_lat_id'); // (<input> ввода ширины);
let _10_modal_table = document.getElementById('_10_modal_table'); // (Модальное окно загрузки);
let _10_select_city_id = document.getElementById('_10_select_city_id'); // (Список городов);

//===================================================================================================//
//                                 Одноразовые функции и события                                     //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

_10_modal_table.style.display = 'none'; // (Скрытие модального окна загрузки);

//===================================================================================================//
//                      Многоразовые функции и события вызовов функций                               //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

_10_lon_id.onkeydown = (e) => {
    // Функция ввода долготы;
    entering_numbers(e);
    if (Number(_10_lon_id.value + e.key)>180) {e.preventDefault()};
}; 

_10_lat_id.onkeydown = (e) => {
    // Функция ввода ширины;
    entering_numbers(e);
    if (Number(_10_lat_id.value + e.key)>90) {e.preventDefault()};
}; 

//Использован сервисAPI: "https://publicapis.io/7-timer-api";
_10_button_id.onclick = () => {weather_challenge()};
function weather_challenge() {
    // Функция вызова погоды на 64 часа;

    _10_modal_table.style.display = ''; // (Вскрытие модального окна загрузки);

    // Параметры запроса
    const params = {
        lon: _10_lon_id.value, // Долгота;
        lat: _10_lat_id.value, // Широта;
        product: "civil", // Выберите желаемый продукт (например, 'civil', 'nwp' и т. д.)
        output: "json", // Выберите формат вывода (например, 'json', 'xml' и т. д.)
    };

    // Формируем URL-запрос
    const url = `http://www.7timer.info/bin/api.pl?${new URLSearchParams(params)}`;

    // Выполняем GET-запрос
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка при выполнении запроса");
            };
            return response.json();
        })
        .then((data) => {
            _10_modal_table.style.display = 'none'; // (Cкрытие модального окна загрузки);
            let new_date = new Date();
            new_date.setHours(3);
            let new_day = new_date.getDate();
            for (let n=0; n<data['dataseries'].length; n++) {
                try {
                    document.getElementById(`td_${n}_1_id`).remove();
                    document.getElementById(`td_${n}_2_id`).remove();
                    document.getElementById(`td_${n}_3_id`).remove();
                    document.getElementById(`td_${n}_4_id`).remove();
                    document.getElementById(`td_${n}_5_id`).remove();
                    document.getElementById(`td_${n}_6_id`).remove();
                    document.getElementById(`td_${n}_7_id`).remove();
                }
                catch(error) {console.log(error)}
            }
            for (let n=0; n<data['dataseries'].length; n++) {
                _10_table_id.insertAdjacentHTML('beforeend', `<tr><td id='td_${n}_1_id'></td><td id='td_${n}_2_id'></td><td id='td_${n}_3_id'></td><td id='td_${n}_4_id'></td><td id='td_${n}_5_id'></td><td id='td_${n}_6_id'></td><td id='td_${n}_7_id'></td></tr>`);
                if (Number(new_day)<10) {
                    new_day = '0' + String(new_day);
                };
                document.getElementById(`td_${n}_1_id`).innerText = `${new_date.getFullYear()}:${new_date.getMonth()}:${new_day}`;
                let new_hours = new_date.getHours();
                if (Number(new_hours) == 24) {
                    new_hours = '00';
                }
                else {
                    if (Number(new_hours)<10) {
                        new_hours = '0' + String(new_hours);
                    };
                }

                document.getElementById(`td_${n}_2_id`).innerText = `${new_hours}:00`;
                document.getElementById(`td_${n}_3_id`).innerText = data['dataseries'][n]['temp2m'];
                document.getElementById(`td_${n}_4_id`).innerText = data['dataseries'][n]['weather'];
                document.getElementById(`td_${n}_5_id`).innerText = data['dataseries'][n]['rh2m'];
                document.getElementById(`td_${n}_6_id`).innerText = data['dataseries'][n]['wind10m']['speed'];
                document.getElementById(`td_${n}_7_id`).innerText = data['dataseries'][n]['wind10m']['direction'];
                new_date.setHours(new_date.getHours() + 3);
                new_day = new_date.toLocaleString();
                new_day = new_date.getDate(); 
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

_10_select_city_id.onchange = () => {
    if (_10_select_city_id.value == 'Алматы') {_10_lon_id.value = '76.54'; _10_lat_id.value = '43.54';};
    if (_10_select_city_id.value == 'Вашингтон') {_10_lon_id.value = '77.0364'; _10_lat_id.value = '38.8951';};
    if (_10_select_city_id.value == 'Якутск') {_10_lon_id.value = '129.735'; _10_lat_id.value = '62.035';};
    if (_10_select_city_id.value == 'Сеул') {_10_lon_id.value = '126.978'; _10_lat_id.value = ' 37.566';};
};

//===================================================================================================//
//                             Функции вызываемые другими функциями                                  //
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//

function entering_numbers(e) {
    // Функция запрета на ввод отличные от цыфр символы;
    if (['0','1','2','3','4','5','6','7','8','9', '.','Backspace'].includes(e.key)==false) {
        e.preventDefault();
    }
};

