



    //checkstate du type de média
    if (images[currentImageIndex].media_type == "image") {

        const elem = document.getElementById('apodimage');
        if (elem.tagName != 'IMG') {
            const newImage = document.createElement('img');
            newImage.id = "apodimage";
            newImage.src = "CX";
            newImage.alt = "CX";
            newImage.height = "500";
            newImage.onclick = "openMedia()";
            elem.replaceWith(newImage);
        };

        document.getElementById('apodimage').src = images[currentImageIndex].hdurl;
        document.getElementById('apodimage').alt = images[currentImageIndex].alt;
        console.log("image");
    }
    else if (images[currentImageIndex].media_type == "video"){

        //debug
        console.log("video");
        //récup de la balise <img> actuelle
        const oldImageFrame = document.getElementById('apodimage');
        //récupération et formatage du code html de la page de la nasa
        const extractedSource = webExtractIframeSource(images[currentImageIndex].basic_html);
        //création de l'iFrame
        const newIframe = document.createElement('iframe');
        newIframe.src = extractedSource;
        newIframe.id = "apodimage";
        console.log("new iframe is : ", newIframe);
        //remplacement de l'image avec l'iframe
        oldImageFrame.replaceWith(newIframe);

    }
    else {
        console.log("unsupported media type")
    }