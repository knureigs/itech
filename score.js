let xhr = new XMLHttpRequest();
let app = "https://script.google.com/macros/s/AKfycbxpw5GljMeuz8u1RIOm3MnykDOmQJPiVhRyMonYALUVEEl838A/exec"; // ссылка на веб-приложение, опубликованное на основе гугловского скрипта к таблице успеваемости. В ответ на гет-запрос отдает данные из таблички, параметров не требует.
let groups; // сюда запишем результат, разобрав JSON-ответ от GAS.

createGroupListbox();

/**
 * Получение данных об успеваемости студентов 
 * и формирование выпадающих списков для доступа к ним. 
 */
function createGroupListbox() {
    let output = "";
    xhr.open('GET', app);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        
        if (xhr.status === 200) {
            try {
                let r = JSON.parse(xhr.responseText);
                groups = r.groups;
                for (var i = 0; i < groups.length; i++) {
                    output += "<option>" + groups[i].groupName + "</option>";
                }
            } catch(e) {

            }
        }
        document.getElementById('groups').innerHTML += output; 
    };
    xhr.send();
}

/**
 * Заполнение таблицы с результатами лабораторных,
 * тестов и других видов работ для указанного студента. 
 */
function setResultTable(stud) {
    let lb1cell = document.getElementById('lb1');
    let lb2cell = document.getElementById('lb2');
    let lb3cell = document.getElementById('lb3');
    let lb4cell = document.getElementById('lb4');
    let intimeCell = document.getElementById('intime');
    let testCell = document.getElementById('test');
    let idzCell = document.getElementById('idz');
    let additionCell = document.getElementById('addition');
    let resultCell = document.getElementById('result');
    
    if(arguments.length === 0) {
        lb1cell.innerHTML = "";
        lb2cell.innerHTML = "";
        lb3cell.innerHTML = "";
        lb4cell.innerHTML = "";
        intimeCell.innerHTML = "";
        testCell.innerHTML = "";
        idzCell.innerHTML = "";
        additionCell.innerHTML = "";
        resultCell.innerHTML = "";
        return;
    }
    lb1cell.innerHTML = stud.lb1;
    lb2cell.innerHTML = stud.lb2;
    lb3cell.innerHTML = stud.lb3;
    lb4cell.innerHTML = stud.lb4;
    intimeCell.innerHTML = stud.intime;
    testCell.innerHTML = stud.test;
    idzCell.innerHTML = stud.idz;
    additionCell.innerHTML = stud.addition;
    resultCell.innerHTML = stud.total;
}

/**
 * Заполнение таблицы с результатами лабораторных,
 * тестов и других видов работ выбранного студента выбранной группы. 
 */
function fillScore() {
    setResultTable();
    let selectedGroupName = document.getElementById("groups").value;
    let students = getStudentsOfGroup(selectedGroupName);
    let selectedStudentName = document.getElementById("students").value;
    for(let stud of students) {
        if(stud.name === selectedStudentName) {
            setResultTable(stud);
            break;
        }
    }            
}

/**
 * Заполнение выпадающего списка студентов группы. 
 */
function fillStudents() {
    setResultTable();            
    document.getElementById('students').innerHTML = "<option>Студент</option>"; 
    let selectedGroupName = document.getElementById("groups").value;
    let students = getStudentsOfGroup(selectedGroupName);
    let output = "";
    for (let i = 0; i < students.length; i++) {
        let studName = students[i].name;
        if(studName !== "") {
            output += "<option>" + studName + "</option>";
        }
    }
    document.getElementById('students').innerHTML += output;
}

/**
 * Получение всех студентов выбранной группы. 
 */
function getStudentsOfGroup(selectedGroupName) {
    for(let group of groups) {
        if(group.groupName === selectedGroupName) {
            return group.students;
        }
    }
}