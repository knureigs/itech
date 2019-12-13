// получение элементов таблички для расчета желаемой оценки
let calculatedLb1 = document.getElementById('calculatedLb1');
let calculatedLb2 = document.getElementById('calculatedLb2');
let calculatedLb3 = document.getElementById('calculatedLb3');
let calculatedLb4 = document.getElementById('calculatedLb4');
let calculatedIntime = document.getElementById('calculatedIntime');
let calculatedTest = document.getElementById('calculatedTest');
let calculatedIDZ = document.getElementById('calculatedIDZ');
let calculatedAddition = document.getElementById('calculatedAddition');
let calculatedResult = document.getElementById('calculatedResult');
calculatedLb1.onchange = calculateScore;
calculatedLb2.onchange = calculateScore;
calculatedLb3.onchange = calculateScore;
calculatedLb4.onchange = calculateScore;
calculatedIntime.onchange = calculateScore;
calculatedTest.onchange = calculateScore;
calculatedIDZ.onchange = calculateScore;
calculatedAddition.onchange = calculateScore;
calculateScore();

/**
 * Перерасчет значения итоговой оценки при изменении ее компонентов.
 */
function calculateScore() {
    let lb1 = +calculatedLb1.value;
    let lb2 = +calculatedLb2.value;
    let lb3 = +calculatedLb3.value;
    let lb4 = +calculatedLb4.value;
    let intime = calculatedIntime.checked ? 10 : 0; 
    let test = +calculatedTest.value;
    let idz = +calculatedIDZ.value;
    let addition = +calculatedAddition.value;
    let res = lb1 + lb2 + lb3 + lb4 + intime + test + idz + addition;

    calculatedResult.value = res; 
}

let xhr = new XMLHttpRequest();
let app = "https://script.google.com/macros/s/AKfycbxpw5GljMeuz8u1RIOm3MnykDOmQJPiVhRyMonYALUVEEl838A/exec"; // ссылка на веб-приложение, опубликованное на основе гугловского скрипта к таблице успеваемости. В ответ на гет-запрос отдает данные из таблички, параметров не требует.
let scores; // сюда запишем результат, разобрав JSON-ответ от GAS.

let selectGroup = document.getElementById("groups");
let selectStudent = document.getElementById("students");

createGroupListbox();

/**
 * Получение реальных данных об успеваемости студентов 
 * и формирование выпадающих списков для доступа к ним. 
 */
function createGroupListbox() {
    let requestIndicator = document.getElementById("requestIndicator");
    let scoreSelect = document.getElementById("scoreSelect");

    let output = "";
    xhr.open('GET', app);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 0 || xhr.readyState === 1 || xhr.readyState === 2) {
            return;
        }

        if (xhr.readyState === 3) {
            console.log("Loading...");
            requestIndicator.innerHTML = "Обработка данных...";
        }
        
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Loaded.");
            requestIndicator.innerHTML = "Данные загружены.";
            requestIndicator.style.display = "none";
            scoreSelect.style.visibility = "visible";

            try {
                let r = JSON.parse(xhr.responseText);
                scores = r.groups;
                for (var i = 0; i < scores.length; i++) {
                    output += "<option>" + scores[i].groupName + "</option>";
                }
            } catch(e) {
                console.log("Error.");
                requestIndicator.innerHTML = "Ошибка обработки данных.";
                requestIndicator.style.display = "block";
                scoreSelect.style.visibility = "hidden";
            }
        }
        selectGroup.innerHTML += output;
        selectGroup.onchange = fillStudents;
    };
    xhr.send();
}

/**
 * Заполнение выпадающего списка студентов группы. 
 */
function fillStudents() {
    setResultTable();            
    selectStudent.innerHTML = "<option>Студент</option>"; 
    let students = getStudentsOfGroup(selectGroup.value);
    let output = "";
    for (let i = 0; i < students.length; i++) {
        let studName = students[i].name;
        if(studName !== "") {
            output += "<option>" + studName + "</option>";
        }
    }
    selectStudent.innerHTML += output;
    selectStudent.onchange = fillScore;
}

/**
 * Заполнение таблицы с результатами лабораторных,
 * тестов и других видов работ выбранного студента выбранной группы. 
 */
function fillScore() {
    setResultTable();
    let selectedGroupName = selectGroup.value;
    let students = getStudentsOfGroup(selectedGroupName);
    let selectedStudentName = selectStudent.value;
    for(let stud of students) {
        if(stud.name === selectedStudentName) {
            setResultTable(stud);
            break;
        }
    }            
}

/**
 * Получение всех студентов выбранной группы. 
 */
function getStudentsOfGroup(selectedGroupName) {
    for(let group of scores) {
        if(group.groupName === selectedGroupName) {
            return group.students;
        }
    }
}

/**
 * Заполнение таблицы с результатами лабораторных,
 * тестов и других видов работ для указанного студента. 
 */
function setResultTable(stud) {
    let lb1cell = document.getElementById('realLb1');
    let lb1repository = document.getElementById('lb1repository');
    let lb2cell = document.getElementById('realLb2');
    let lb2repository = document.getElementById('lb2repository');
    let lb3cell = document.getElementById('realLb3');
    let lb3repository = document.getElementById('lb3repository');
    let lb4cell = document.getElementById('realLb4');
    let lb4repository = document.getElementById('lb4repository');
    let intimeCell = document.getElementById('realIntime');
    let testCell = document.getElementById('realTest');
    let idzCell = document.getElementById('realIDZ');
    // let idzRepository = document.getElementById('idzRepository');
    let additionCell = document.getElementById('realAddition');
    // let additionRepository = document.getElementById('additionRepository');
    let resultCell = document.getElementById('realResult');
    
    if(arguments.length === 0) {
        lb1cell.innerHTML = "";
        lb1repository.checked = false;
        lb2cell.innerHTML = "";
        lb2repository.checked = false;
        lb3cell.innerHTML = "";
        lb3repository.checked = false;
        lb4cell.innerHTML = "";
        lb4repository.checked = false;
        intimeCell.innerHTML = "";
        testCell.innerHTML = "";
        idzCell.innerHTML = "";
        // idzRepository.checked = false;
        additionCell.innerHTML = "";
        // additionRepository.checked = false;
        resultCell.innerHTML = "";
        return;
    }
    // lb1repository.checked = stud.lb1repository;
    // lb2repository.checked = stud.lb2repository;
    // lb3repository.checked = stud.lb3repository;
    // lb4repository.checked = stud.lb4repository;
    // idzRepository.checked = stud.idzRepository;
    // additionRepository.checked = stud.additionRepository;
    
    lb1cell.innerHTML = stud.lb1;
    lb2cell.innerHTML = stud.lb2;
    lb3cell.innerHTML = stud.lb3;
    lb4cell.innerHTML = stud.lb4;
    intimeCell.innerHTML = stud.intime;
    testCell.innerHTML = stud.test;
    idzCell.innerHTML = stud.idz;
    additionCell.innerHTML = stud.addition;
    resultCell.innerHTML = stud.total;

    calculatedLb1.value = stud.lb1;
    calculatedLb2.value = stud.lb2;
    calculatedLb3.value = stud.lb3;
    calculatedLb4.value = stud.lb4;
    calculatedIntime.checked = stud.intime === 0 ? false : true;
    calculatedTest.value = stud.test;
    calculatedIDZ.value = stud.idz;
    calculatedAddition.value = stud.addition;
    calculateScore();
}