/* By Rodolfo Terra */


(function Preloader(){
    $("#status").delay(0).fadeOut("fast");
    $("#preloader").delay(0).fadeOut("fast");
    
    Inicio();

})();


function Inicio(){

	getId();
	getSuspeito();
	getLocal();
	getArma();
}


function getId(){
	$.get( "https://handson.eniwine.com.br/api/descubraoassassino", function(data) {	

        var obj = JSON.parse(data);
        
        idCrime = obj.misterioId;
        
        $('#idCrime').text(obj.misterioId);
      
    });

}


function getSuspeito(){
	$.get( "https://handson.eniwine.com.br/api/descubraoassassino/criminosos", function(data) {

        var obj = JSON.parse(data);

        obj.forEach(function(o, index){
            $('#suspeito').append('<option value="' + o.Id+ '">' + o.Nome + '</option>');
        });
      
    });

}


function getLocal(){
	$.get( "https://handson.eniwine.com.br/api/descubraoassassino/locais", function(data) {

        var obj = JSON.parse(data);

        obj.forEach(function(o, index){
            $('#local').append('<option value="' + o.Id+ '">' + o.Nome + '</option>');
        });
      
    });

}


function getArma(){
	$.get( "https://handson.eniwine.com.br/api/descubraoassassino/armas", function(data) {

        var obj = JSON.parse(data);

        obj.forEach(function(o, index){
            $('#arma').append('<option value="' + o.Id+ '">' + o.Nome + '</option>');
        });
      
    });

}


function Comecar(){
	$("#comecar").removeClass('hidden');
	$(".bemvindo").addClass('hidden');
}


function postTeoria(){

	var	suspeito 	= $('#suspeito').val(),
		local 		= $('#local').val(),
		arma 		= $('#arma').val(),
		idMisterio 	= idCrime,
		vUrl		= "https://handson.eniwine.com.br/api/descubraoassassino/",
		vData = {IdSuspeito:suspeito, IdArma:arma, IdLocal:local, IdMisterio:idMisterio};

	$.post(vUrl, vData, function( data ) {
	    alert("Resultado" + data);
	});

}