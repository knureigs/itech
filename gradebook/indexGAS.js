var spreadsheets = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1TWn7IN2_S0N6Wf4abXHJ3iXD5j-7yRggBYu5i9HM3IQ/edit'); // Gradebook_ITech2_2021-22

function doGet(e) {
  if(e === undefined || e.parameter === undefined || e.parameter.groupName === undefined) {
    group = "";
  }
  else {
    var groupName = e.parameter.groupName;
    //var groupName = "КІУКІ-18-3";
    var data = getGradebookData(groupName);
    if(!data) {
        data = '';
    }
    
    var group = JSON.stringify({'group': data});
  }
  //Logger.log(group);
  
  var result = ContentService.createTextOutput(group).setMimeType(ContentService.MimeType.JSON);
  return result;
}