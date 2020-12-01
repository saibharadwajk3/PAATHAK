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
    keyword.value = "";

    //request
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            currentBook = xhr.responseText;

            DocStats(currentBook);
            //replace breaks and returns with br globally
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, "<br>");
            filecontent.innerHTML = currentBook;

            filecontent.scrollTo = 0;
        }
    };
}
///document stats
function DocStats(filecontent) {
    var docLength = document.getElementById("docLength");
    var wordCount = document.getElementById("wordCount");
    let text = filecontent.toLowerCase();
    // console.log(text);

    //check for gaps and returns,break it and consider it as single word.

    //now we have array of words

    let wordArray = text.match(/\b\S+\b/g);
    // console.log(wordArray);
    //create a word dictionary(object)

    let wordDictionary = {};
    var unCommonWords = [];

    //filter uncommon words
    unCommonWords = filterNoiseWords(wordArray);

    //filter them

    for (let word in unCommonWords) {
        //word gives index number.if yoy have 5 words in unCommonWords its gives 0,1,2,3,4

        //word value is the actual value of word.say if  unCommonWords[2] is daniel it is initiated to word value
        let wordvalue = unCommonWords[word];

        //check for that word value in the dictionary object.for the first time it is undefined ,so else part will run and we place that perticular word in dictionary object and give it value of 1.
        //if the same word is encountered second time we increment that value by 1 and so on....

        if (wordDictionary[wordvalue] > 0) {
            wordDictionary[wordvalue] += 1;
        } else {
            wordDictionary[wordvalue] = 1;
        }
    }

    //calling array to get sorted array
    let wordList = sortarray(wordDictionary);
    //get top 5 words
    var top5Words = wordList.slice(0, 5);
    console.log(top5Words);
    var least5Words = wordList.slice(-5, wordList.length);
    //add to ui

    ULTemplate(top5Words, document.getElementById("mostUsed"));
    ULTemplate(least5Words, document.getElementById("leastUsed"));

    docLength.innerText = "Document Length:" + text.length;
    // console.log(wordArray);

    wordCount.innerText = "word count:" + wordArray.length;
}

function ULTemplate(items, element) {
    let resultsHTML = "";
    for (i = 0; i < items.length; i++) {
        resultsHTML += `<li>${items[i][0]}:${items[i][1]}time(s)</li> `;
    }
    element.innerHTML = resultsHTML;
}

function sortarray(obj) {
    //convert object to an array
    let rtnAarray = Object.entries(obj);
    //0 index is actual word and 1 is that word count so we sort array based on that count.
    rtnAarray.sort((x, y) => y[1] - x[1]);

    return rtnAarray;
}
//FILTER NOISE WORDS
function filterNoiseWords(wordArray) {
    var commonWords = noisewords();
    var uncommonArr = [];
    for (i = 0; i < wordArray.length; i++) {
        word = wordArray[i].trim().toLowerCase();
        if (!commonWords.includes(word)) {
            uncommonArr.push(word);
        }
    }
    return uncommonArr;
}
//noise words
function noisewords() {
    return [
        "i",
        "me",
        "my",
        "myself",
        "we",
        "our",
        "ours",
        "ourselves",
        "you",
        "your",
        "yours",
        "yourself",
        "yourselves",
        "he",
        "him",
        "his",
        "himself",
        "she",
        "her",
        "hers",
        "herself",
        "it",
        "its",
        "itself",
        "they",
        "them",
        "their",
        "theirs",
        "themselves",
        "what",
        "which",
        "who",
        "whom",
        "this",
        "that",
        "these",
        "those",
        "am",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "being",
        "have",
        "has",
        "had",
        "having",
        "do",
        "does",
        "did",
        "doing",
        "a",
        "an",
        "the",
        "and",
        "but",
        "if",
        "or",
        "because",
        "as",
        "until",
        "while",
        "of",
        "at",
        "by",
        "for",
        "with",
        "about",
        "against",
        "between",
        "into",
        "through",
        "during",
        "before",
        "after",
        "above",
        "below",
        "to",
        "from",
        "up",
        "down",
        "in",
        "out",
        "on",
        "off",
        "over",
        "under",
        "again",
        "further",
        "then",
        "once",
        "here",
        "there",
        "when",
        "where",
        "why",
        "how",
        "all",
        "any",
        "both",
        "each",
        "few",
        "more",
        "most",
        "other",
        "some",
        "such",
        "no",
        "nor",
        "not",
        "only",
        "own",
        "same",
        "so",
        "than",
        "too",
        "very",
        "s",
        "t",
        "can",
        "will",
        "just",
        "don",
        "should",
        "now",
    ];
}
//heighlight searched word
function mark() {
    var keyword = document.getElementById("keyword").value;
    var display = filecontent;
    var newContent = "";
    let spans = document.querySelectorAll("mark");
    //<mark>harry</harry>
    //harry
    for (var i = 0; i < spans.length; i++) {
        spans[i].outerHTML = spans[i].innerHTML;
    }
    if (keyword == "") {
        alert("enter a word to search");
    } else {
        var re = new RegExp(keyword, "gi");
        var replaceText = "<mark id='markme'>$&</mark>";
        var bookContent = display.innerHTML;
        //add the mark to book content
        newContent = bookContent.replace(re, replaceText);
        display.innerHTML = newContent;
        //search stat
        var count = document.querySelectorAll("mark").length;
        document.getElementById(
            "searchstat"
        ).innerHTML = `found ${count} matche(s)`;
        if (count > 0) {
            var element = document.getElementById("markme");
            element.scrollIntoView();
        }
    }
}