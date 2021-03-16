let xhr = new XMLHttpRequest(); // фетч работает пока не везде.
let app = "https://script.google.com/macros/s/AKfycbzUElGeDkGB82YeyaxXr1ZvDAuss7fVFJjCg8PGj5uBC4wmgF7DnxK0lA/exec?mode=additional"; // ссылка на веб-приложение, опубликованное на основе гугловского скрипта с параметром для получения только данных о дополнительных заданиях.

let requestIndicator = document.getElementById("requestIndicator");     // состояние запроса.

xhr.open('GET', app);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 0 || xhr.readyState === 1 || xhr.readyState === 2) {
        return;
    }
    if (xhr.readyState === 3) {
        //console.log("Loading...");
        requestIndicator.innerHTML = "Обработка данных... Ожидайте.";
    }
    
    if (xhr.readyState === 4 && xhr.status === 200) {
        //console.log("Loaded.");
        requestIndicator.innerHTML = "Данные загружены.";
        requestIndicator.style.display = "none";
        try {
            localStorage.setItem("additionalTasks", xhr.responseText);// сохранение данных, полученных из запроса
            let response = JSON.parse(xhr.responseText);
            fillTasksData(response.additional);
        } catch(e) {
            console.log("Error. " + e);
            console.log(xhr.responseText);
            requestIndicator.innerHTML = "Ошибка обработки данных.";
            requestIndicator.style.display = "block";
        }
    }    
};

xhr.onerror = function () {
    requestIndicator.innerHTML = "<h3 style = \"color: red\"> Ошибка сервера или соединения.</h3><p style = \"color: red\">Будут загружены ранее сохраненные локальные данные... Ожидайте.</p>";
    requestIndicator.style.display = "block";
    try {
        let response = JSON.parse(localStorage.getItem("additionalTasks")); //получаем ранее сохраненные данные
        if (response) {
            fillTasksData(response.additional);
            requestIndicator.innerHTML = "<h3 style = \"color: red\"> Ошибка сервера или соединения.</h3><p style = \"color: red\">Поэтому здесь выведены ранее сохраненные данные, обязательно уточните актуальные условия заинтересовавшего вас задания у преподавателя!</p>";
            requestIndicator.style.display = "block";
        } else {
            requestIndicator.innerHTML = "<h3 style = \"color: red\"> Ошибка сервера или соединения.</h3><p style = \"color: red\">Ранее сохраненные данные не обнаружены :( Попробуйте, пожалуйста, обновить страницу позже.</p>";
            requestIndicator.style.display = "block";
        }
    } catch (e) {
        console.log("Error. " + e);
        console.log(xhr.responseText);
        requestIndicator.innerHTML = "Ошибка обработки данных.";
        requestIndicator.style.display = "block";
    }
};

xhr.send();

/**
 * Заполнение элементов страницы полученными данными о дополнительных заданиях. 
 */
function fillTasksData(tasksData) {
    let descriptionElement = document.getElementById("description");        // блок с описанием этого вида работы.
    descriptionElement.innerHTML = tasksData.description;
    
    let additionalTasksElement = document.getElementById("additionalTasks");    // таблица с условиями заданий.
    let output = "";
    let tasks = tasksData.taskList;
    for (let i = 0; i < tasks.length; i++) {
        output += "<tr class=\"task-header\">";
        output += "<td>" + tasks[i].title + "</td>";
        output += "<th>" + tasks[i].estimate + "</th>";
        output += "</tr>";
        output += "<tr><td colspan=\"2\" class=\"accordion task-description\"><input type=\"checkbox\" id=\"accordion-" + i + "\"><label for=\"accordion-" + i + "\">Описание</label><div class=\"content\">"  + tasks[i].description + "</div></td></tr>";
    }
    additionalTasksElement.innerHTML = output; 
}