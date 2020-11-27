// grab references
let booktitle = document.getElementById("booktitle");
let searchstat = document.getElementById("searchstat");
let keyword = document.getElementById("keyword");
let filecontent = document.getElementById("filecontent");
let mostUsed = document.getElementById("mostUsed");
let leastUsed = document.getElementById("leastUsed");
let docStats = document.getElementById("docStats");

//Loading book into majn body

function loadbook(filename, displayname) {
    let currentBook = "";
    let url = "books/" + filename;

    //reseat user interface
    booktitle.innerHTML = displayname;
    searchstat.innerHTML = "";
    keyword.innerHTML = "";

    //request
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            currentBook = xhr.responseText;
            //removes breaks and returns with br globally
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, "<br>");
            filecontent.innerHTML = currentBook;

            filecontent.scrollTo = 0;
        }
    };
}