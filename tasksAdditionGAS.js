var googgleSpreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1PuDhSF_EhDXi6Vs-if8Cc8XPHip8t8LZ5IQx37a-Zgo/edit')

function TaskAddition(title, description, estimate, limited) {
    this.title = title;
    this.description = description;
    this.estimate = estimate;
    this.limited = limited;
}

function getData(){
    var result = [];
    var sheet = googgleSpreadsheet.getActiveSheet();

    var lastRowNumber = sheet.getLastRow(); 
    var aColumn = sheet.getRange('A2:A' + lastRowNumber).getDisplayValues();//display
    var bColumn = sheet.getRange('B2:B' + lastRowNumber).getDisplayValues();//active
    var cColumn = sheet.getRange('C2:C' + lastRowNumber).getDisplayValues();//limited
    var dColumn = sheet.getRange('D2:D' + lastRowNumber).getDisplayValues();//title
    var eColumn = sheet.getRange('E2:E' + lastRowNumber).getDisplayValues();//description
    var fColumn = sheet.getRange('F2:F' + lastRowNumber).getDisplayValues();//estimate
      
    // 1 строка на шапку
    for(var taskNumber = 0; taskNumber < lastRowNumber - 1; taskNumber++) {
        var display = aColumn[taskNumber][0];
        var active = bColumn[taskNumber][0];
        var limited = cColumn[taskNumber][0];
        var title = dColumn[taskNumber][0];
        var description = eColumn[taskNumber][0];
        var estimate = fColumn[taskNumber][0];
        
        if(display=="TRUE" && active=="TRUE" && title!="") {
            var task = new TaskAddition(title,description,estimate,limited);
            Logger.log(task);
            result.push(task);
        }    
    }
    return result; 
}


function doGet() {
    var data = getData();
    if(!data) {
        data = '';
    }
    var result = ContentService.createTextOutput(JSON.stringify({'additionTasks': data})).setMimeType(ContentService.MimeType.JSON);

    return result;
}