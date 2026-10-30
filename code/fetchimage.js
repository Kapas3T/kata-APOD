let currentImageIndex = 0;
let images = [];
let apodURL = 0;

//URLSEARCHPARAMS
let params = new URLSearchParams(document.location.search);
let date = params.get("date");

function fetchimage(apodkey){

    apodURL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic/";

    if (apodkey != null){
        apodURL = apodURL + "?api_key=" + apodkey;
    }
    else{
        apodkey = "DEMO_KEY";
    };
    if (date != null) {
        apodURL = apodURL + "?date_from=" + date + "&date_to=" + getDate();
    } else {};


    fetch(apodURL)
    .then((data) => data.json())
    .then((data) => {
        images = data;
        loadInfo(0);
    });
    console.log("api key in use : ", apodkey, "\n current URL : " + apodURL);
};

function loadInfo(index) {
    // fonction de clamp matématique. histoire d'éviter de sotir de l'array.
    currentImageIndex = Math.max(0, Math.min(index, 24));

    //checkstate du type de média
    if (images[currentImageIndex].media_type == "image") {

        const elem = document.getElementById('media-image');
        if (elem.tagName != 'IMG') {
            const newImage = document.createElement('img');
            newImage.id = "media-image";
            newImage.src = "CX";
            newImage.alt = "CX";
            elem.replaceWith(newImage);
        };
        document.getElementById('media-image').src = images[currentImageIndex].hdurl;
        document.getElementById('media-image').alt = images[currentImageIndex].alt;
    }
    else if (images[currentImageIndex].media_type == "video") {
        //récup de la balise <img> actuelle
        const oldImageFrame = document.getElementById('media-image');
        const src = webExtractIframeSource(images[currentImageIndex].basic_html);
        
        const newIframe = document.createElement('iframe');
        newIframe.src = src;
        newIframe.id = "media-image";
        newIframe.width = 1200;
        newIframe.height = 700;

        oldImageFrame.replaceWith(newIframe);
    }
    else {
        errorMessage();
    };  

    //Chargement du titre
    document.getElementById("apod-title").textContent = images[currentImageIndex].title;
    //Chargement de la date
    document.getElementById("apod-date").textContent = images[currentImageIndex].date;
    //Chargement du sous-titre
    document.getElementById("apod-description").innerHTML = images[currentImageIndex].explanation;
    //Chargement du copyright
    document.getElementById("apod-copyright").innerHTML = "Copyright & Credit : " + images[currentImageIndex].copyright;
    //Chargement du Titre de la page
    document.getElementById("title").textContent = "KATA - APOD " + images[currentImageIndex].date;
    //Chargement du sub-Link de redirection
    document.getElementById("imagelink").href = images[currentImageIndex].url;
}

function webExtractIframeSource(inputString) {

    const regex = /youtube\.com\/embed\/[^"]*/;
    const match = inputString.match(regex);


    if (match == null) {
        console.log('oops')
        errorMessage();
    };

    const result = "https://" + match;
    return result;
}

function errorMessage() {
    //récup de la balise <img> actuelle
        const oldImageFrame = document.getElementById('media-image');
        
        //Préparation d'un nouvel element <a href> pour que le code soit nul, mais proprement nul.
        const newHrefForTheNewElement = document.createElement('a');
        newHrefForTheNewElement.href = images[currentImageIndex].url;   
        newHrefForTheNewElement.textContent = "here.";

        console.log(newHrefForTheNewElement);

        //écriture du message
        const newElement = document.createElement('p');
        newElement.id = "media-image";
        newElement.innerHTML = "Sorry, we do not support this kind of media.<br> However, you can still access this media by clicking on this link.";

        oldImageFrame.replaceWith(newElement);
}

function getDate(){
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const stamp = `${yy}${mm}${dd}`;

    const prior = now.setDate(now.getDate() - 24);

    console.log("today is : ", stamp + ", yesterday was " + prior);
    return stamp;
}

function prevImg() {
    loadInfo(currentImageIndex + 1);
}

function nextImg() {
    loadInfo(currentImageIndex - 1);
}

function addApiKey() {
    let APIKEY = prompt("What is your NASA APOD API Key");
    fetchimage(APIKEY);
}

fetchimage();