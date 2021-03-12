function Lecture(name,link) {
  this.name = name;
  this.link = link;
}

function getLinks() {
  var result = {};
  var sheet = googleSpreadsheet.getSheetByName("FileLinks"); // лист в таблице, в котором содержатся данные о ссылках на учебные материалы вне ресурса. 

  result.semesterFirstQuestionsTest = sheet.getRange("B5").getDisplayValue();
  result.semesterFirstHomework = sheet.getRange("B6").getDisplayValue();
  result.semesterFirstLectures = [];

  result.semesterSecondQuestionsTest = sheet.getRange("E5").getDisplayValue();
  result.semesterSecondHomework = sheet.getRange("E6").getDisplayValue();
  result.semesterSecondQuestionsExam = sheet.getRange("E7").getDisplayValue();
  result.semesterSecondLectures = [];
    
  var rowIndexStart = 11; // номер строки, с которой начинается список материалов лекций обоих семестров.
  var Direction = SpreadsheetApp.Direction;
  var rowIndexEnd = sheet.getRange("A" + (sheet.getLastRow() + 1)).getNextDataCell(Direction.UP).getRow() + 1;
  for(var rowIndex = rowIndexStart; rowIndex < rowIndexEnd; rowIndex++) {
    var lectureName = sheet.getRange("A" + rowIndex).getDisplayValue();
    var lectureLink = sheet.getRange("B" + rowIndex).getDisplayValue();
    var lecture = new Lecture(lectureName, lectureLink)
    result.semesterFirstLectures.push(lecture);
  }
  rowIndexEnd = sheet.getRange("D" + (sheet.getLastRow() + 1)).getNextDataCell(Direction.UP).getRow() + 1;
  for(var rowIndex = rowIndexStart; rowIndex < rowIndexEnd; rowIndex++) {
    var lectureName = sheet.getRange("D" + rowIndex).getDisplayValue();
    var lectureLink = sheet.getRange("E" + rowIndex).getDisplayValue();
    var lecture = new Lecture(lectureName, lectureLink)
    result.semesterSecondLectures.push(lecture);
  }

  return result; 
}
