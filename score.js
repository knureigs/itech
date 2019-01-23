let xhr = new XMLHttpRequest();
let app = "https://script.google.com/macros/s/AKfycbxRCIPu2MO4A5w4eAf361pxDKQlqkufN-IOqDgwOW64ruQfYlw/exec";
let groups;

createGroupListbox();

function createGroupListbox() {
    let output = "";
    xhr.open('GET', app);
    //xhr.open('GET', "temp.json");
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        
        if (xhr.status == 200) {
            try {
                //console.dir(xhr.responseText);
                let r = JSON.parse(xhr.responseText);                
                //console.dir(r);
                groups = r.groups;
                //console.dir(groups);
                for (var i = 0; i < groups.length; i++) {
                    output += "<option>" + groups[i].groupName + "</option>";
                }
            } catch(e) {

            }
        }
        document.getElementById('groups').innerHTML += output; 
    };
    xhr.send();
}