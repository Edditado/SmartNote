 document.addEventListener("deviceready", function() {

 var myApp2 = new Framework7({
  material: true,
  swipeout: false,
  modalTitle: false,
});

 
    var $$      = Dom7;
    
    

    

    myApp2.onPageInit('materia', function (page) {
       myApp2.alert('entra', 'entra');
        $$('#camara').on('click', function () {

        myApp2.alert('Click', 'Click detected');

        navigator.camera.getPicture(onSuccess, onFail,
        { 
            quality: 20,
            destinationType: destinationType.FILE_URI
        }); 

        function onSuccess(imageURI) {
            myApp2.alert('Photo captured.', 'Bien');
        }

        function onFail(message) {
            myApp2.alert('There was a problem.', 'Ups');
        }

        });
    });
    
}, false);