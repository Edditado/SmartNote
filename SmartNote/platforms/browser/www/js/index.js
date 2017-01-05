$(document).ready(function(){
	$("#btn_menu").sideNav();

	$("#ciclos").on('click', function(){
		$('#title').text('Ciclos');
		$('#content').load('btn_add.html');

		$("#ciclos").addClass("active");
		$("#btn_menu").sideNav('hide');
	});

	$("#recordatorios").on('click', function(){
		$('#title').text('Recordatorios');
		$('#content').load('btn_add.html');

		$("#recordatorios").addClass("active");
		$("#btn_menu").sideNav('hide');
	});
});