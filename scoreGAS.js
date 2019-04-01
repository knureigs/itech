//var googgleSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var googgleSpreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oJdrbWE5zMx7xWuNiTFELQBWgPux3sf7lxbaR5UjyTs/edit')

var sheets = googgleSpreadsheet.getSheets();

function Student(name, group, lb1,lb2,lb3,lb4,intime,test,idz,addition,total) {
    this.name = name;
    this.group = group;
    this.lb1 = lb1;
    this.lb2 = lb2;
    this.lb3 = lb3;
    this.lb4 = lb4;
    this.intime = intime;
    this.test = test;
    this.idz = idz;
    this.addition = addition;
    this.total = total;
}

function getData(){
    var result = [];
    for (var i = 0; i < sheets.length; i++) {
        var groupName = sheets[i].getName();
        var group = new Object();
        group.groupName = groupName;
        group.students = [];
        var lastRowNumber = sheets[i].getLastRow();      
      
        var bColumn = sheets[i].getRange('B5:B' + lastRowNumber).getDisplayValues();//name
        var fColumn = sheets[i].getRange('F5:F' + lastRowNumber).getDisplayValues();//lb1
        var iColumn = sheets[i].getRange('I5:I' + lastRowNumber).getDisplayValues();//lb2
        var lColumn = sheets[i].getRange('L5:L' + lastRowNumber).getDisplayValues();//lb3
        var oColumn = sheets[i].getRange('O5:O' + lastRowNumber).getDisplayValues();//lb4
        var pColumn = sheets[i].getRange('P5:P' + lastRowNumber).getDisplayValues();//intime
        var sColumn = sheets[i].getRange('S5:S' + lastRowNumber).getDisplayValues();//test
        var uColumn = sheets[i].getRange('U5:U' + lastRowNumber).getDisplayValues();//idz
        var vColumn = sheets[i].getRange('V5:V' + lastRowNumber).getDisplayValues();//addition
        var wColumn = sheets[i].getRange('W5:W' + lastRowNumber).getDisplayValues();//total
      
        // 4 строки на шапку
        for(var studNumber = 0; studNumber < lastRowNumber - 4; studNumber++) {
            var studName = bColumn[studNumber][0];
            var lb1 = fColumn[studNumber][0]*1;
            var lb2 = iColumn[studNumber][0]*1;
            var lb3 = lColumn[studNumber][0]*1;
            var lb4 = oColumn[studNumber][0]*1;
            var intime = pColumn[studNumber][0]*1;
            var test = sColumn[studNumber][0]*1;
            var idz = uColumn[studNumber][0]*1;
            var addition = vColumn[studNumber][0]*1;
            var total = wColumn[studNumber][0]*1;
          
            group.students.push(new Student(studName, groupName, lb1, lb2, lb3, lb4, intime, test, idz, addition, total));
        
        }    
        Logger.log(group);
        result.push(group);
    }
    return result; 
}


function doGet() {
    var data = getData();
    if(!data) {
        data = '';
    }
    var result = ContentService.createTextOutput(JSON.stringify({'groups': data})).setMimeType(ContentService.MimeType.JSON);

    return result;
    
    // return ContentService.createTextOutput(JSON.stringify({'students': data[0].students})).setMimeType(ContentService.MimeType.JSON);
}