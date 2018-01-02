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
	$.get( "http://handson.eniwine.com.br/api/descubraoassassino", function(data) {	

        var obj = JSON.parse(data);
        
        idCrime = obj.misterioId;
        
        $('#idCrime').text(obj.misterioId);
      
    });

}


function getSuspeito(){
	$.get( "http://handson.eniwine.com.br/api/descubraoassassino/criminosos", function(data) {

        var obj = JSON.parse(data);

        obj.forEach(function(o, index){
            $('#suspeito').append('<option value="' + o.Id+ '">' + o.Nome + '</option>');
        });
      
    });

}


function getLocal(){
	$.get( "http://handson.eniwine.com.br/api/descubraoassassino/locais", function(data) {

        var obj = JSON.parse(data);

        obj.forEach(function(o, index){
            $('#local').append('<option value="' + o.Id+ '">' + o.Nome + '</option>');
        });
      
    });

}


function getArma(){
	$.get( "http://handson.eniwine.com.br/api/descubraoassassino/armas", function(data) {

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
		vUrl		= "http://handson.eniwine.com.br/api/descubraoassassino/",
        resultado   = ""; 
		vData = {IdSuspeito:suspeito, IdArma:arma, IdLocal:local, IdMisterio:idMisterio};

	$.post(vUrl, vData, function( data ) {
	    
        switch(data) {
            case 1:
                resultado = "somente o assassino está incorreto !";
                $('#resultado').removeClass('hidden')
                $('.resposta').text(resultado);
                break;

            case 2:
                resultado = "todos estão incorretos !";
                $('#resultado').removeClass('hidden')
                $('.resposta').text(resultado);
                break;

            case 3:
                resultado = "somente o local está correto !";
                $('#resultado').removeClass('hidden')
                $('.resposta').text(resultado);
                break;

            case 0:
                resultado = "caso solucionado !";
                $('#resultado').removeClass('hidden')
                $('.resposta').text(resultado);
                break;
        }        

	});

}