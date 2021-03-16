function AdditionalTask(title, description, estimate, limited) {
    this.title = title;
    this.description = description;
    this.estimate = estimate;
    this.limited = limited;
}

function getAdditionalTasks(){
    var result = {};
    var sheet = googleSpreadsheet.getSheetByName("AdditionalTasks"); // лист в таблице, в котором содержатся данные о дополнительных заданиях.

    var dataDescription = sheet.getRange("A5").getDisplayValue();
    result.description = dataDescription;
    result.taskList = [];

    var firstRowNumber = 9; 
    var lastRowNumber = sheet.getLastRow(); 
    var aColumn = sheet.getRange('A' + firstRowNumber + ':A' + lastRowNumber).getDisplayValues();//display
    var bColumn = sheet.getRange('B' + firstRowNumber + ':B' + lastRowNumber).getDisplayValues();//active
    var cColumn = sheet.getRange('C' + firstRowNumber + ':C' + lastRowNumber).getDisplayValues();//limited
    var dColumn = sheet.getRange('D' + firstRowNumber + ':D' + lastRowNumber).getDisplayValues();//title
    var eColumn = sheet.getRange('E' + firstRowNumber + ':E' + lastRowNumber).getDisplayValues();//description
    var fColumn = sheet.getRange('F' + firstRowNumber + ':F' + lastRowNumber).getDisplayValues();//estimate
      
    for(var taskNumber = 0; taskNumber < lastRowNumber - firstRowNumber + 1; taskNumber++) {
        var display = aColumn[taskNumber][0];
        var active = bColumn[taskNumber][0];
        var limited = cColumn[taskNumber][0];
        var title = dColumn[taskNumber][0];
        var description = eColumn[taskNumber][0];
        var estimate = fColumn[taskNumber][0];
        
        if(display=="TRUE" && active=="TRUE" && title!="") {
            var task = new AdditionalTask(title, description, estimate, limited);
            //Logger.log(task);
            result.taskList.push(task);
        }    
    }
    return result; 
}