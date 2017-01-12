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


myApp.onPageInit('ciclos', function (page) {

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


