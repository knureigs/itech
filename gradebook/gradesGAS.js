var googgleSpreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1y226Vw62Mj3lzipA-VYFrFjpU5U_J_QMizsV7TlXAYU/edit'); // Gradebook_ITech1_2020-21

var sheets = googgleSpreadsheet.getSheets();

function Student(fio, groupName, lb1var, lb1repository, lb1grade, lb2var, lb2repository, lb2grade, lb3var, lb3repository, lb3grade, lb4var, lb4repository, lb4grade, intime, test, idzRepository, idz, additionRepository, addition, total) {
    this.fio = fio;
    this.groupName = groupName;

    this.lb1var = lb1var;
    this.lb1repository = lb1repository;
    this.lb1grade = lb1grade;

    this.lb2var = lb2var;
    this.lb2repository = lb2repository;
    this.lb2grade = lb2grade;

    this.lb3var = lb3var;
    this.lb3repository = lb3repository;
    this.lb3grade = lb3grade;
    
    this.lb4var = lb4var;
    this.lb4repository = lb4repository;
    this.lb4grade = lb4grade;

    this.intime = intime;
    this.test = test;

    this.idzRepository = idzRepository;
    this.idz = idz;

    this.additionRepository = additionRepository;
    this.addition = addition;

    this.total = total;
}

function getData(){
    var result = [];

    // TODO: лист статистики не учитывать, поэтому не length, а length-1. 
    // А лучше перечень нужных листов или их количество брать из Config-листа таблицы WebSite_ITech.
    // for (var i = 0; i < sheets.length; i++) { 
    for (var i = 0; i < sheets.length-1; i++) {
        var group = {};
        var groupName = sheets[i].getName();
        group.groupName = groupName;                                                // groupName
        group.relevanceDate = sheets[i].getRange("A3").getDisplayValue();
        group.deadline = sheets[i].getRange("AD4").getDisplayValue();
        group.students = [];
        
        var lastRowNumber = sheets[i].getLastRow();
        var bColumn = sheets[i].getRange('B5:B' + lastRowNumber).getDisplayValues();//fio

        var fColumn = sheets[i].getRange('F5:F' + lastRowNumber).getValues();       //lb1var
        var gColumn = sheets[i].getRange('G5:G' + lastRowNumber).getValues();       //lb1repository
        var kColumn = sheets[i].getRange('K5:K' + lastRowNumber).getValues();       //lb1grade

        var lColumn = sheets[i].getRange('L5:L' + lastRowNumber).getValues();       //lb2var
        var mColumn = sheets[i].getRange('M5:M' + lastRowNumber).getValues();       //lb2repository
        var qColumn = sheets[i].getRange('Q5:Q' + lastRowNumber).getValues();       //lb2grade

        var rColumn = sheets[i].getRange('R5:R' + lastRowNumber).getValues();       //lb3var
        var sColumn = sheets[i].getRange('S5:S' + lastRowNumber).getValues();       //lb3repository
        var wColumn = sheets[i].getRange('W5:W' + lastRowNumber).getValues();       //lb3grade

        var xColumn = sheets[i].getRange('X5:X' + lastRowNumber).getValues();       //lb4var
        var yColumn = sheets[i].getRange('Y5:Y' + lastRowNumber).getValues();       //lb4repository
        var acColumn = sheets[i].getRange('AC5:AC' + lastRowNumber).getValues();    //lb4grade

        var adColumn = sheets[i].getRange('AD5:AD' + lastRowNumber).getValues();    //intime
        var agColumn = sheets[i].getRange('AG5:AG' + lastRowNumber).getValues();    //test

        var aiColumn = sheets[i].getRange('AI5:AI' + lastRowNumber).getValues();    //idzRepository
        var akColumn = sheets[i].getRange('AK5:AK' + lastRowNumber).getValues();    //idz

        var amColumn = sheets[i].getRange('AM5:AM' + lastRowNumber).getValues();    //additionRepository
        var aoColumn = sheets[i].getRange('AO5:AO' + lastRowNumber).getValues();    //addition

        var avColumn = sheets[i].getRange('AV5:AV' + lastRowNumber).getValues();    //total
      
        // 4 строки на шапку
        for(var studNumber = 0; studNumber < lastRowNumber - 4; studNumber++) {
            var fio = bColumn[studNumber][0];

            var lb1var = fColumn[studNumber][0];
            var lb1repository = gColumn[studNumber][0] == "" ? false : true;
            var lb1grade = kColumn[studNumber][0];

            var lb2var = lColumn[studNumber][0];
            var lb2repository = mColumn[studNumber][0] == "" ? false : true;
            var lb2grade = qColumn[studNumber][0];

            var lb3var = rColumn[studNumber][0];
            var lb3repository = sColumn[studNumber][0] == "" ? false : true;
            var lb3grade = wColumn[studNumber][0];

            var lb4var = xColumn[studNumber][0];
            var lb4repository = yColumn[studNumber][0] == "" ? false : true;
            var lb4grade = acColumn[studNumber][0];

            var intime = adColumn[studNumber][0];
            var test = agColumn[studNumber][0];

            var idzRepository = aiColumn[studNumber][0];
            var idz = akColumn[studNumber][0];

            var additionRepository = amColumn[studNumber][0];
            var addition = aoColumn[studNumber][0];

            var total = avColumn[studNumber][0];
          
            group.students.push(new Student(fio, groupName, lb1var, lb1repository, lb1grade, lb2var, lb2repository, lb2grade, lb3var, lb3repository, lb3grade, lb4var, lb4repository, lb4grade, intime, test, idzRepository, idz, additionRepository, addition, total));
        
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