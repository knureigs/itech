var spreadsheets = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1k1yuJP3K6UoHqpnkHsVCYe3ahfB4Fo-SBUxtX8nOmOk/edit'); // Gradebook_ITech2_2020-21
var logSheet = spreadsheets.getSheetByName("Log");

function onEdit(e) {
  var editedSheetName = e.source.getActiveSheet().getName();
  // Browser.msgBox(editedSheetName);
  if(editedSheetName != "Log") {
    var emptyRowNumber = logSheet.getLastRow() + 1;
    var editedSheet = spreadsheets.getSheetByName(editedSheetName);
    var rowNumber = e.range.getRow();
    var colNumber = e.range.getColumn();

    var currentDate = getCurrentDateString();
    var currentTime = getCurrentTimeString();
    var address = e.range.getA1Notation();    
    var fio = rowNumber > 4 ? editedSheet.getRange("B" + rowNumber).getDisplayValue() : "";
    var cellHeader = getCellHeader(columnIndexToLetter(colNumber));
    var valueOld = e.oldValue == undefined ? "" : e.oldValue;
    // var valueNew = e.value;
    var valueNew = editedSheet.getRange(columnIndexToLetter(colNumber) + rowNumber).getDisplayValue();

    var cellDate = logSheet.getRange("A" + emptyRowNumber);
    var cellTime = logSheet.getRange("B" + emptyRowNumber);
    var cellName = logSheet.getRange("C" + emptyRowNumber);
    var cellAddress = logSheet.getRange("D" + emptyRowNumber);
    var cellFIO = logSheet.getRange("E" + emptyRowNumber);
    var cellWorkType = logSheet.getRange("F" + emptyRowNumber);
    var cellValueOld = logSheet.getRange("G" + emptyRowNumber);
    var cellValueNew = logSheet.getRange("H" + emptyRowNumber);
    
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

function isObservedCell(sheetName, col, row) {
  switch(sheetName){
    case "Log":
    return false;
    case "Статистика":
    return false;
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
    return "Л/р, PDO, Вариант";
    case "H":
    return "Л/р, PDO, Отработка";
    case "I":
    return "Л/р, PDO, Репозиторий, Адрес";
    case "J":
    return "Л/р, PDO, Репозиторий, Статус";
    case "K":
    return "Л/р, PDO, Защита, Дата";
    case "L":
    return "Л/р, PDO, Защита, Оценка";
    case "M":
    return "Л/р, PDO, Защита, Учтено";  
    
    case "N":
    return "Л/р, MongoDB, Вариант";
    case "O":
    return "Л/р, MongoDB, Отработка";
    case "P":
    return "Л/р, MongoDB, Репозиторий, Адрес";
    case "Q":
    return "Л/р, MongoDB, Репозиторий, Статус";
    case "R":
    return "Л/р, MongoDB, Защита, Дата";
    case "S":
    return "Л/р, MongoDB, Защита, Оценка";
    case "T":
    return "Л/р, MongoDB, Защита, Учтено";  
    
    case "U":
    return "Л/р, AJAX, Вариант";
    case "V":
    return "Л/р, AJAX, Отработка";
    case "W":
    return "Л/р, AJAX, Репозиторий, Адрес";
    case "X":
    return "Л/р, AJAX, Репозиторий, Статус";
    case "Y":
    return "Л/р, AJAX, Защита, Дата";
    case "Z":
    return "Л/р, AJAX, Защита, Оценка";
    case "AA":
    return "Л/р, AJAX, Защита, Учтено";  
    
    case "AB":
    return "Л/р, NodeJS, Вариант";
    case "AC":
    return "Л/р, NodeJS, Отработка";
    case "AD":
    return "Л/р, NodeJS, Репозиторий, Адрес";
    case "AE":
    return "Л/р, NodeJS, Репозиторий, Статус";
    case "AF":
    return "Л/р, NodeJS, Защита, Дата";
    case "AG":
    return "Л/р, NodeJS, Защита, Оценка";
    case "AH":
    return "Л/р, NodeJS, Защита, Учтено";  
    
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
    return "Присутствие, Л/р, PDO";
    case "CA":
    return "Присутствие, Л/р, MongoDB";    
    case "CB":
    return "Присутствие, Л/р, AJAX";
    case "CC":
    return "Присутствие, Л/р, NodeJS";
    case "CD":
    return "Присутствие, Зачет";

  }

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