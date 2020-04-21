/**
* Класс для управления калькулятором оценки студента.
*/
class GradeCalculator {
    constructor() {
        // получение элементов таблички для расчета желаемой оценки
        this.calculatedLb1 = document.getElementById('calculatedLb1');
        this.calculatedLb2 = document.getElementById('calculatedLb2');
        this.calculatedLb3 = document.getElementById('calculatedLb3');
        this.calculatedLb4 = document.getElementById('calculatedLb4');
        this.calculatedIntime = document.getElementById('calculatedIntime');
        this.calculatedTest = document.getElementById('calculatedTest');
        this.calculatedIDZ = document.getElementById('calculatedIDZ');
        this.calculatedAddition = document.getElementById('calculatedAddition');
        
        this.calculatedLb1.onchange = this.calculateScore;
        this.calculatedLb2.onchange = this.calculateScore;
        this.calculatedLb3.onchange = this.calculateScore;
        this.calculatedLb4.onchange = this.calculateScore;
        this.calculatedIntime.onchange = this.calculateScore;
        this.calculatedTest.onchange = this.calculateScore;
        this.calculatedIDZ.onchange = this.calculateScore;
        this.calculatedAddition.onchange = this.calculateScore;
        
        this.calculateScore();
    }

    /**
     * Установить значения компонентов оценки для указанного студента.
     */
    setGrades(stud) {
        calculatedLb1.value = stud.lb1;
        calculatedLb2.value = stud.lb2;
        calculatedLb3.value = stud.lb3;
        calculatedLb4.value = stud.lb4;
        calculatedIntime.checked = stud.intime === 0 ? false : true;
        calculatedTest.value = stud.test;
        calculatedIDZ.value = stud.idz;
        calculatedAddition.value = stud.addition;

        this.calculateScore();
    }

    /**
     * Расчет значения итоговой оценки для текущих значений ее компонентов.
     */
    calculateScore() {
        let lb1 = +calculatedLb1.value;
        let lb2 = +calculatedLb2.value;
        let lb3 = +calculatedLb3.value;
        let lb4 = +calculatedLb4.value;
        let intime = calculatedIntime.checked ? 10 : 0; 
        let test = +calculatedTest.value;
        let idz = +calculatedIDZ.value;
        let addition = +calculatedAddition.value;
        let res = lb1 + lb2 + lb3 + lb4 + intime + test + idz + addition;
    
        let calculatedResult = document.getElementById('calculatedResult');
        calculatedResult.value = res; 
    }
}

/**
* Класс для управления выводом данных про успеваемость студента.
*/
class GradeTable {
    constructor(){
        this.lb1cell = document.getElementById('realLb1');
        this.lb1repository = document.getElementById('lb1repository');
        this.lb2cell = document.getElementById('realLb2');
        this.lb2repository = document.getElementById('lb2repository');
        this.lb3cell = document.getElementById('realLb3');
        this.lb3repository = document.getElementById('lb3repository');
        this.lb4cell = document.getElementById('realLb4');
        this.lb4repository = document.getElementById('lb4repository');
        this.intimeCell = document.getElementById('realIntime');
        this.testCell = document.getElementById('realTest');
        this.idzCell = document.getElementById('realIDZ');
        // this.idzRepository = document.getElementById('idzRepository');
        this.additionCell = document.getElementById('realAddition');
        // this.additionRepository = document.getElementById('additionRepository');
        this.resultCell = document.getElementById('realResult');
    }

    /**
     * Заполнение таблицы с результатами лабораторных,
     * тестов и других видов работ для указанного студента. 
     */
    setTable(stud) {

        this.lb1repository.checked = stud.lb1repository;
        this.lb2repository.checked = stud.lb2repository;
        this.lb3repository.checked = stud.lb3repository;
        this.lb4repository.checked = stud.lb4repository;
        // this.idzRepository.checked = stud.idzRepository;
        // this.additionRepository.checked = stud.additionRepository;

        this.lb1cell.innerHTML = stud.lb1;
        this.lb2cell.innerHTML = stud.lb2;
        this.lb3cell.innerHTML = stud.lb3;
        this.lb4cell.innerHTML = stud.lb4;
        this.intimeCell.innerHTML = stud.intime;
        this.testCell.innerHTML = stud.test;
        this.idzCell.innerHTML = stud.idz;
        this.additionCell.innerHTML = stud.addition;
        this.resultCell.innerHTML = stud.total;
    }

    /**
     * Очистка таблицы текущих данных успеваемости. 
     */
    clearTable() {
        this.lb1cell.innerHTML = "";
        this.lb1repository.checked = false;
        this.lb2cell.innerHTML = "";
        this.lb2repository.checked = false;
        this.lb3cell.innerHTML = "";
        this.lb3repository.checked = false;
        this.lb4cell.innerHTML = "";
        this.lb4repository.checked = false;
        this.intimeCell.innerHTML = "";
        this.testCell.innerHTML = "";
        this.idzCell.innerHTML = "";
        // this.idzRepository.checked = false;
        this.additionCell.innerHTML = "";
        // this.additionRepository.checked = false;
        this.resultCell.innerHTML = "";
    }
}

/**
* Класс для получения данных про успеваемость из электронного журнала.
*/
class Gradebook {
    //groups; // сюда запишем результат, разобрав JSON-ответ от GAS.
    
    constructor(url) {
        this.url = url;
    }

    async getCurrentGrades(callback) {  
        let self = this;  
        self.setRequestIndicator("Обработка данных...", "block", "hidden");

        fetch(self.url).then(function(response) {
            if (!response.ok) {
                self.setRequestIndicator("Ошибка загрузки данных.", "block", "hidden");
            }
            self.setRequestIndicator("Данные загружены.", "none", "visible");
            response.json().then(function(json) {
                callback(json.groups);
                return json.groups;
            }).catch(e => {
                console.log("Error. " + e);
                self.setRequestIndicator("Ошибка обработки данных.", "block", "hidden");
                return {};
            })
        });  
    }
    setRequestIndicator(message, requestIndicatorDisplay, scoreSelectVisibility) {
        let requestIndicator = document.getElementById("requestIndicator");
        let scoreSelect = document.getElementById("scoreSelect");

        requestIndicator.innerHTML = message;
        requestIndicator.style.display = requestIndicatorDisplay;
        scoreSelect.style.visibility = scoreSelectVisibility;
    }
}
  
/**
 * Заполнение выпадающего списка студентов группы. 
 */  
function fillGroupListbox(groups) {
    let output = "";
    for (let i = 0; i < groups.length; i++) {
        output += "<option>" + groups[i].groupName + "</option>";
    }
    let selectGroup = document.getElementById("groups");
    selectGroup.innerHTML += output;

    selectGroup.onchange = () => {
        currentGrades.clearTable();
    
        let relevanceDate = document.getElementById("relevanceDate");
        relevanceDate.innerHTML = "Данные актуальны на " + groups.find(group => group.groupName === selectGroup.value).relevanceDate;
    
        let students = groups.find(group => group.groupName === selectGroup.value).students;
        let output = "";
        for (let i = 0; i < students.length; i++) {
            let studName = students[i].name;
            if(studName !== "") {
                output += "<option>" + studName + "</option>";
            }
        }    
        let selectStudent = document.getElementById("students");
        selectStudent.innerHTML = "<option>Студент</option>";
        selectStudent.innerHTML += output;

        selectStudent.onchange = () => {
            currentGrades.clearTable(); 
            
            let stud = students.find(student => student.name === selectStudent.value);
            currentGrades.setTable(stud);
            gradeCalculator.setGrades(stud);
        }
    }; 
}

/**
 * Заполнение таблицы с результатами лабораторных,
 * тестов и других видов работ выбранного студента выбранной группы. 
 */

// TODO: get from config googlespreadsheet
let url = "https://script.google.com/a/nure.ua/macros/s/AKfycby1R7D-cWFL6lea8USHh6lqUWC429isPn2ZcG9G/exec";
let gradebook = new Gradebook(url);

let currentGrades = new GradeTable();
let gradeCalculator = new GradeCalculator();

//let groups = gradebook.getCurrentGrades();
//console.dir(groups)

//const promise1 = new Promise(gradebook.getCurrentGrades);
//console.log(promise1);
//   promise1.then(function(value) {
//     console.log(value);
//     // expected output: "foo"
//   });

//gradebook.getCurrentGrades();
// gradebook.getCurrentGrades().then(groups => console.dir(groups));



//.then(groups => fillGroupListbox(groups));

gradebook.getCurrentGrades(fillGroupListbox);
