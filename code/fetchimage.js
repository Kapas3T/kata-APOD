let currentImageIndex = 0;
let images = [];


fetch('https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=cwtgnChFmL9cQGpQMprjF9JGnmjpTdWGJcjNrMkM')
    .then((data) => data.json())
    .then((data) => {
        images = data;
        loadInfo(0);
    });

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
            newImage.width = "700";
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
        newIframe.width = "700";
        newIframe.height = "500";

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
    document.getElementById("imagelink").href = images[currentImageIndex].hdurl;
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

function prevImg() {
    loadInfo(currentImageIndex + 1);
}

function nextImg() {
    loadInfo(currentImageIndex - 1);
}