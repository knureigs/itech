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
    // xhr.open('GET', app);
    xhr.overrideMimeType("application/json");
    xhr.open('GET', "./response.json");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        
        if (xhr.status === 200) {
            try {
                let response = JSON.parse(xhr.responseText);
                //console.dir(response);
                //saveText(xhr.responseText, "response.json" );
                tasks = response.additionTasks;
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

function saveText(text, filename){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    document.body.appendChild(a); a.setAttribute("style", "display: none;");
    a.click();
    // console.dir(a);
    a.remove();
}