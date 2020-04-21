// var googgleSpreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1oJdrbWE5zMx7xWuNiTFELQBWgPux3sf7lxbaR5UjyTs/edit')
var googgleSpreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1K46fXyLxWMy_q7eyb75rGgcAVcypGgn4CA08e4fb3p4/edit');

var sheets = googgleSpreadsheet.getSheets();

function Student(name, group, lb1, lb1repository, lb2, lb2repository, lb3, lb3repository, lb4, lb4repository, intime, test, idz, addition,total) {
    this.name = name;
    this.group = group;
    this.lb1 = lb1;
    this.lb1repository = lb1repository;
    this.lb2 = lb2;
    this.lb2repository = lb2repository;
    this.lb3 = lb3;
    this.lb3repository = lb3repository;
    this.lb4 = lb4;
    this.lb4repository = lb4repository;
    this.intime = intime;
    this.test = test;
    this.idz = idz;
    this.addition = addition;
    this.total = total;
}

function getData(){
    var result = [];
    for (var i = 0; i < sheets.length; i++) {
        var group = {};
        var groupName = sheets[i].getName();
        group.groupName = groupName;
        group.relevanceDate = sheets[i].getRange("B3").getDisplayValue();
        group.students = [];
        
        var lastRowNumber = sheets[i].getLastRow();
        var bColumn = sheets[i].getRange('B5:B' + lastRowNumber).getDisplayValues();//name
        var lColumn = sheets[i].getRange('L5:L' + lastRowNumber).getValues();//lb1
        var gColumn = sheets[i].getRange('G5:G' + lastRowNumber).getValues();//lb1repository
        var tColumn = sheets[i].getRange('T5:T' + lastRowNumber).getValues();//lb2
        var oColumn = sheets[i].getRange('O5:O' + lastRowNumber).getValues();//lb2repository
        var abColumn = sheets[i].getRange('AB5:AB' + lastRowNumber).getValues();//lb3
        var wColumn = sheets[i].getRange('W5:W' + lastRowNumber).getValues();//lb3repository
        var ajColumn = sheets[i].getRange('AJ5:AJ' + lastRowNumber).getValues();//lb4
        var aeColumn = sheets[i].getRange('AE5:AE' + lastRowNumber).getValues();//lb4repository
        var akColumn = sheets[i].getRange('AK5:AK' + lastRowNumber).getValues();//intime
        var apColumn = sheets[i].getRange('AP5:AP' + lastRowNumber).getValues();//test
        var atColumn = sheets[i].getRange('AT5:AT' + lastRowNumber).getValues();//idz
        var auColumn = sheets[i].getRange('AU5:AU' + lastRowNumber).getValues();//addition
        var avColumn = sheets[i].getRange('AV5:AV' + lastRowNumber).getValues();//total
      
        // 4 строки на шапку
        for(var studNumber = 0; studNumber < lastRowNumber - 4; studNumber++) {
            var studName = bColumn[studNumber][0];
            var lb1 = lColumn[studNumber][0];
            var lb1repository = gColumn[studNumber][0] == "" ? false : true;
            var lb2 = tColumn[studNumber][0];
            var lb2repository = oColumn[studNumber][0] == "" ? false : true;
            var lb3 = abColumn[studNumber][0];
            var lb3repository = wColumn[studNumber][0] == "" ? false : true;
            var lb4 = ajColumn[studNumber][0];
            var lb4repository = aeColumn[studNumber][0] == "" ? false : true;
            var intime = akColumn[studNumber][0];
            var test = apColumn[studNumber][0];
            var idz = atColumn[studNumber][0];
            var addition = auColumn[studNumber][0];
            var total = avColumn[studNumber][0];
          
            group.students.push(new Student(studName, groupName, lb1, lb1repository, lb2, lb2repository, lb3, lb3repository, lb4, lb4repository, intime, test, idz, addition, total));
        
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
}