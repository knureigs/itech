var url = 'https://docs.google.com/spreadsheets/d/1Bvv400-fPO-Vg14FQQlwGo_pPYWcqwKmCAWC8IbC-jU/edit';
var googleSpreadsheet = SpreadsheetApp.openByUrl(url); // обрабатываемая гуглотаблица. 

function doGet(e) {
  var result = {};
  
  var mode = e.parameter.mode; // links, additional, Visiting
  switch(mode) {
    case "links":
    result[mode] = getLinks();
    break;

    case "additional":
    result[mode] = getAdditionalTasks();
    break;

    case "visiting":
    result[mode] = getVisiting();
    break;

    default:
    result = {
      "error": "Ошибка получения или обработки данных"
      };
    break;
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}