let xhr = new XMLHttpRequest();
let app = "https://script.google.com/a/nure.ua/macros/s/AKfycbw0v8m5HVeo_gW88cNHTgx18UG9l2oxB51q1Fo8GA/exec"; // ссылка на веб-приложение, опубликованное на основе гугловского скрипта, параметров не требует.

createTimetable();

/**
 * Получение данных об успеваемости студентов 
 * и формирование выпадающих списков для доступа к ним. 
 */
function createTimetable() {
    let requestIndicator = document.getElementById("requestIndicator");
    let descriptionElememt = document.getElementById("description");
    let timetableElememt = document.getElementById("timetable");

    let output = "";
    xhr.open('GET', app);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 0 || xhr.readyState === 1 || xhr.readyState === 2) {
            return;
        }

        if (xhr.readyState === 3) {
            //console.log("Loading...");
            requestIndicator.innerHTML = "Обработка данных...";
        }
        
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log("Loaded.");
            requestIndicator.innerHTML = "Данные загружены.";
            requestIndicator.style.display = "none";

            try {
                let r = JSON.parse(xhr.responseText);
                //console.dir(r);
                descriptionElememt.innerHTML = r.visiting.description;
                let timetable = r.visiting.timetable;
                for (var i = 0; i < timetable.length; i++) {
                    if(timetable[i].visitingDate=="") continue;

                    output += "<tr><td>" + timetable[i].visitingDate + "</td><td>" + timetable[i].visitingWeekDay + "</td><td>" + timetable[i].visitingBeginTime + "</td><td>" + timetable[i].visitingEndTime + "</td><td>" + timetable[i].comment + "</td></tr>";
                }
                timetableElememt.innerHTML += output; 
            } catch(e) {
                console.log("Error. " + e);
                console.log(xhr.responseText);
                requestIndicator.innerHTML = "Ошибка обработки данных.";
                requestIndicator.style.display = "block";
            }
        }
    };
    xhr.send();
}