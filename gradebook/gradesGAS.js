/**
 * Получение из электронного журнала данных об успеваемости выбранной группы. 
 */
function getGradebookData(groupName){
  var group = {}; // объект, содержащий данные об успеваемости группы для передачи клиентской части электронного журнала.
  // groupName = "КІУКІ-18-3"; // это при отладке используется.
  group.groupName = groupName;
  group.students = [];  // массив студентов.
  var sheet = getSheetData(groupName); // заготовка данных, из листа гугл-таблицы.
  group.deadline = sheet.deadline;
      
  // формирование массива объектов, описывающих успеваемость всех студентов группы.
  var studAmount = sheet.lastRowNumber - 4; // 4 строки на шапку листа с успеваемостью
  for(var studNumber = 0; studNumber < studAmount; studNumber++) {
    // если студент предмет не изучает (т.е. есть какая-то указанная в журнале причина), то он не нужен в выдаче данных.
    var reason = sheet.columns["C"][studNumber][0];
    if(reason != "") {
      continue;
    }
    
    // если число студентов определено неправильно (привет от getLastRow()), то цикл прерываем при встрече пустого ФИО.
    var fio = sheet.columns["B"][studNumber][0];
    if(fio === "") {
      break;
    }

    var lb1 = getLabData(sheet.columns["G"], sheet.columns["H"], sheet.columns["J"], sheet.columns["K"], sheet.columns["L"], sheet.columns["M"], studNumber);
    var lb2 = getLabData(sheet.columns["N"], sheet.columns["O"], sheet.columns["Q"], sheet.columns["R"], sheet.columns["S"], sheet.columns["T"], studNumber);
    var lb3 = getLabData(sheet.columns["U"], sheet.columns["V"], sheet.columns["X"], sheet.columns["Y"], sheet.columns["Z"], sheet.columns["AA"], studNumber);
    var lb4 = getLabData(sheet.columns["AB"], sheet.columns["AC"], sheet.columns["AE"], sheet.columns["AF"], sheet.columns["AG"], sheet.columns["AH"], studNumber);
    var intime = sheet.columns["AI"][studNumber][0];
    var laboratoryWorks = new LaboratoryWorks(lb1, lb2, lb3, lb4, intime);

    var attemptFirst = sheet.columns["AJ"][studNumber][0];
    var attemptSecond = sheet.columns["AK"][studNumber][0];
    var finalGrade = sheet.columns["AL"][studNumber][0];
    var finalTest = new FinalTest(attemptFirst, attemptSecond, finalGrade);

    var idzRepositoryStatus = sheet.columns["AO"][studNumber][0];
    var idzDisputeGrade = sheet.columns["AP"][studNumber][0];
    var idzFinalGrade = sheet.columns["AQ"][studNumber][0];
    var idz = new IDZ(idzRepositoryStatus, idzDisputeGrade, idzFinalGrade);

    var additionTasksRepository = sheet.columns["AS"][studNumber][0] == "" ? false : true;
    var additionTasksDisputeGrade = sheet.columns["AT"][studNumber][0];
    var additionTasksFinalGrade = sheet.columns["AU"][studNumber][0];
    var additionTasks = new AdditionTasks(additionTasksRepository, additionTasksDisputeGrade, additionTasksFinalGrade);

    var total = sheet.columns["BB"][studNumber][0];

    var permit = sheet.columns["BD"][studNumber][0];
    
    group.students.push(new Student(fio, groupName, laboratoryWorks, finalTest, idz, additionTasks, total, permit));        
  }    
  // Logger.log(group);
  return group; 
}
  
/**
 * Получить из гугл-таблицы объект, мапящий данные об успеваемости группы для последующей обработки.
 */
function getSheetData(groupName){
  var sheet = spreadsheets.getSheetByName(groupName);
  var sheetData = {};
  
  // sheetData.relevanceDate = sheet.getRange("A3").getDisplayValue();
  sheetData.deadline = sheet.getRange("AI4").getDisplayValue();
  
  sheetData.lastRowNumber = sheet.getLastRow();
  lastRowNumber = sheetData.lastRowNumber; // для упрщения обращения к числу строк в журнале.
  
  sheetData.columns = []; // колонки, содержащие нужные для студентов данные об успеваемости.

  sheetData.columns["B"] = sheet.getRange('B5:B' + lastRowNumber).getDisplayValues();    //fio

  sheetData.columns["C"] = sheet.getRange('C5:C' + lastRowNumber).getDisplayValues();    //reason not to learn 

  sheetData.columns["G"] = sheet.getRange('G5:G' + lastRowNumber).getValues();           //lb1 variant
  sheetData.columns["H"] = sheet.getRange('H5:H' + lastRowNumber).getDisplayValues();    //lb1 implementationDate
  sheetData.columns["J"] = sheet.getRange('J5:J' + lastRowNumber).getValues();           //lb1 repositoryStatus
  sheetData.columns["K"] = sheet.getRange('K5:K' + lastRowNumber).getDisplayValues();    //lb1 disputeDate
  sheetData.columns["L"] = sheet.getRange('L5:L' + lastRowNumber).getValues();           //lb1 disputeGrade
  sheetData.columns["M"] = sheet.getRange('M5:M' + lastRowNumber).getValues();           //lb1 finalGrade

  sheetData.columns["N"] = sheet.getRange('N5:N' + lastRowNumber).getValues();           //lb2 variant
  sheetData.columns["O"] = sheet.getRange('O5:O' + lastRowNumber).getDisplayValues();    //lb2 implementationDate
  sheetData.columns["Q"] = sheet.getRange('Q5:Q' + lastRowNumber).getValues();           //lb2 repositoryStatus
  sheetData.columns["R"] = sheet.getRange('R5:R' + lastRowNumber).getDisplayValues();    //lb2 disputeDate
  sheetData.columns["S"] = sheet.getRange('S5:S' + lastRowNumber).getValues();           //lb2 disputeGrade
  sheetData.columns["T"] = sheet.getRange('T5:T' + lastRowNumber).getValues();           //lb2 finalGrade

  sheetData.columns["U"] = sheet.getRange('U5:U' + lastRowNumber).getValues();           //lb3 variant
  sheetData.columns["V"] = sheet.getRange('V5:V' + lastRowNumber).getDisplayValues();    //lb3 implementationDate
  sheetData.columns["X"] = sheet.getRange('X5:X' + lastRowNumber).getValues();           //lb3 repositoryStatus
  sheetData.columns["Y"] = sheet.getRange('Y5:Y' + lastRowNumber).getDisplayValues();    //lb3 disputeDate
  sheetData.columns["Z"] = sheet.getRange('Z5:Z' + lastRowNumber).getValues();           //lb3 disputeGrade
  sheetData.columns["AA"] = sheet.getRange('AA5:AA' + lastRowNumber).getValues();        //lb3 finalGrade

  sheetData.columns["AB"] = sheet.getRange('AB5:AB' + lastRowNumber).getValues();        //lb4 variant
  sheetData.columns["AC"] = sheet.getRange('AC5:AC' + lastRowNumber).getDisplayValues(); //lb4 implementationDate
  sheetData.columns["AE"] = sheet.getRange('AE5:AE' + lastRowNumber).getValues();        //lb4 repositoryStatus
  sheetData.columns["AF"] = sheet.getRange('AF5:AF' + lastRowNumber).getDisplayValues(); //lb4 disputeDate
  sheetData.columns["AG"] = sheet.getRange('AG5:AG' + lastRowNumber).getValues();        //lb4 disputeGrade
  sheetData.columns["AH"] = sheet.getRange('AH5:AH' + lastRowNumber).getValues();        //lb4 finalGrade
  
  sheetData.columns["AI"] = sheet.getRange('AI5:AI' + lastRowNumber).getValues();        //intime

  sheetData.columns["AJ"] = sheet.getRange('AJ5:AJ' + lastRowNumber).getValues();        //test attemptFirst
  sheetData.columns["AK"] = sheet.getRange('AK5:AK' + lastRowNumber).getValues();        //test attemptSecond
  sheetData.columns["AL"] = sheet.getRange('AL5:AL' + lastRowNumber).getValues();        //test finalGrade

  sheetData.columns["AO"] = sheet.getRange('AO5:AO' + lastRowNumber).getValues();        //idz repositoryStatus
  sheetData.columns["AP"] = sheet.getRange('AP5:AP' + lastRowNumber).getValues();        //idz disputeGrade
  sheetData.columns["AQ"] = sheet.getRange('AQ5:AQ' + lastRowNumber).getValues();        //idz finalGrade

  sheetData.columns["AS"] = sheet.getRange('AS5:AS' + lastRowNumber).getValues();        //addition repository
  sheetData.columns["AT"] = sheet.getRange('AT5:AT' + lastRowNumber).getValues();        //addition disputeGrade
  sheetData.columns["AU"] = sheet.getRange('AU5:AU' + lastRowNumber).getValues();        //addition finalGrade

  sheetData.columns["BB"] = sheet.getRange('BB5:BB' + lastRowNumber).getValues();        //total

  sheetData.columns["BD"] = sheet.getRange('BD5:BD' + lastRowNumber).getValues();        //permit, допуск к сессии.

  return sheetData;
}

/**
 * Получить из данных столбцов таблицы данные о сдаче отдельной лабораторной работы отдельным студентом.
 */
function getLabData(colVariant, colImplementationDate, colRepositoryStatus, colDisputeDate, colDisputeGrade, colGrade, studNumber) {    
  var variant = colVariant[studNumber][0];
  var implementationDate = colImplementationDate[studNumber][0];
  var repositoryStatus = colRepositoryStatus[studNumber][0];
  var disputeDate = colDisputeDate[studNumber][0];
  var disputeGrade = colDisputeGrade[studNumber][0];
  var finalGrade = colGrade[studNumber][0];
  return new Lab(variant, implementationDate, repositoryStatus, disputeDate, disputeGrade, finalGrade);
}

/**
 * Класс, описывающий отработку и защиту отдельной лабораторной работы.
 */
function Lab(variant, implementationDate, repositoryStatus, disputeDate, disputeGrade, finalGrade) {
  this.variant = variant; // вариант, согласно номеру в журнале.
  this.implementationDate = implementationDate; // дата отработки.
  this.repositoryStatus = repositoryStatus; // статус репозитория с исходным кодом л/р.
  this.disputeDate = disputeDate; // дата защиты.
  this.disputeGrade = disputeGrade; // оценка за защиту.
  this.finalGrade = finalGrade; // итоговая, принятая оценка за лабораторную работу.
}

/**
 * Данные о сдаче лабораторных работ.
 */
function LaboratoryWorks(lb1, lb2, lb3, lb4, intime) {
  this.lb1 = lb1;
  this.lb2 = lb2;
  this.lb3 = lb3;
  this.lb4 = lb4;
  this.intime = intime;
}

/**
 * Данные об итоговом тесте.
 */
function FinalTest (attemptFirst, attemptSecond, finalGrade) {
  this.attemptFirst = attemptFirst;
  this.attemptSecond = attemptSecond;
  this.finalGrade = finalGrade;
}

/**
 * Данные об ИДЗ.
 */
function IDZ (repositoryStatus, disputeGrade, finalGrade) {
  this.repositoryStatus = repositoryStatus;
  this.disputeGrade = disputeGrade;
  this.finalGrade = finalGrade;
}

/**
 * Данные о дополнительных заданиях.
 */
function AdditionTasks (repository, disputeGrade, finalGrade) {
  this.repository = repository;
  this.disputeGrade = disputeGrade;
  this.finalGrade = finalGrade;
}

/**
 * Класс, описывающий успеваемость отдельного студента.
 */
function Student(fio, groupName, laboratoryWorks, finalTest, idz, additionTasks, total, permit) {
  this.fio = fio;
  // this.reason = reason;
  this.groupName = groupName;
  this.laboratoryWorks = laboratoryWorks;
  this.finalTest = finalTest;
  this.idz = idz;
  this.additionTasks = additionTasks;
  this.total = total;
  this.permit = permit;
}