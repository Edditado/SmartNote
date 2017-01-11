var myApp = new Framework7({
    material: true,
    swipeout: false,
    modalTitle: false,
});

var $$ = Dom7;



$$('a').on('click', function (e) { //Close panel when you open a new page
    myApp.closePanel();
});


var mainView = myApp.addView('.view-main');

$$('#new_ciclo').on('click', function () {
   myApp.modal({
  
  text: '<p style="color:black;font-weight:bold; font-size: 115%" >Nuevo Ciclo</p>',
  afterText: '<input type="text" id="nuevoCiclo" class="modal-text-input" Placeholder="Nombre" autofocus>',
  buttons: [{
      text: 'CANCELAR',
      onClick: function() {
      
    }
  }, {
    text: 'CREAR',
    onClick: function() {
      var nombCiclo=$$('#nuevoCiclo').val();
      
    }
  }, ]
});
});



$$('#new_materia').on('click', function () {
   myApp.modal({
  
  text: '<p style="color:black;font-weight:bold; font-size: 115%" >Nueva Materia</p>',
  afterText: '<input type="text" id="nuevaMat" class="modal-text-input" Placeholder="Nombre" autofocus>',
  buttons: [{
      text: 'CANCELAR',
      onClick: function() {
       
    }
  }, {
    text: 'CREAR',
    onClick: function() {
      var nombCiclo=$$('#nuevaMat').val();
      
    }
  }, ]
});
});




