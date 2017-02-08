// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    //dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page

/*
$$('#camara').on('click', function () {

            myApp.alert('Click detected');

            navigator.camera.getPicture(onSuccess, onFail,
            { 
                quality: 20,
                allowEdit: true,
                //destinationType: destinationType.FILE_URI
                destinationType: Camera.DestinationType.FILE_URI
            }); 

            function onSuccess(imageURI) {
                myApp.alert( 'Bien');
                var image = document.getElementById('myImage');
                image.src = imageURI;
            }

            function onFail(message) {
                myApp.alert('Failed because: ' + message);
            }

 });*/


    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }



var newPageContent = '<div  class="page" data-page="fotocam">'+
                                              '<div class="custom-accordion">'+
                                              '<div class="accordion-item">'+
                                                '<div id="fot1" class="navbar">'+
                                                  '<div class="navbar-inner">'+
                                                    '<div class="left">'+
                                                      '<a href="materia.html" class="back link icon-only">'+
                                                        '<i class="icon icon-back"></i>'+
                                                      '</a>'+
                                                    '</div>'+
                                                    '<div style="font-size: 80%">IMG-001</div>'+
                                                    '<div class="right">'+
                                                       '<i class="material-icons">&#xE5D4;</i>'+
                                                      
                                                    '</div>'+
                                                  '</div> '+          
                                                '</div>'+

                                                '<div class="accordion-item-content">'+
                                                  '<form data-search-list=".search-here" data-search-in=".item-title" class="searchbar searchbar-init">'+
                                                    '<div class="searchbar-input">'+
                                                      '<input type="search" placeholder="Buscar"/><a href="#" class="searchbar-clear"></a>'+
                                                    '</div>'+
                                                  '</form>'+
                                                '</div>'+
                                              '</div>'+
                                            '</div>'+
                                             '<div id="fot2" class="page-content"> '+
                                               
                                                '<div class="content-block">'+
                                                  '<div class="content-block-inner">'+
                                                    '<p>'+
                                                      '<br>'+
                                                      '<img id="campic" src="img/ap1.jpg" width="100%" height="200%">'+
                                                    '</p>'+
                                                  '</div>'+
                                                '</div>   '+
                                            '</div>'+
                                          '</div>';