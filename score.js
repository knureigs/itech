let xhr = new XMLHttpRequest();
let app = "https://script.google.com/macros/s/AKfycbxRCIPu2MO4A5w4eAf361pxDKQlqkufN-IOqDgwOW64ruQfYlw/exec";

createGroupListbox();

function createGroupListbox() {
    let output = "";
    xhr.open('GET', app);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        
        if (xhr.status == 200) {
            try {
                let r = JSON.parse(xhr.responseText);
                let result = r.groups;
                for (var i = 0; i < result.length; i++) {
                    var obj = result[i];
                    output += "<option>" + obj + "</option>";
                }
            } catch(e) {

            }
        }
        document.getElementById('groups').innerHTML = output; 
    };
    xhr.send();
}