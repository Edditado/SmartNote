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

});

myApp.onPageInit('editor', function (page) {

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

});

myApp.onPageInit('editor', function (page) {

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

});
myApp.onPageInit('editor', function (page) {

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

});

myApp.onPageInit('editor', function (page) {

  $$('#sizeText').on('click', function () {
       var ic = document.getElementById('sizeText');
        var el = document.getElementById('newnote');
            if(el.style.fontSize == '20px'){
            	el.style.fontSize = '25px';   
            }else if(el.style.fontSize == '25px'){
            	el.style.fontSize = '30px';

            }
            else if(el.style.fontSize == '30px'){
            	el.style.fontSize = '15px';
			}else{
				el.style.fontSize = '20px';
			}


			     
  });

});





myApp.onPageInit('pendientesMateria', function (page) {

  $$('#new_actividad').on('click', function () {
    myApp.modal({
      text: '<p style="color:black;font-weight:bold; font-size: 115%" >Nueva Actividad</p>',
      afterText: '<p>Nombre:</p><input type="text" id="guardaAct" class="modal-text-input" placeholder="Nombre de Actividad" autofocus> <br><p>Fecha:</p> <input type="text" id="guardaFecha" class="modal-text-input" placeholder="dd/mm/yyyy"> ',
       
      buttons: [
        {
          text: 'CANCELAR',
          onClick: function() { 
          }
        }, 
        {
          text: 'CREAR',
          onClick: function() {
            var nombAct=$$('#guardaAct').val();

          }
        }, 
      ]
    });
  });

});