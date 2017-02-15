var myApp = new Framework7({
  material: true,
  swipeout: false,
  modalTitle: false,
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main');

  




    
   /*plugin.notification.local.promptForPermission(function (granted) {
    alert("promptForPermission: "+granted);
    notif();
  });

  plugin.notification.local.hasPermission(function (granted) {
    alert("hasPermission: "+granted);
    notif();
  });
*/

$$(document).on('deviceready', function() {


  
});


   
 $$('#aude').on('click', function (e) { //Close panel when you open a new page
 

  
});

 


$$('a').on('click', function (e) { //Close panel when you open a new page
  myApp.closePanel();
});





myApp.onPageInit('NuevopendienteMateria', function (page) {
   

    $$('#saveAct').on('click', function () {
    
 
    myApp.confirm('Guardar Actividad?', function () {

                 var nombAct = $$('#guardaAct').val();
                   var fecha = $$('#guardaFech').val();
                   var horai = $$('#picker-date').val();
                   
                   var hor = horai.split(':');
                   var fecha = fecha.split("/");
                   var d =  new Date(fecha[1]+"/"+fecha[0]+"/"+fecha[2]);
                   var hora="";
                   var minuto="";
                   if(horai!=""){
                      hora=hor[0]; 
                      minuto=hor[1]; 
                   }
                   
                    d.setHours(hora);
                    d.setMinutes(minuto);
                    d.setSeconds("00");
                   
                 plugin.notification.local.registerPermission(function (granted) {
                              alert("promptForPermission: "+granted);
                              
                });
                                      var now = new Date().getTime(),
                                                    _5_sec_from_now = new Date(now + 5 * 1000);

                                                var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
                                                
                                                  
                                                 // alert(_5_sec_from_now);
                                                    /*cordova.plugins.notification.local.cancelAll(function() {
                                                      alert("done");
                                                  }, this);*/

                                                    cordova.plugins.notification.local.schedule({
                                                      id         : 1,
                                                      title      : 'SmartNote - Robótica',
                                                      text       : nombAct,
                                                      sound      : null,
                                                      autoClear  : false,
                                                      //sound: "file://sound.mp3",
                                                      sound: sound,
                                                      at         :  d
                                                    });
                                                    


                                  
        mainView.router.loadPage('pendientesMat.html');
    });
});
   
  


$$('#buttAlarm').on('click', function () { 

  
   var ele = document.getElementById('hora');
  
  if(ele.style.visibility== 'hidden'){

   ele.style.visibility= 'visible';
   }
   else{
    ele.style.visibility= 'hidden';
  }

});



var today = new Date();
 
var pickerInline = myApp.picker({
    input: '#picker-date',
    container: '#picker-date-container',
    toolbar: false,
    rotateEffect: true,
    
    value: [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
 
 
    formatValue: function (p, values, displayValues) {
        return values[0] + ':' + values[1];
    },
 
    cols: [
        
        // Space divider
        {
            divider: true,
            content: '  '
        },
        // Hours
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 23; i++) { arr.push(i); }
                return arr;
            })(),
        },
        // Divider
        {
            divider: true,
            content: ':'
        },
        // Minutes
        {
            values: (function () {
                var arr = [];
                for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                return arr;
            })(),
        }
    ]
});          




});






myApp.onPageInit('pendientesMateria', function (page) {
    $$('#new_actividad').on('click', function () { 
   mainView.router.loadPage('formActPendiente.html');
});



});








myApp.onPageInit('materias', function (page) {

  $$('#new_materia').on('click', function () {
    myApp.modal({
      text: '<p style="color:black;font-weight:bold; font-size: 115%" >Nueva Materia</p>',
      afterText: '<input type="text" id="nuevaMat" class="modal-text-input" placeholder="Nombre" autofocus>',
      buttons: [
        {
          text: 'CANCELAR',
          onClick: function() { 
          }
        }, 
        {
          text: 'CREAR',
          onClick: function() {
            var nombCiclo=$$('#nuevaMat').val();
          }
        }, 
      ]
    });
  });

});


myApp.onPageInit('materia', function (page) {

  $$('#newfolder').on('click', function () {
    myApp.modal({
      text: '<p style="color:black;font-weight:bold; font-size: 115%" >Nueva Carpeta</p>',
      afterText: '<input type="text" id="nuevaCarpeta" class="modal-text-input" placeholder="Nombre de carpeta" autofocus>',
      buttons: [
        {
          text: 'CANCELAR',
          onClick: function() { 
          }
        }, 
        {
          text: 'CREAR',
          onClick: function() {
            var nombCarpeta=$$('#nuevaCarpeta').val();
          }
        }, 
      ]
    });
  });



});


myApp.onPageInit('materias', function (page) {

  $$('#newfolder').on('click', function () {
    myApp.modal({
      text: '<p style="color:black;font-weight:bold; font-size: 115%" >Nueva Carpeta</p>',
      afterText: '<input type="text" id="nuevaCarpeta" class="modal-text-input" placeholder="Nombre de carpeta" autofocus>',
      buttons: [
        {
          text: 'CANCELAR',
          onClick: function() { 
          }
        }, 
        {
          text: 'CREAR',
          onClick: function() {
            var nombCarpeta=$$('#nuevaCarpeta').val();
          }
        }, 
      ]
    });
  });



});





myApp.onPageInit('editor', function (page) {

  $$('#saveNote').on('click', function () {
    myApp.modal({
      text: '<p style="color:black;font-weight:bold; font-size: 115%" >Guardar Nota</p>',
      afterText: '<input type="text" id="guardaNota" class="modal-text-input" placeholder="Nombre de nota" autofocus>',
      buttons: [
        {
          text: 'Cancelar',
          onClick: function() { 
          }
        }, 
        {
          text: 'Guardar',
          onClick: function() {
            var nombNota=$$('#guardaNota').val();

          }
        }, 
      ]
    });
  });



    $$('#bold').on('click', function () {
        var ic = document.getElementById('bold');
        var el = document.getElementById('newnote');
          if(el.style.fontWeight == 'normal'){
                ic.style.color='black';
              el.style.fontWeight = 'bold';  
          }else{
                ic.style.color='#6E6E6E';
              el.style.fontWeight = 'normal';  
          }
        
  });


   $$('#italic').on('click', function () {
        var ic = document.getElementById('italic');
        var el = document.getElementById('newnote');
          if(el.style.fontStyle== 'normal'){
                 ic.style.color='black';
              el.style.fontStyle= 'italic';
          }else{
                ic.style.color='#6E6E6E';
              el.style.fontStyle= 'normal';
          }
              
  });
  

   $$('#underl').on('click', function () {
        var ic = document.getElementById('underl');
        var el = document.getElementById('newnote');
          if(el.style.textDecoration == 'none'){
             ic.style.color='black';
            el.style.textDecoration = 'underline'; 
          }else{
            ic.style.color='#6E6E6E';
            el.style.textDecoration = 'none'; 
          }
            
  });

  $$('#sizeText').on('click', function () {
       var ic = document.getElementById('sizeText');
        var el = document.getElementById('newnote');

            if(el.style.fontSize == '20px'){
              ic.style.color='black';
              el.style.fontSize = '25px';   
            }else if(el.style.fontSize == '25px'){
              ic.style.color='black';
              el.style.fontSize = '30px';

            }
            else if(el.style.fontSize == '30px'){
              ic.style.color='black';
              el.style.fontSize = '15px';
      }else{
        el.style.fontSize = '20px';
        ic.style.color='#6E6E6E';
      }          
  });


 


});



myApp.onPageInit('links', function (page) {

  $$('#new_link').on('click', function () {
    myApp.modal({
      text: '<p style="color:black;font-weight:bold; text-align: center;font-size: 115%">Nuevo Link</p>',
      afterText: '<p>Nombre:</p><input type="text" id="guardaLink" class="modal-text-input" value="Link-001" autofocus> <br><p>Url:</p> <input type="text" id="guardaurl" class="modal-text-input" >  ',
       
      buttons: [
        {
          text: 'CANCELAR',
          onClick: function() { 
          }
        }, 
        {
          text: 'GUARDAR',
          onClick: function() {
            

          }
        }, 
      ]
    });
  });

});





myApp.onPageInit('materia', function (page) {

    var destinationType=navigator.camera.DestinationType;
    
                        
         
      $$('#camara').on('click', function () {

                 navigator.camera.getPicture(onSuccess, onFail, {
                 quality: 50, saveToPhotoAlbum:1, correctOrientation: true,
                 destinationType: Camera.DestinationType.FILE_URI });

                  function onSuccess(imageURI) {
                        
                        verIMG(imageURI);
                 }
                  

                  function onFail(message) {
                       alert('Error: ' + message);
                  }


                  function verIMG(imageURI){
                        var uri;
                        var name;
                        uri = imageURI.split('/');
                        name = uri[uri.length-1];
                       // $$('#campic').attr('src',imageURI);
                        var newPageContent = '<div  class="page" data-page="fotocam">' +
                                                '<div id="fot1" class="navbar">'+
                                                    '<div class="navbar-inner">'+
                                                      '<div class="left">'+
                                                        '<a href="materia.html" class="back link icon-only">'+
                                                          '<i class="icon icon-back"></i>'+
                                                        '</a>'+
                                                      '</div>'+
                                                      '<div style="font-size: 80%">'+name+'</div>'+
                                                      '<div class="right">'+
                                                         '<i class="material-icons">&#xE5D4;</i>'+
                                                        
                                                      '</div>'+
                                                    '</div>'+           
                                                  '</div>'+
                                                '<div id="fot2" class="page-content"> ' +
                                                  '<div class="content-block">' +
                                                    '<div class="content-block-inner">' +
                                                      '<p>' +
                                                        '<br>' +
                                                        '<img id="campic" src='+imageURI+' width="100%" height="200%">' +
                                                      '</p>' +
                                                    '</div>' +
                                                  '</div>' +
                                                '</div>' +
                                            '</div>';
                        
                         mainView.router.loadContent(newPageContent);
                        
                  }

          

             });
           

});






myApp.onPageInit('audioRecord', function (page) {
   var band=0;

   $$('#record').on('click', function(){
           
        if(band==0){
            
            var src = "Pruebaaudio2.wav";
            var timePos="";
            var minutos=0;
            var segundos=0;
            
            var im = document.getElementById('recImg');
            im.setAttribute('src', 'img/stop.png');
            
            myMedia = new Media(src, onSuccess, onError);

            
            myMedia.startRecord();
            
            var recTime = 0;
                var recInterval = setInterval(function() {
                    recTime = recTime + 1;
                    if(recTime<10){
                       timePos='00:0'+recTime;
                    }else if(recTime<60){
                       timePos='00:'+recTime;
                    }else{
                       minutos=Math.floor(recTime/60);
                       segundos=Math.floor(recTime%60);
                       if(minutos<10){
                           if(segundos<10){
                              timePos='0'+minutos+':0'+segundos;
                           }else{
                              timePos='0'+minutos+':'+segundos;
                           }
                       }else{
                           if(segundos<10){
                              timePos=minutos+':0'+segundos;
                           }else{
                              timePos=minutos+':'+segundos;
                           }
                       }
                    }
                
                setAudioPosition(timePos);
                    
                }, 1000);
              band=1;
           }else{
                stopRecording();
                band=0;
           }

               
            
         });

        function onSuccess() {
            console.log("Created Audio for Recording");
        }
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }


        function stopRecording()
        {      
                myMedia.stopRecord();
                var ele=document.getElementById('audio_position');
                ele.style.visibility="hidden";
                myApp.modal({
                  text: '<p style="color:black;font-weight:bold; text-align: center;font-size: 115%">Nuevo Audio</p>',
                  afterText: '<input type="text" id="guardaAudio" class="modal-text-input" value="Audio-001" autofocus>  ',
                   
                  buttons: [
                    {
                      text: 'Guardar',
                      onClick: function() { 
                          
                          //myMedia.src=$$('#guardaAudio').val();
                          mainView.router.loadPage('materia.html');
                      }
                    }
                    
                  ]
                });

               
        }       

        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }
      
});

 
