var spreadsheets = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1TWn7IN2_S0N6Wf4abXHJ3iXD5j-7yRggBYu5i9HM3IQ/edit'); // Gradebook_ITech2_2021-22
var logSheet = spreadsheets.getSheetByName("Log");

var labThemesFirstSemester = ["HTML", "CSS", "JavaScript", "PHP"];
var labThemesSecondSemester = ["PDO", "MongoDB", "AJAX", "NodeJS"];
var labThemes = labThemesFirstSemester;

function onEdit(e) {
  var editedSheetName = e.source.getActiveSheet().getName();
  // Browser.msgBox(editedSheetName);

  if(isObservedSheet(editedSheetName)) {
    // TODO: check observed row/col area.
    var rowNumber = e.range.getRow();
    var colNumber = e.range.getColumn();

    var emptyRowNumber = logSheet.getLastRow() + 1;
    var editedSheet = spreadsheets.getSheetByName(editedSheetName);

    var semesterNumber = getSemesterNumber(editedSheet);
    labThemes = semesterNumber === 1 ? labThemesFirstSemester : labThemesSecondSemester;

    /* get log data */
    var currentDate = getCurrentDateString();
    var currentTime = getCurrentTimeString();
    var address = e.range.getA1Notation();
    var fio = rowNumber > 4 ? editedSheet.getRange("B" + rowNumber).getDisplayValue() : "";
    var cellHeader = getCellHeader(columnIndexToLetter(colNumber));
    var valueOld = e.oldValue == undefined ? "" : e.oldValue;
    // var valueNew = e.value;
    var valueNew = editedSheet.getRange(columnIndexToLetter(colNumber) + rowNumber).getDisplayValue();

    /* get spreadsheet cells */
    var cellDate = logSheet.getRange("A" + emptyRowNumber);
    var cellTime = logSheet.getRange("B" + emptyRowNumber);
    var cellName = logSheet.getRange("C" + emptyRowNumber);
    var cellAddress = logSheet.getRange("D" + emptyRowNumber);
    var cellFIO = logSheet.getRange("E" + emptyRowNumber);
    var cellWorkType = logSheet.getRange("F" + emptyRowNumber);
    var cellValueOld = logSheet.getRange("G" + emptyRowNumber);
    var cellValueNew = logSheet.getRange("H" + emptyRowNumber);
    
    /* set spreadsheet cell values  */
    cellDate.setValue(currentDate);
    cellTime.setValue(currentTime);
    cellName.setValue(editedSheetName);
    cellAddress.setValue(address);
    cellFIO.setValue(fio);
    cellWorkType.setValue(cellHeader);
    cellValueOld.setValue(valueOld);
    cellValueNew.setValue(valueNew);
    // Browser.msgBox(emptyRowNumber + " " + currentDate + " " + currentTime);
  }
}

function isObservedSheet(sheetName) {
  switch(sheetName){
    case "Log":
      return false;
    case "Статистика":
      return false;
  }
  return true;
}

function getSemesterNumber(editedSheet) {
  var cellA1 = editedSheet.getRange("A1");
  var semesterName = cellA1.getDisplayValue();
  switch(semesterName[semesterName.length - 2]){
    case 2:
      return 2;
    case 1:
      return 1;
    default:
      return 0;
  }
}

function getCellHeader(columnLetter) {
  switch(columnLetter){
    case "A":
    return "№";

    case "B":
    return "ФИО";
    
    case "C":
    return "Причина не учитывать в журнале";
    
    case "D":
    return "Форма обучения";
    
    case "E":
    return "Свободное посещение";
    
    case "F":
    return "Роспись за т/б";
    
    case "G":
    return "Л/р №1, " + labThemes[0] + ", Вариант";
    case "H":
    return "Л/р №1, " + labThemes[0] + ", Отработка";
    case "I":
    return "Л/р №1, " + labThemes[0] + ", Репозиторий, Адрес";
    case "J":
    return "Л/р №1, " + labThemes[0] + ", Репозиторий, Статус";
    case "K":
    return "Л/р №1, " + labThemes[0] + ", Защита, Дата";
    case "L":
    return "Л/р №1, " + labThemes[0] + ", Защита, Оценка";
    case "M":
    return "Л/р №1, " + labThemes[0] + ", Защита, Учтено";  
    
    case "N":
    return "Л/р №2, " + labThemes[1] + ", Вариант";
    case "O":
    return "Л/р №2, " + labThemes[1] + ", Отработка";
    case "P":
    return "Л/р №2, " + labThemes[1] + ", Репозиторий, Адрес";
    case "Q":
    return "Л/р №2, " + labThemes[1] + ", Репозиторий, Статус";
    case "R":
    return "Л/р №2, " + labThemes[1] + ", Защита, Дата";
    case "S":
    return "Л/р №2, " + labThemes[1] + ", Защита, Оценка";
    case "T":
    return "Л/р №2, " + labThemes[1] + ", Защита, Учтено";  
    
    case "U":
    return "Л/р №3, " + labThemes[2] + ", Вариант";
    case "V":
    return "Л/р №3, " + labThemes[2] + ", Отработка";
    case "W":
    return "Л/р №3, " + labThemes[2] + ", Репозиторий, Адрес";
    case "X":
    return "Л/р №3, " + labThemes[2] + ", Репозиторий, Статус";
    case "Y":
    return "Л/р №3, " + labThemes[2] + ", Защита, Дата";
    case "Z":
    return "Л/р №3, " + labThemes[2] + ", Защита, Оценка";
    case "AA":
    return "Л/р №3, " + labThemes[2] + ", Защита, Учтено";  
    
    case "AB":
    return "Л/р №4, " + labThemes[3] + ", Вариант";
    case "AC":
    return "Л/р №4, " + labThemes[3] + ", Отработка";
    case "AD":
    return "Л/р №4, " + labThemes[3] + ", Репозиторий, Адрес";
    case "AE":
    return "Л/р №4, " + labThemes[3] + ", Репозиторий, Статус";
    case "AF":
    return "Л/р №4, " + labThemes[3] + ", Защита, Дата";
    case "AG":
    return "Л/р №4, " + labThemes[3] + ", Защита, Оценка";
    case "AH":
    return "Л/р №4, " + labThemes[3] + ", Защита, Учтено";  
    
    case "AI":
    return "Баллы за сдачу вовремя";

    case "AJ":
    return "Тест, Попытка №1";
    case "AK":
    return "Тест, Попытка №2";
    case "AL":
    return "Тест, Учтено";

    case "AM":
    return "ИДЗ, Описание";
    case "AN":
    return "ИДЗ, Репозиторий, Адрес";
    case "AO":
    return "ИДЗ, Репозиторий, Статус";
    case "AP":
    return "ИДЗ, Оценка";
    case "AQ":
    return "ИДЗ, Учтено";

    case "AR":
    return "Дополнительные задания, Описание";
    case "AS":
    return "Дополнительные задания, Репозиторий";
    case "AT":
    return "Дополнительные задания, Оценка";
    case "AU":
    return "Дополнительные задания, Учтено";

    case "AV":
    return "Расчет итоговой оценки, Лб";
    case "AW":
    return "Расчет итоговой оценки, Всрок";
    case "AX":
    return "Расчет итоговой оценки, Тест";
    case "AY":
    return "Расчет итоговой оценки, ИДЗ";
    case "AZ":
    return "Расчет итоговой оценки, Доп";
    case "BA":
    return "Расчет итоговой оценки, Сумма баллов";    
    case "BB":
    return "Расчет итоговой оценки, Итоговая оценка";
    case "BC":
    return "Расчет итоговой оценки, План";

    case "BD":
    return "Ведомость, Наличие допуска";
    case "BE":
    return "Ведомость, Сдача в установленный срок, Оценка/зачет";
    case "BF":
    return "Ведомость, Сдача в установленный срок, Баллов";
    case "BG":
    return "Ведомость, Сдача в установленный срок, ЕКТС";
    case "BH":
    return "Ведомость, Сдача в установленный срок, Зачетка";     
    case "BI":
    return "Ведомость, Сдача не в установленный срок, Оценка/зачет";
    case "BJ":
    return "Ведомость, Сдача не в установленный срок, Баллов";
    case "BK":
    return "Ведомость, Сдача не в установленный срок, ЕКТС";
    case "BL":
    return "Ведомость, Сдача не в установленный срок, Дата выставления";
    case "BM":
    return "Ведомость, Сдача не в установленный срок, Дата в индграфике";
    case "BN":
    return "Ведомость, Сдача не в установленный срок, Зачетка";

    case "BO":
    return "Примечания";

    case "BP":
    return "Присутствие, лекции, №1";
    case "BQ":
    return "Присутствие, лекции, №2";
    case "BR":
    return "Присутствие, лекции, №3";
    case "BS":
    return "Присутствие, лекции, №4";
    case "BT":
    return "Присутствие, лекции, №5";
    case "BU":
    return "Присутствие, лекции, №6";
    case "BV":
    return "Присутствие, лекции, №7";
    case "BW":
    return "Присутствие, лекции, №8";
    case "BX":
    return "Присутствие, лекции, №9";
    case "BY":
    return "Присутствие, лекции, №10";
    case "BZ":
    return "Присутствие, лекции, №11";

    case "CA":
    return "Присутствие, Л/р №1, " + labThemes[0];
    case "CB":
    return "Присутствие, Л/р №2, " + labThemes[1];    
    case "CC":
    return "Присутствие, Л/р №3, " + labThemes[2];
    case "CD":
    return "Присутствие, Л/р №4, " + labThemes[3];
    case "CE":
    return "Присутствие, Зачет";
  }
  
  return "<не определено>";
}

function getCurrentDateString() {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();
  return year + "." + month + "." + day;
  // return new Date().toISOString().split('T')[0].replace(/-/g,'.');
}

function getCurrentTimeString() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  return hours + ":" + minutes + ":" + seconds;
}

function columnIndexToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}