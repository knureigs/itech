var googgleSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheets = googgleSpreadsheet.getSheets();

function getData(){
    var result = [];
    
    for (var i = 0; i < sheets.length; i++) {
        result.push(sheets[i].getName());     
  }
  return result; 
}


function doGet() {
    var data = getData();
    if(!data) {
        data = '';
    }
    
    return ContentService.createTextOutput(JSON.stringify({'groups': data})).setMimeType(ContentService.MimeType.JSON);
}