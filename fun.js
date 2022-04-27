console.log("hello");
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addtitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj={
        title:addtitle.value,
        text:addTxt.value
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addtitle.value = "";
    console.log(notesObj);

    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard" my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Notes ${element.title}</h5>
            <p class="card-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;

    });
    let notesElm = document.getElementById('notes');
    if (notes.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! use "Add a Note" section above to add notes.`
    }

}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
searchTxt.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName('noteCard')

    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})