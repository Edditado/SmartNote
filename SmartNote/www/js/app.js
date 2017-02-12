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


myApp.onPageInit('materias', function (page) {

  if( localStorage.getItem('materias') ){
    var materias = JSON.parse( localStorage.getItem('materias') );
    for(var i=0; i < materias.length; i++){ 
      $$('#listaMaterias ul').append(
        "<li id='"+materias[i].id+"'>\
          <div class='row no-gutter'>\
            <div class='col-90'>\
              <a href='#' onclick='cargarMateria("+materias[i].id+")' class='item-link item-content'>\
                <div class='item-media'><i class='material-icons'>&#xE2C7;</i></div>\
                <div class='item-inner'>\
                  <div class='item-title-row'>\
                    <div class='item-title'>"+materias[i].nombre+"</div>\
                  </div>\
                </div>\
              </a>\
            </div>\
            <div class='col-10'>\
              <a href='#' class='link icon-only item-inner options-popover'>\
                <i class='material-icons'>&#xE5D4;</i>\
              </a>\
            </div>\
          </div>\
        </li>"
      );
    }
  }

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
            if( $$('#nuevaMat').val() ){
              if( localStorage.getItem('materias') ){
                var materias = JSON.parse( localStorage.getItem('materias') );
              }
              else{
                var materias = [];
              }

              var newMateria = {
                id: materias.length +1,
                nombre: $$('#nuevaMat').val()
              };

              materias.push(newMateria);
              localStorage.setItem('materias', JSON.stringify(materias) );
              mainView.router.refreshPage();
            }
          }
        }, 
      ]
    });

    $$(".modal-button").filter(function() {
        return $$(this).text() == "CREAR";
    }).attr('disabled','');

    $$("#nuevaMat").on('keyup', function(){
      if( $$(this).val() ){
        $$(".modal-button").filter(function() {
            return $$(this).text() == "CREAR";
        }).removeAttr('disabled');
      }
      else{
        $$(".modal-button").filter(function() {
            return $$(this).text() == "CREAR";
        }).attr('disabled','');
      }
    });

  });

  $$('.options-popover').on('click', function () {
    var materia_id = $$(this).parents('li').attr('id');
    var materia_nom = $$(this).parents('li').find('div.item-title').text();

    var popoverHTML = '<div class="popover">'+
                        '<div class="popover-inner">'+
                          '<div class="list-block">'+
                            '<ul>'+
                              '<li><a href="#" class="item-link list-button close-popover" onclick="editar_materia('+materia_id+',\''+materia_nom+'\')">Cambiar nombre</li>'+
                              '<li><a href="#" class="item-link list-button close-popover" onclick="eliminar_materia('+materia_id+')">Eliminar</li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                      '</div>';

    myApp.popover(popoverHTML, this); 
  });

});


function editar_materia(id, nombre){
  myApp.modal({
    text: '<p style="color:black;font-weight:bold; font-size: 115%" >Editar Materia</p>',
    afterText: '<input id="inputEditar" type="text" class="modal-text-input" placeholder="Nombre" value="'+nombre+'" autofocus>',
    buttons: [
      {
        text: 'CANCELAR',
        onClick: function() { 
        }
      }, 
      {
        text: 'GUARDAR',
        onClick: function() {
          var materias = JSON.parse( localStorage.getItem('materias') );

          $$.each(materias, function(i, materia){
            if(materia.id == id){
              materia.nombre = $$('#inputEditar').val();
              return false;
            }
          });

          localStorage.setItem('materias', JSON.stringify(materias) );
          mainView.router.refreshPage();
        }
      }, 
    ]
  });

  $$("#inputEditar").on('keyup', function(){
    if( $$(this).val() ){
      $$(".modal-button").filter(function() {
          return $$(this).text() == "GUARDAR";
      }).removeAttr('disabled');
    }
    else{
      $$(".modal-button").filter(function() {
          return $$(this).text() == "GUARDAR";
      }).attr('disabled','');
    }
  });
}


function eliminar_materia(id){
  myApp.modal({
    text: '<p style="color:black;font-weight:bold; font-size: 115%" >Eliminar Materia</p>',
    afterText: '<p>Se perderan todos los elementos de esta materia.</p>',
    buttons: [
      {
        text: 'CANCELAR',
        onClick: function() { 
        }
      }, 
      {
        text: 'ELIMINAR',
        onClick: function() {
          var materias = JSON.parse( localStorage.getItem('materias') );

          $$.each(materias, function(index, materia){
            if(materia.id == id){
              materias.splice(index,1);
              return false;
            }
          });

          localStorage.setItem('materias', JSON.stringify(materias) );

          if( localStorage.getItem('archivos') ){
            var archivos = JSON.parse( localStorage.getItem('archivos') );

            $$.each(archivos, function(index, archivo){
              if(archivo.materia_id == id){
                archivos.splice(index,1);
              }
            });

            localStorage.setItem('archivos', JSON.stringify(archivos) );
          }

          mainView.router.refreshPage();
        }
      }, 
    ]
  });
}


function cargarMateria(id){
  var materias = JSON.parse( localStorage.getItem('materias') );
  var materia = {};

  $$.each(materias, function(index, elemento){
    if(elemento.id == id){
      materia = elemento;
      return false;
    }
  });

  myApp.onPageInit('materia', function (page) {
    $$("#divTitulo").text(materia.nombre);

    if( localStorage.getItem('archivos') ){
      var archivos = JSON.parse( localStorage.getItem('archivos') );

      $$.each(archivos, function(index, archivo){ 

        if(archivo.materia_id == materia.id){
          var icono = '';

          switch(archivo.tipo){
            case 'nota':
              icono = '&#xE06F;';
              break;
            case 'imagen':
              icono = '&#xE410;';
              break;
            case 'audio':
              icono = '&#xE3A1;';
              break;
            case 'video':
              icono = '&#xE54D;';
              break;
            default:
              icono = '&#xE24D;';
              break;
          }

          $$('#listaArchivos ul').append(
            "<li id='"+archivo.id+"'>\
              <div class='row no-gutter'>\
                <div class='col-90'>\
                  <a href='#' class='item-link item-content'>\
                    <div class='item-media'><i class='material-icons'>"+icono+"</i></div>\
                    <div class='item-inner'>\
                      <div class='item-title-row'>\
                        <div class='item-title'>"+archivo.nombre+"</div>\
                      </div>\
                    </div>\
                  </a>\
                </div>\
                <div class='col-10'>\
                  <a href='#' class='link icon-only item-inner options-popover'>\
                    <i class='material-icons'>&#xE5D4;</i>\
                  </a>\
                </div>\
              </div>\
            </li>"
          );
        }
      });
    }

  });

  mainView.router.loadPage('materia.html');
}


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


