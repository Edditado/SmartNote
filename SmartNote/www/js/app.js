var myApp = new Framework7({
  material: true,
  swipeout: false,
  modalTitle: false,
  template7Pages: true,
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main');


$$('a').on('click', function (e) { //Close panel when you open a new page
  myApp.closePanel();
});


function cargarMaterias(method, refresh){
  var materias = [];
  if( localStorage.getItem('materias') ){
    materias = JSON.parse( localStorage.getItem('materias') );
  }

  if(method == 'load'){
    mainView.router.load({
      url: 'materias.html',
      reload: refresh,
      context: {
        materias: materias.reverse() 
      }
    });
  }
  else{
    mainView.router.back({
      url: 'materias.html',
      force: true,
      context: {
        materias: materias.reverse() 
      }
    });
  }
  
}


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
              cargarMaterias('load', true);
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


  



  $$('.materia-options').on('click', function () {
    var materia_id = $$(this).parents('li').attr('id');
    var materia_nom = $$(this).parents('li').find('div.item-title').text();

    var popoverHTML = '<div class="popover">'+
                        '<div class="popover-inner">'+
                          '<div class="list-block">'+
                            '<ul>'+
                              '<li><a href="#" class="item-link list-button close-popover" onclick="editarMateria('+materia_id+',\''+materia_nom+'\')">Cambiar nombre</li>'+
                              '<li><a href="#" class="item-link list-button close-popover" onclick="eliminarMateria('+materia_id+')">Eliminar</li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                      '</div>';

    myApp.popover(popoverHTML, this); 
  });

});


function editarMateria(id, nombre){
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
          cargarMaterias('load', true);
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


function eliminarMateria(id){
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

          cargarMaterias('load', true);
        }
      }, 
    ]
  });
}



function cargarMateria(id, method, refresh){
  var materias = JSON.parse( localStorage.getItem('materias') );
  var materia = {};

  $$.each(materias, function(index, elemento){
    if(elemento.id == id){
      materia = elemento;
      return false;
    }
  });

  var archivos = [];

  if( localStorage.getItem('archivos') ){
    var archivosAll = JSON.parse( localStorage.getItem('archivos') );

    $$.each(archivosAll, function(index, archivo){ 
      if(archivo.materia_id == materia.id){

        switch(archivo.tipo){
          case 'nota':
            archivo.icono = '&#xE06F;';
            break;
          case 'imagen':
            archivo.icono = '&#xE410;';
            break;
          case 'audio':
            archivo.icono = '&#xE3A1;';
            break;
          case 'video':
            archivo.icono = '&#xE54D;';
            break;
          default:
            archivo.icono = '&#xE24D;';
            break;
        }

        archivos.push(archivo);
      }
    });
  }

  if(method == 'load'){
    mainView.router.load({
      url: 'materia.html',
      reload: refresh,
      context: {
        materia: materia,
        archivos: archivos.reverse() 
      }
    });
  }
  else{
    mainView.router.back({
      url: 'materia.html',
      force: true,
      context: {
        materia: materia,
        archivos: archivos.reverse() 
      }
    });
  }
  
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

  $$('.archivo-options').on('click', function () {
    var archivo_id = $$(this).parents('li').attr('id');
    var archivo_nom = $$(this).parents('li').find('div.item-title').text();

    var popoverHTML = '<div class="popover">'+
                        '<div class="popover-inner">'+
                          '<div class="list-block">'+
                            '<ul>'+
                              '<li><a href="#" class="item-link list-button close-popover" onclick="editarArchivo('+archivo_id+',\''+archivo_nom+'\')">Cambiar nombre</li>'+
                              '<li><a href="#" class="item-link list-button close-popover" onclick="eliminarArchivo('+archivo_id+')">Eliminar</li>'+
                            '</ul>'+
                          '</div>'+
                        '</div>'+
                      '</div>';

    myApp.popover(popoverHTML, this); 
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


function cargarArchivo(archivo_id){
  var archivos = JSON.parse( localStorage.getItem("archivos") );  
  var archivo = {};
  var tipo_archivo = {};

  $$.each(archivos, function(i, obj){
    if(obj.id == archivo_id){
      archivo = obj;
      return false;
    }
  });

  switch(archivo.tipo){
    case "nota":
      cargarNota(archivo, false);
      break;
    case "foto":
      cargarFoto(archivo, false);
      break;
    case "audio":
      cargarAudio(archivo, false);
      break;
    default:
      break;
  }
}


function editarArchivo(id, nombre){
  myApp.modal({
    text: '<p style="color:black;font-weight:bold; font-size: 115%" >Editar Archivo</p>',
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
          var archivos = JSON.parse( localStorage.getItem('archivos') );
          var materia_id = 0;

          $$.each(archivos, function(i, archivo){
            if(archivo.id == id){
              archivo.nombre = $$('#inputEditar').val();
              materia_id = archivo.materia_id;
              return false;
            }
          });

          localStorage.setItem('archivos', JSON.stringify(archivos) );
          cargarMateria(materia_id, 'load', true);
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



function eliminarArchivo(id){
  myApp.modal({
    text: '<p style="color:black;font-weight:bold; font-size: 115%" >Eliminar Archivo</p>',
    afterText: '<p>Se borrará el archivo de esta materia.</p>',
    buttons: [
      {
        text: 'CANCELAR',
        onClick: function() { 
        }
      }, 
      {
        text: 'ELIMINAR',
        onClick: function() {
          var materia_id = 0;
          var tabla = "";

          var archivos = JSON.parse( localStorage.getItem('archivos') );
          $$.each(archivos, function(index, archivo){
            if(archivo.id == id){
              switch(archivo.tipo){
                case "nota":
                  tabla = "notas";
                  break;
                case "foto":
                  tabla = "fotos";
                  break;
                default:
                  tabla = "audios";
                  break;
              }
              archivos.splice(index,1);
              materia_id = archivo.materia_id;
              return false;
            }
          });

          var elementos = JSON.parse( localStorage.getItem(tabla) );
          $$.each(elementos, function(index, elemento){
            if(elemento.archivo_id == id){
              elementos.splice(index,1);
              return false;
            }
          });


          localStorage.setItem('archivos', JSON.stringify(archivos) );
          localStorage.setItem(tabla, JSON.stringify(elementos) );

          cargarMateria(materia_id, 'load', true);
        }
      }, 
    ]
  });
}



function nuevaNota(materia_id){
  
  mainView.router.load({
    url: 'editor.html',
    context: {
      materia_id: materia_id
    }
  });

}


myApp.onPageInit('editor', function (page) {

    $$('#saveNote').on('click', function () {
      var materia_id = $$(this).attr('materia');

      myApp.modal({
        text: '<p style="color:black;font-weight:bold; font-size: 115%" >Guardar Nota</p>',
        afterText: '<input type="text" id="nomNota" class="modal-text-input" placeholder="Nombre de nota" autofocus/>',
        buttons: [
          {
            text: 'CANCELAR',
            onClick: function() { 
            }
          }, 
          {
            text: 'GUARDAR',
            onClick: function() {
              var nombNota = $$('#nomNota').val();
              var contNota = $$('#newnote').val();
              var formatoNota = $$('#newnote').attr('style');

              if( localStorage.getItem('archivos') ){
                var archivos = JSON.parse( localStorage.getItem('archivos') );
                if( localStorage.getItem('notas') ){
                  var notas = JSON.parse( localStorage.getItem('notas') );
                }
                else{
                  var notas = [];
                }
              }
              else{
                var archivos = [];
                var notas = [];
              }

              var newArchivo = {
                id: archivos.length +1,
                nombre: nombNota,
                tipo: 'nota',
                materia_id: materia_id
              };

              var newNota = {
                id: notas.length +1,
                contenido: contNota,
                formato: formatoNota,
                archivo_id: newArchivo.id
              };

              archivos.push(newArchivo);
              notas.push(newNota);

              localStorage.setItem('archivos', JSON.stringify(archivos) );
              localStorage.setItem('notas', JSON.stringify(notas) );

              cargarMateria(materia_id, 'back', false);

            }
          }, 
        ]
      });

      $$(".modal-button").filter(function() {
        return $$(this).text() == "GUARDAR";
      }).attr('disabled','');

      $$("#nomNota").on('keyup', function(){
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

    });

    
    $$('#bold').on('click', function () {
      if( $$("#newnote").css('font-weight') == 'bold' ){
        $$("#newnote").css('font-weight','normal');
        $$(this).css('color','#6E6E6E');
      } 
      else{
        $$("#newnote").css('font-weight','bold');
        $$(this).css('color','black');
      }     
    });

    $$('#italic').on('click', function () {     
      if( $$("#newnote").css('font-style') == 'italic' ){
        $$("#newnote").css('font-style','normal');
        $$(this).css('color','#6E6E6E');
      } 
      else{
        $$("#newnote").css('font-style','italic');
        $$(this).css('color','black');
      }      
    });
    
    $$('#underl').on('click', function () {
      if( $$("#newnote").css('text-decoration') == 'underline' ){
        $$("#newnote").css('text-decoration','none');
        $$(this).css('color','#6E6E6E');
      } 
      else{
        $$("#newnote").css('text-decoration','underline');
        $$(this).css('color','black');
      }               
    });

    $$('#sizeText').on('click', function () {
      if($$("#newnote").css('font-size') == '20px'){
        $$("#newnote").css('font-size','25px');
        $$(this).css('color','black');  
      }else if($$("#newnote").css('font-size') == '25px'){
        $$("#newnote").css('font-size','30px');
        $$(this).css('color','black'); 
      }
      else if($$("#newnote").css('font-size') == '30px'){
        $$("#newnote").css('font-size','15px');
        $$(this).css('color','black'); 
      }else{
        $$("#newnote").css('font-size','20px');
        $$(this).css('color','#6E6E6E'); 
      }            
    });

});



function cargarNota(archivo, refresh){
  var notas = JSON.parse( localStorage.getItem("notas") );
  var nota = {};


  $$.each(notas, function(i, obj){
    if(obj.archivo_id == archivo.id){
      nota = obj;
      return false;
    }
  });


  mainView.router.load({
    url: 'note.html',
    reload: refresh,
    context: {
      archivo: archivo,
      nota: nota
    }
  });
}

   
 

 
myApp.onPageInit('note', function (page) {
  $$("#btnEditarNota").on('click', function(){
    $$("#editArea").removeAttr('readonly');
    $$("#divGuardar").show();
    $$("#hiddenToolbar").show();
    $$(this).hide();    
  });

  $$('#bold').on('click', function () {
    if( $$("#editArea").css('font-weight') == 'bold' ){
      $$("#editArea").css('font-weight','normal');
      $$(this).css('color','#6E6E6E');
    } 
    else{
      $$("#editArea").css('font-weight','bold');
      $$(this).css('color','black');
    }     
  });


  $$('#italic').on('click', function () {     
    if( $$("#editArea").css('font-style') == 'italic' ){
      $$("#editArea").css('font-style','normal');
      $$(this).css('color','#6E6E6E');
    } 
    else{
      $$("#editArea").css('font-style','italic');
      $$(this).css('color','black');
    }      
  });
  
  $$('#underl').on('click', function () {
    if( $$("#editArea").css('text-decoration') == 'underline' ){
      $$("#editArea").css('text-decoration','none');
      $$(this).css('color','#6E6E6E');
    } 
    else{
      $$("#editArea").css('text-decoration','underline');
      $$(this).css('color','black');
    }               
  });


  $$('#sizeText').on('click', function () {
    if($$("#editArea").css('font-size') == '20px'){
      $$("#editArea").css('font-size','25px');
      $$(this).css('color','black');  
    }else if($$("#editArea").css('font-size') == '25px'){
      $$("#editArea").css('font-size','30px');
      $$(this).css('color','black'); 
    }
    else if($$("#editArea").css('font-size') == '30px'){
      $$("#editArea").css('font-size','15px');
      $$(this).css('color','black'); 
    }else{
      $$("#editArea").css('font-size','20px');
      $$(this).css('color','#6E6E6E'); 
    }            
  });

});


function guardarEdicionNota(nota_id){
  var notas = JSON.parse( localStorage.getItem("notas") );

  $$.each(notas, function(i, nota){
    if(nota.id == nota_id){
      nota.contenido = $$("#editArea").val();
      nota.formato = $$("#editArea").attr('style');
      return false;
    }
  });

  localStorage.setItem('notas', JSON.stringify(notas) );

  $$("#editArea").attr('readonly','');
  $$("#divGuardar").hide();
  $$("#hiddenToolbar").hide();
  $$("#btnEditarNota").css('display','flex');
}




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

 
