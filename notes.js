let btnSave = document.getElementById('btnSave');
let notes = "";
init();

function init(){
    let out = "";
    let noteArray = JSON.parse(localStorage.getItem('noteData'));

    if(noteArray != null && noteArray != ""){
        noteArray = JSON.parse(localStorage.getItem("noteData"));

        for(let i=0; i < noteArray.length; i++){
            out += "<option value =" + i + ">";
            out += noteArray[i].title;
            out += "</option>";

            document.getElementById('noteMaster').innerHTML = out;
        }

        document.getElementById('btnWrite').addEventListener('click', function(e){
            writeNote();
        });

        document.getElementById('noteMaster').addEventListener('click', function(e){
            displayNote(e.target.value);
        })
        readNotes();
    } else {
        writeNote();
    }
}

function writeNote(){
    document.getElementById('read').style.display = 'none';
    document.getElementById('write').style.display = 'block';
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = "";
}

function readNotes(){
    document.getElementById('read').style.display = 'block';
    document.getElementById('write').style.display = 'none';
}


function displayNote(note){
    let noteArray = JSON.parse(localStorage.getItem('noteData'));
    let out = "<h2>" + noteArray[note].title + "</h2>";
    out += "<h2>Date: " + new Date(noteArray[note].date).toDateString() + "</h4>";
    out += "<p>" + noteArray[note].body + "</p>";
    out += "<button id='btnDelete'>Delete</button>"
    document.getElementById('noteDisplay').innerHTML = out;

    document.getElementById('btnDelete').onclick = function(){
        noteArray.splice(note,1);
        localStorage.setItem('noteData', JSON.stringify(noteArray));
        init();
    }
}

btnSave.onclick = function(){
    const noteDate = new Date();
    const noteTitle = document.getElementById('noteTitle').value;
    const noteBody = document.getElementById('noteBody').value;
    const theNote = new Note(noteDate, noteTitle, noteBody);
    saveNotes(theNote);
}

function saveNotes(note){
    let noteArray = JSON.parse(localStorage.getItem('noteData'));
    if(noteArray == null){
        noteArray = new Array();
        noteArray.push(note);
    } else {
        noteArray.push(note);
    }
    localStorage.setItem('noteData', JSON.stringify(noteArray));
    readNotes();
    init();
}
