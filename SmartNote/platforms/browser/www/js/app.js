var myApp = new Framework7({
  material: true,
  swipeout: false,
  modalTitle: false,
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main');

  





$$('a').on('click', function (e) { //Close panel when you open a new page
  myApp.closePanel();
});

// $$('#btnSearch').on('click', function (e) { //Close panel when you open a new page
//   var state = $$('.searchbar').css('display');
//   if(state == 'none'){
//     $$('.searchbar').show();
//   }
//   else{
//     $$('.searchbar').hide();
//   }
// });











myApp.onPageInit('NuevopendienteMateria', function (page) {
 
  /*var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
 
  var calendarInline = myApp.calendar({
      container: '#calendar-inline-container',
      value: [new Date()],
      weekHeader: false,
      dateFormat: 'dd/mm/yyyy',
      toolbarTemplate: 
          '<div class="toolbar calendar-custom-toolbar">' +
              '<div class="toolbar-inner">' +
                  '<div class="left">' +
                      '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                  '</div>' +
                  '<div class="center"></div>' +
                  '<div class="right">' +
                      '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                  '</div>' +
              '</div>' +
          '</div>',
      onOpen: function (p) {
          $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
          $$('.calendar-custom-toolbar .left .link').on('click', function () {
              calendarInline.prevMonth();
          });
          $$('.calendar-custom-toolbar .right .link').on('click', function () {
              calendarInline.nextMonth();
          });
      },
      onMonthYearChangeStart: function (p) {
          $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
      }
});    
*/


$$('#saveAct').on('click', function () { 
    myApp.confirm('Guardar Actividad?', function () {
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





myApp.onPageInit('ciclos', function (page) {
  var ciclos = localStorage.getItem('ciclos');
  console.log(ciclos);

  $$('#new_ciclo').on('click', function () {   
    myApp.modal({
      text: '<p style="color:black;font-weight:bold; font-size: 115%" >Nuevo Ciclo</p>',
      afterText: '<input type="text" id="nuevoCiclo" class="modal-text-input" placeholder="Nombre" autofocus>',
      buttons: [
        {
          text: 'CANCELAR',
          onClick: function(){
          }
        }, 
        {
          text: 'CREAR',
          onClick: function() {
            var nombCiclo = $$('#nuevoCiclo').val();
            mainView.router.loadPage('ciclos.html');
          }
        }, 
      ]
    });
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
