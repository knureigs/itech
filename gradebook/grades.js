/**
* Класс для управления калькулятором оценки студента.
*/
class GradeCalculator {
    constructor() {
        // получение элементов таблички, используемых для расчета желаемой оценки
        this.calculatedLb1 = document.getElementById('calculatedLb1');
        this.calculatedLb2 = document.getElementById('calculatedLb2');
        this.calculatedLb3 = document.getElementById('calculatedLb3');
        this.calculatedLb4 = document.getElementById('calculatedLb4');
        // this.calculatedIntime = document.getElementById('calculatedIntime');
        this.calculatedTest = document.getElementById('calculatedTest');
        this.calculatedIDZ = document.getElementById('calculatedIDZ');
        this.calculatedAddition = document.getElementById('calculatedAddition');
        
        this.calculatedLb1.onchange = this.calculateScore;
        this.calculatedLb2.onchange = this.calculateScore;
        this.calculatedLb3.onchange = this.calculateScore;
        this.calculatedLb4.onchange = this.calculateScore;
        // this.calculatedIntime.onchange = this.calculateScore;
        this.calculatedTest.onchange = this.calculateScore;
        this.calculatedIDZ.onchange = this.calculateScore;
        this.calculatedAddition.onchange = this.calculateScore;
        
        this.calculateScore();
    }

    /**
     * Установить значения компонентов оценки для указанного студента.
     * @param {Student} stud Объект, описывающий успеваемость отдельного студента.
     */
    setGrades(stud) {
        calculatedLb1.value = stud.laboratoryWorks.lb1.finalGrade;
        calculatedLb2.value = stud.laboratoryWorks.lb2.finalGrade;
        calculatedLb3.value = stud.laboratoryWorks.lb3.finalGrade;
        calculatedLb4.value = stud.laboratoryWorks.lb4.finalGrade;
        // calculatedIntime.checked = stud.laboratoryWorks.intime === 0 ? false : true;
        calculatedTest.value = stud.finalTest.finalGrade;
        calculatedIDZ.value = stud.idz.finalGrade;
        calculatedAddition.value = stud.additionTasks.finalGrade;

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
        // let intime = calculatedIntime.checked ? 10 : 0; 
        let intime = 0; 
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
        this.lb1variantCell = document.getElementById('lb1variant');
        this.lb1implementationDateCell = document.getElementById('lb1implementationDate');
        this.lb1repositoryCell = document.getElementById('lb1repository');
        this.lb1disputeCell = document.getElementById('lb1dispute');
        this.lb1finalGradeCell = document.getElementById('lb1finalGrade');

        this.lb2variantCell = document.getElementById('lb2variant');
        this.lb2implementationDateCell = document.getElementById('lb2implementationDate');
        this.lb2repositoryCell = document.getElementById('lb2repository');
        this.lb2disputeCell = document.getElementById('lb2dispute');
        this.lb2finalGradeCell = document.getElementById('lb2finalGrade');

        this.lb3variantCell = document.getElementById('lb3variant');
        this.lb3implementationDateCell = document.getElementById('lb3implementationDate');
        this.lb3repositoryCell = document.getElementById('lb3repository');
        this.lb3disputeCell = document.getElementById('lb3dispute');
        this.lb3finalGradeCell = document.getElementById('lb3finalGrade');

        this.lb4variantCell = document.getElementById('lb4variant');
        this.lb4implementationDateCell = document.getElementById('lb4implementationDate');
        this.lb4repositoryCell = document.getElementById('lb4repository');
        this.lb4disputeCell = document.getElementById('lb4dispute');
        this.lb4finalGradeCell = document.getElementById('lb4finalGrade');

        // this.intimeCell = document.getElementById('realIntime');

        this.testFirstCell = document.getElementById('realTestFirst');
        this.testSecondCell = document.getElementById('realTestSecond');
        this.testFinalCell = document.getElementById('realTestFinal');

        this.idzRepositoryCell = document.getElementById('idzRepository');
        this.idzDisputeGradeCell = document.getElementById('idzDisputeGrade');
        this.idzFinalGradeCell = document.getElementById('realIDZ');

        this.additionRepositoryCell = document.getElementById('additionRepository');
        this.additionDisputGradeCell = document.getElementById('additionDisputGrade');
        this.additionFinalGradeCell = document.getElementById('realAddition');

        this.resultCell = document.getElementById('realResult');

        this.permitElement = document.getElementById('permit');
    }

    /**
     * Заполнение таблицы с результатами лабораторных,
     * тестов и других видов работ для указанного студента. 
     * @param {Student} stud Объект, описывающий успеваемость отдельного студента.
     */
    setTable(stud) {
        let laboratoryWorks = stud.laboratoryWorks;

        this.lb1variantCell.innerHTML = laboratoryWorks.lb1.variant;
        this.lb1implementationDateCell.innerHTML = laboratoryWorks.lb1.implementationDate;
        this.lb1repositoryCell.innerHTML = this.getRepositoryStatus(laboratoryWorks.lb1.repositoryStatus);
        this.lb1disputeCell.innerHTML = this.getDisputData(laboratoryWorks.lb1.disputeDate, laboratoryWorks.lb1.disputeGrade);
        this.lb1finalGradeCell.innerHTML = laboratoryWorks.lb1.finalGrade;

        this.lb2variantCell.innerHTML = laboratoryWorks.lb2.variant;
        this.lb2implementationDateCell.innerHTML = laboratoryWorks.lb2.implementationDate;
        this.lb2repositoryCell.innerHTML = this.getRepositoryStatus(laboratoryWorks.lb2.repositoryStatus);
        this.lb2disputeCell.innerHTML = this.getDisputData(laboratoryWorks.lb2.disputeDate, laboratoryWorks.lb2.disputeGrade);
        this.lb2finalGradeCell.innerHTML = laboratoryWorks.lb2.finalGrade;

        this.lb3variantCell.innerHTML = laboratoryWorks.lb3.variant;
        this.lb3implementationDateCell.innerHTML = laboratoryWorks.lb3.implementationDate;
        this.lb3repositoryCell.innerHTML = this.getRepositoryStatus(laboratoryWorks.lb3.repositoryStatus);
        this.lb3disputeCell.innerHTML = this.getDisputData(laboratoryWorks.lb3.disputeDate, laboratoryWorks.lb3.disputeGrade);
        this.lb3finalGradeCell.innerHTML = laboratoryWorks.lb3.finalGrade;

        this.lb4variantCell.innerHTML = laboratoryWorks.lb4.variant;
        this.lb4implementationDateCell.innerHTML = laboratoryWorks.lb4.implementationDate;
        this.lb4repositoryCell.innerHTML = this.getRepositoryStatus(laboratoryWorks.lb4.repositoryStatus);
        this.lb4disputeCell.innerHTML = this.getDisputData(laboratoryWorks.lb4.disputeDate, laboratoryWorks.lb4.disputeGrade);
        this.lb4finalGradeCell.innerHTML = laboratoryWorks.lb4.finalGrade;

        // this.intimeCell.innerHTML = laboratoryWorks.intime;

        this.testFirstCell.innerHTML = stud.finalTest.attemptFirst;
        this.testSecondCell.innerHTML = stud.finalTest.attemptSecond;
        this.testFinalCell.innerHTML = stud.finalTest.finalGrade;

        this.idzRepositoryCell.innerHTML = this.getRepositoryStatus(stud.idz.repositoryStatus);
        this.idzDisputeGradeCell.innerHTML = stud.idz.disputeGrade;
        this.idzFinalGradeCell.innerHTML = stud.idz.finalGrade;

        this.additionRepositoryCell.checked = stud.additionTasks.repository;
        this.additionDisputGradeCell.innerHTML = stud.additionTasks.disputeGrade;
        this.additionFinalGradeCell.innerHTML = stud.additionTasks.finalGrade;

        this.resultCell.innerHTML = stud.total;

        this.permitElement.innerHTML = "Допуск к зачету: <b>" + (stud.permit === "н/д" ? "нет данных" : stud.permit) + "</b>";
        // this.permitCell.innerHTML = this.getPermitStatus(stud.permit); // можно и без интерпретации, там не так много значений.
    }

    /**
     * Очистка таблицы текущих данных успеваемости. 
     */
    clearTable() {
        this.lb1variantCell.innerHTML = "";
        this.lb1implementationDateCell.innerHTML = "";
        this.lb1repositoryCell.innerHTML = "";
        this.lb1disputeCell.innerHTML = "";
        this.lb1finalGradeCell.innerHTML = "";

        this.lb2variantCell.innerHTML = "";
        this.lb2implementationDateCell.innerHTML = "";
        this.lb2repositoryCell.innerHTML = "";
        this.lb2disputeCell.innerHTML = "";
        this.lb2finalGradeCell.innerHTML = "";

        this.lb3variantCell.innerHTML = "";
        this.lb3implementationDateCell.innerHTML = "";
        this.lb3repositoryCell.innerHTML = "";
        this.lb3disputeCell.innerHTML = "";
        this.lb3finalGradeCell.innerHTML = "";

        this.lb4variantCell.innerHTML = "";
        this.lb4implementationDateCell.innerHTML = "";
        this.lb4repositoryCell.innerHTML = "";
        this.lb4disputeCell.innerHTML = "";
        this.lb4finalGradeCell.innerHTML = "";

        // this.intimeCell.innerHTML = "";

        this.testFirstCell.innerHTML = "";
        this.testSecondCell.innerHTML = "";
        this.testFinalCell.innerHTML = "";
        
        this.idzRepositoryCell.innerHTML = "";
        this.idzDisputeGradeCell.innerHTML = "";
        this.idzFinalGradeCell.innerHTML = "";

        this.additionRepositoryCell.checked = false;
        this.additionDisputGradeCell.innerHTML = "";
        this.additionFinalGradeCell.innerHTML = "";

        this.resultCell.innerHTML = "";

        this.permitElement.innerHTML = "";
    }

    /**
     * Подготовка строкового представления данных о защите.
     * @param {string} disputeDate Дата защиты.
     * @param {string} disputeGrade оценка за защиту.
     * @returns Строковое представление данных о защите.
     */
    getDisputData(disputeDate, disputeGrade) {
        if(disputeDate==="" || disputeGrade==="") {
            return "";
        }
        else {
            return disputeDate + ", " + disputeGrade;
        }
    }

    /**
     * Интерпретация статуса репозитория в понятное пользователю сообщение.
     * @param {string} repositoryStatus Метка статуса репозитория в электронном журнале.
     * @returns Сообщение о статусе принятия репозитория пользователю.
     */
    getRepositoryStatus(repositoryStatus) {
        switch(repositoryStatus) {
            case "empty":
                return "отсутствует";
            case "wait":
                return "отсутствует";
            case "check":
                return "на проверке";
            case "ok":
                return "принят";
            case "warning":
                return "принят";
            case "error":
                return "ошибка!";
            case "good":
                return "принят";
            case "saved":
                return "принят";
            case "not need":
                return "не требуется";
            default:
                return "ошибка!";
        }
    }

    /**
     * Интерпретация данных о допуске к сдаче зачета.
     * @param {string} permit Один из вариантов касаемо наличия допуска к сессии.
     * @returns Сообщение о допуске к зачету.
     */
    getPermitStatus(permit) {
        switch(permit) {
            case "н/д":
                return "нет данных";
            case "есть":
                return "есть";
            case "нет":
                return "нет";
            default:
                return "нет данных";
        }
    }
}

/**
* Класс для получения данных про успеваемость группы из электронного журнала.
*/
class Gradebook {
    //groups; // сюда запишем результат, разобрав JSON-ответ от GAS.
    
    constructor(url) {
        this.url = url;
    }

    getCurrentGrades() {
        let self = this;
        self.setRequestIndicator("Отправка запроса...", "block", "hidden");
        return fetch(self.url).then(response => {
            if (response.ok) {
                self.setRequestIndicator("Данные загружены.", "none", "visible"); 
                return response.json().catch(() => {
                    self.setRequestIndicator("Ошибка обработки данных.", "block", "hidden");
                    return Promise.reject();
                });
            }
            else {
                self.setRequestIndicator("Ошибка загрузки данных.", "block", "hidden");
                return Promise.reject();
            }
        }).catch(error => {
            self.setRequestIndicator("Ошибка загрузки данных.", "block", "hidden");
            return Promise.reject();
        });
    }

    setRequestIndicator(requestIndicatorMessage, requestIndicatorDisplay, groupDataVisibility) {
        // console.log(requestIndicatorMessage);

        let requestIndicatorElement = document.getElementById("requestIndicator");
        requestIndicatorElement.innerHTML = requestIndicatorMessage;
        requestIndicatorElement.style.display = requestIndicatorDisplay;

        let groupDataElement = document.getElementById("groupData");
        groupDataElement.style.visibility = groupDataVisibility;
    }
}
  
/**
 * Заполнение выпадающего списка студентов группы. 
 * @param {Array} groups Массив названий групп, доступных для выбора в текущем семестре.
 */  
function fillGroupListbox(groups) {
    // console.dir(groups);
    let selectGroupElement = document.getElementById("groups");
    let output = "";
    for (let i = 0; i < groups.length; i++) {
        output += "<option>" + groups[i] + "</option>";
    }
    selectGroupElement.innerHTML += output;

    selectGroupElement.onchange = () => {
        currentGrades.clearTable();

        const selectedGroupName = selectGroupElement.value;

        // let gradebook = new Gradebook("temp.json");  // временный файл для отладки обработки получаемых от сервера данных
        // TODO: get from config googlespreadsheet      
        let url = "https://script.google.com/macros/s/AKfycbwwULVOmAcRp-ykq-BKWPe7qoWLJUm6rtb1p_vpQa0cefTfFoQQSXMc9E-GRMFtN_Z6/exec";        
        let gradebook = new Gradebook(url + "?groupName=" + selectedGroupName);
    
        gradebook.getCurrentGrades().then(json => fillStudentsListbox(json.group));
    }; 
}

/**
 * Заполнение выпадающего списка студентов группы и элементов с общей информацией касаемо успеваемости группы.
 * @param {group} group Объект, содержащий данные об успеваемости студентческой группы.
 */
function fillStudentsListbox(group) {
    // let deadlineElement = document.getElementById("deadline");
    // deadlineElement.innerHTML = "Дедлайн для <b>своевременной</b> сдачи лабораторных у этой группы <b>" + group.deadline + "<b>";

    // DEPRECATED: данные об актуальности отдаваемых пользователю данных об успеваемости не нужны.
    // let relevanceDate = document.getElementById("relevanceDate");
    // relevanceDate.innerHTML = "Данные актуальны на " + group.relevanceDate;

    let students = group.students;
    let selectStudentElement = document.getElementById("students");
    let output = "";
    for (let i = 0; i < students.length; i++) {
        let fio = students[i].fio;
        if(fio !== "") {
            output += "<option>" + fio + "</option>";
        }
    }    
    selectStudentElement.innerHTML = "<option>Студент</option>";
    selectStudentElement.innerHTML += output;

    selectStudentElement.onchange = () => {
        currentGrades.clearTable(); 
        
        let stud = students.find(student => student.fio === selectStudentElement.value);
        
        // console.dir(stud);

        currentGrades.setTable(stud);
        gradeCalculator.setGrades(stud);
    }
}

let currentGrades = new GradeTable();
let gradeCalculator = new GradeCalculator();

// перечень групп менять при обновлении электронного журнала в началае каждого семетра.
fillGroupListbox(["КІУКІ-19-1", "КІУКІ-19-2", "КІУКІ-19-3", "КІУКІ-19-4", "КІУКІ-19-5", "КІУКІ-19-6", "КІУКІу-20-1", "КІУКІу-20-2"]);

// для сохранения тестовых данных в файл, во избежание постоянной работы с сервером в процессе отладки
// gradebook.getCurrentGrades().then(json => {console.log(JSON.stringify(json)); fillGroupListbox(json.groups);});

// для анонимизации тестовых данных
// gradebook.getCurrentGrades().then(json => {anonimize(json); fillGroupListbox(json.groups);});
// function anonimize(json) {
//     let groups = json.groups;
//     for (let group of groups) {
//         for (let studNumber in group.students) {
//             group.students[studNumber].fio = "Иванов Студент" + studNumber;
//         }
//     }
//     console.log(JSON.stringify(json));
// }

