/**sidebar*/
function openFolder(evt,content){
    var i, contnt, tabcontnt;
    contnt = document.getElementsByClassName('content');
    for(i=0; i<contnt.length; i++){
        contnt[i].className = contnt[i].className.replace(" active", "")
    }
    tabcontnt = document.getElementsByClassName('tabcontent');
    for(i=0; i<tabcontnt.length; i++){
        tabcontnt[i].style.display = "none";
    }

    document.getElementById(content).style.display = "block";
    evt.currentTarget.className += " active";
}


/* settings*/
function settingsInfo(evt, cont){
    var i, gen_content, general;
    gen_content = document.getElementsByClassName('general-tabcontent');
    for(i=0; i<gen_content.length; i++){
    gen_content[i].style.display = "none";
    }
    
    general = document.getElementsByClassName('general');
    for(i=0; i<general.length; i++){
        general[i].className = general[i].className.replace(" active", "");
    }

    document.getElementById(cont).style.display = "block";
    evt.currentTarget.className += " active";
    
}

document.getElementById("defaultOpen").click();

