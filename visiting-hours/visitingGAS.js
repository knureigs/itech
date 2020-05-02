var googgleSpreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1Bvv400-fPO-Vg14FQQlwGo_pPYWcqwKmCAWC8IbC-jU/edit'); // обрабатываемая гуглотаблица. 

function TimetableUnit(visitingDate,visitingWeekDay,visitingBeginTime,visitingEndTime,comment) {
    this.visitingDate = visitingDate;
    this.visitingWeekDay = visitingWeekDay;
    this.visitingBeginTime = visitingBeginTime;
    this.visitingEndTime = visitingEndTime;
    this.comment = comment;
}

function getData(){
    var result = {};
    var sheet = googgleSpreadsheet.getSheetByName("Visiting"); // лист в таблице, в котором содержатся данные о графике приема. 

    var dataDescription = sheet.getRange("B3").getDisplayValue();
    result.description = dataDescription;
    result.timetable = [];

    // var lastRowNumber = sheet.getLastRow(); 
    var firstRowNumber = 6; 
    var lastRowNumber = 18; 
    var bColumn = sheet.getRange('B' + firstRowNumber + ':B' + lastRowNumber).getDisplayValues();//visitingDate
    var cColumn = sheet.getRange('C' + firstRowNumber + ':C' + lastRowNumber).getDisplayValues();//visitingWeekDay
    var dColumn = sheet.getRange('D' + firstRowNumber + ':D' + lastRowNumber).getDisplayValues();//visitingBeginTime
    var eColumn = sheet.getRange('E' + firstRowNumber + ':E' + lastRowNumber).getDisplayValues();//visitingEndTime
    var fColumn = sheet.getRange('F' + firstRowNumber + ':F' + lastRowNumber).getDisplayValues();//comment
      
    // 1 строка на шапку
    for(var unitNumber = 0; unitNumber < lastRowNumber - firstRowNumber + 1; unitNumber++) {
        var visitingDate = bColumn[unitNumber][0];
        var visitingWeekDay = cColumn[unitNumber][0];
        var visitingBeginTime = dColumn[unitNumber][0];
        var visitingEndTime = eColumn[unitNumber][0];
        var comment = fColumn[unitNumber][0];

        var timetableUnit = new TimetableUnit(visitingDate,visitingWeekDay,visitingBeginTime,visitingEndTime,comment);
        Logger.log(visit);
        result.timetable.push(timetableUnit);
    }
    return result; 
}


function doGet() {
    var data = getData();
    if(!data) {
        data = '';
    }
    var result = ContentService.createTextOutput(JSON.stringify({'visiting': data})).setMimeType(ContentService.MimeType.JSON);

    return result;
}