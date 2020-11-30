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
    keyword.value = " ";

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
    var charCount = document.getElementById("charCount");
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

    var top5Words = wordList.slice(0, 6);
    var least5Words = wordList.slice(-6, wordList.length);
    // console.log(top5Words);
    // console.log(least5Words);

    //add to ui

    ULTemplate(top5Words, document.getElementById("mostUsed"));
    ULTemplate(least5Words, document.getElementById("leastUsed"));

    docLength.innerText = "Document Length:" + text.length;
    // console.log(wordArray);

    wordCount.innerText = "word count:" + wordArray.length;
}

function ULTemplate(items, element) {
    let templateHTML = document.getElementById("template-ul-items").innerHTML;

    let resultsHTML = "";

    for (i = 0; i < items.length - 1; i++) {
        resultsHTML += templateHTML.replace(
            "{{val}}",
            items[i][0] + " : " + items[i][1] + "time(s)"
        );
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
    var commonObj = {};
    var uncommonArr = [];

    for (i = 0; i < commonWords.length; i++) {
        commonObj[commonWords[i].trim()] = true;
    }

    for (i = 0; i < wordArray.length; i++) {
        word = wordArray[i].trim().toLowerCase();

        if (!commonObj[word]) {
            uncommonArr.push(word);
        }
    }
    return uncommonArr;
}
//noise words

function noisewords() {
    return [
        "i",
        "said",
        "like",
        "don't",
        "a",
        "about",
        "above",
        "above",
        "across",
        "after",
        "afterwards",
        "again",
        "against",
        "all",
        "almost",
        "alone",
        "along",
        "already",
        "also",
        "although",
        "always",
        "am",
        "among",
        "amongst",
        "amoungst",
        "amount",
        "an",
        "and",
        "another",
        "any",
        "anyhow",
        "anyone",
        "anything",
        "anyway",
        "anywhere",
        "are",
        "around",
        "as",
        "at",
        "back",
        "be",
        "became",
        "because",
        "become",
        "becomes",
        "becoming",
        "been",
        "before",
        "beforehand",
        "behind",
        "being",
        "below",
        "beside",
        "besides",
        "between",
        "beyond",
        "bill",
        "both",
        "bottom",
        "but",
        "by",
        "call",
        "can",
        "cannot",
        "cant",
        "co",
        "con",
        "could",
        "couldnt",
        "cry",
        "de",
        "describe",
        "detail",
        "do",
        "done",
        "down",
        "due",
        "during",
        "each",
        "eg",
        "eight",
        "either",
        "eleven",
        "else",
        "elsewhere",
        "empty",
        "enough",
        "etc",
        "even",
        "ever",
        "every",
        "everyone",
        "everything",
        "everywhere",
        "except",
        "few",
        "fifteen",
        "fify",
        "fill",
        "find",
        "fire",
        "first",
        "five",
        "for",
        "former",
        "formerly",
        "forty",
        "found",
        "four",
        "from",
        "front",
        "full",
        "further",
        "get",
        "give",
        "go",
        "had",
        "has",
        "hasnt",
        "have",
        "he",
        "hence",
        "her",
        "here",
        "hereafter",
        "hereby",
        "herein",
        "hereupon",
        "hers",
        "herself",
        "him",
        "himself",
        "his",
        "how",
        "however",
        "hundred",
        "ie",
        "if",
        "in",
        "inc",
        "indeed",
        "interest",
        "into",
        "is",
        "it",
        "its",
        "itself",
        "keep",
        "last",
        "latter",
        "latterly",
        "least",
        "less",
        "ltd",
        "made",
        "many",
        "may",
        "me",
        "meanwhile",
        "might",
        "mill",
        "mine",
        "more",
        "moreover",
        "most",
        "mostly",
        "move",
        "much",
        "must",
        "my",
        "myself",
        "name",
        "namely",
        "neither",
        "never",
        "nevertheless",
        "next",
        "nine",
        "no",
        "nobody",
        "none",
        "noone",
        "nor",
        "not",
        "nothing",
        "now",
        "nowhere",
        "of",
        "off",
        "often",
        "on",
        "once",
        "one",
        "only",
        "onto",
        "or",
        "other",
        "others",
        "otherwise",
        "our",
        "ours",
        "ourselves",
        "out",
        "over",
        "own",
        "part",
        "per",
        "perhaps",
        "please",
        "put",
        "rather",
        "re",
        "same",
        "see",
        "seem",
        "seemed",
        "seeming",
        "seems",
        "serious",
        "several",
        "she",
        "should",
        "show",
        "side",
        "since",
        "sincere",
        "six",
        "sixty",
        "so",
        "some",
        "somehow",
        "someone",
        "something",
        "sometime",
        "sometimes",
        "somewhere",
        "still",
        "such",
        "system",
        "take",
        "ten",
        "than",
        "that",
        "the",
        "their",
        "them",
        "themselves",
        "then",
        "thence",
        "there",
        "thereafter",
        "thereby",
        "therefore",
        "therein",
        "thereupon",
        "these",
        "they",
        "thick",
        "thin",
        "third",
        "this",
        "those",
        "though",
        "three",
        "through",
        "throughout",
        "thru",
        "thus",
        "to",
        "together",
        "too",
        "top",
        "toward",
        "towards",
        "twelve",
        "twenty",
        "two",
        "un",
        "under",
        "until",
        "up",
        "upon",
        "us",
        "very",
        "via",
        "was",
        "we",
        "well",
        "were",
        "what",
        "whatever",
        "when",
        "whence",
        "whenever",
        "where",
        "whereafter",
        "whereas",
        "whereby",
        "wherein",
        "whereupon",
        "wherever",
        "whether",
        "which",
        "while",
        "whither",
        "who",
        "whoever",
        "whole",
        "whom",
        "whose",
        "why",
        "will",
        "with",
        "within",
        "without",
        "would",
        "yet",
        "you",
        "your",
        "yours",
        "yourself",
        "yourselves",
        "the",
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

    var re = new RegExp(keyword, "gi");

    var replaceText = "<mark id='markme'>$&</mark>";
    var bookContent = display.innerHTML;
    //add the mark to book content
    newContent = bookContent.replace(re, replaceText);
    console.log(newContent);
    display.innerHTML = newContent;
    console.log(display);

    var count = document.querySelectorAll("mark").length;

    document.getElementById("searchstat").innerHTML =
        "found" + " " + count + " " + "matche(s)";

    if (count > 0) {
        var element = document.getElementById("markme");

        element.scrollIntoView();
    }
}