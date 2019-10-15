let xhr = new XMLHttpRequest();
let app = "https://script.google.com/macros/s/AKfycbyPyFg12jExguodJy_Iz4D75nLnW-j-gjTn-Q0600uVko6_L4gx/exec"; // ссылка на веб-приложение, опубликованное на основе гугловского скрипта, параметров не требует.
let groups; // сюда запишем результат, разобрав JSON-ответ от GAS.

createTasksTable();

/**
 * Получение данных об успеваемости студентов 
 * и формирование выпадающих списков для доступа к ним. 
 */
function createTasksTable() {
    let output = "";
    xhr.open('GET', app);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        
        if (xhr.status === 200) {
            try {
                let r = JSON.parse(xhr.responseText);
                //console.dir(r);
                tasks = r.additionTasks;
                for (var i = 0; i < tasks.length; i++) {
                    output += "<tr><td>" + tasks[i].title + "</td><td>" + tasks[i].description + "</td><td>" + tasks[i].estimate + "</td></tr>";
                }
            } catch(e) {

            }
        }
        document.getElementById('additionTasks').innerHTML += output; 
    };
    xhr.send();
}