
var cartas = new Array( 
  {nombre: '1', seleccion: false, background: "url('img/1.jpg')"}, {nombre: '2', seleccion: false, background: "url('img/2.jpg')"}, 
  {nombre: '3', seleccion: false, background: "url('img/3.jpg')"}, {nombre: '4', seleccion: false, background: "url('img/4.jpg')"}, 
  {nombre: '5', seleccion: false, background: "url('img/5.jpg')"}, {nombre: '6', seleccion: false, background: "url('img/6.jpg')"}, 
  {nombre: '7', seleccion: false, background: "url('img/7.jpg')"}, {nombre: '8', seleccion: false, background: "url('img/8.jpg')"}, 
  {nombre: '1', seleccion: false, background: "url('img/1.jpg')"}, {nombre: '2', seleccion: false, background: "url('img/2.jpg')"}, 
  {nombre: '3', seleccion: false, background: "url('img/3.jpg')"}, {nombre: '4', seleccion: false, background: "url('img/4.jpg')"}, 
  {nombre: '5', seleccion: false, background: "url('img/5.jpg')"}, {nombre: '6', seleccion: false, background: "url('img/6.jpg')"}, 
  {nombre: '7', seleccion: false, background: "url('img/7.jpg')"}, {nombre: '8', seleccion: false, background: "url('img/8.jpg')"} );

var intentos = 0;
var jugada1 = "";
var jugada2 = "";
var identificadorJ1 = "";
var identificadorJ2 = "";
var interrogante = "url('img/interrogante.png')";
for (var i = 0; i < 16; i++) {
  document.getElementById([i].toString()).style.backgroundImage = interrogante;
}

function iniciarJuego () {	
  var dato = document.getElementById("juego");
  dato.style.opacity = 1;
  cartas.sort(function() {return Math.random() - 0.5});
  for ( var i = 0 ; i < 16 ; i++ ) {
    var carta = cartas[i].background;
    //console.log(cartas[i].nombre);
    var dato = document.getElementById( i.toString() );
    dato.dataset.valor = carta;
  }

};

function resetearJuego () {
  cartas.sort(function() {return Math.random() - 0.5});
  for ( var i = 0 ; i < 16 ; i++ ) {
    var carta = cartas[i].background;
    var dato = document.getElementById( i.toString() );
    dato.dataset.valor = carta;
    colorCambio( i, interrogante, '?');
  }	
}

function girarCarta () {
  /*Capturo elemento que generó el evento*/
  var evento = window.event;
  //console.log('evento: '+evento);
  /*Si el juego ha iniciado el valor seteado será el nombre del array cartas del elemento seleccionado.
    Si el juego no ha sido iniciado el valor seteado será el data-valor del elemento seleccionado*/
  jugada2 = evento.target.dataset.valor;
  console.log('jugada2: '+jugada2);
  //console.log('jugada2: '+jugada2);
  //console.log('jugada1: '+jugada1);
  /*Seteo el id del elemento que ejecutó el evento*/
  identificadorJ2 = evento.target.id;
  //console.log('identificadorJ2: '+identificadorJ2);


  /*Si jugada1 esta vacia entra al if*/
  if ( jugada1 !== "" ) {
    /*Si jugada1 es igual a jugada2 Y  identificadorJ1 es igual a identificadorJ2 Y seleccion del arreglo Cartas en la posicion identificadorJ2 es diferente a true Y seleccion del arreglo Cartas en la posicion identificadorJ1 es diferente a true*/
    if ( jugada1 === jugada2 && identificadorJ1 !== identificadorJ2 && cartas[parseInt(identificadorJ2)].seleccion != true && cartas[parseInt(identificadorJ1)].seleccion != true) {
      /*Se le da el valor de true a uno de los objetos, ya que esta será contado como un acierto en el metodo "comprobar()"*/
      cartas[parseInt(identificadorJ1)].seleccion = false;/* valor en un principio: false */
      cartas[parseInt(identificadorJ2)].seleccion = true;/* valor en un principio: true */ 
      //console.log('seleccion 1: '+cartas[parseInt(identificadorJ1)].seleccion);
      //console.log('seleccion 2: '+cartas[parseInt(identificadorJ2)].seleccion);
      /*Mando identificadorJ2(el id del elemento seleccionado), lo pinto de azul y el nombre jugada2*/
      colorCambio(identificadorJ2, jugada2, jugada2);
      /* limpio las variables jugada1, jugada2, identificadorJ1, identificadorJ2*/
      vaciar();
      /*Comprobando aciertos*/
      comprobar();
      //console.log('Dentro del primer if...');
      //console.log('---------------------------------');
    }else if(identificadorJ1 !== identificadorJ2){
      var self = this;
      setTimeout(function(){
        colorCambio(self.identificadorJ1, interrogante, "?")
        colorCambio(self.identificadorJ2, interrogante, "?")
        vaciar()
      },200); 

      colorCambio(identificadorJ2, jugada2, jugada2);
      //console.log('Dentro del segundo if...');
      //console.log('---------------------------------');
    }
  }
  /*Si jugada1 es diferente de "valor"entra al if*/ 
  else if(jugada2 !== "valor") {
    /*Ejecuto la funcion "colorCambio", le mando el id del elemento, lo pinto de azul y mando el nombre del array Cartas*/
    colorCambio(identificadorJ2, jugada2, jugada2);
    /*jugada1 tendrá el valor de  jugada2(jugada 2 debe de tener el nombre del array Cartas)*/
    jugada1 = jugada2;
    /*identificadorJ1 tendrá el valor de identificadorJ2(identificadorJ2 debe tener el id del elemento)*/
    identificadorJ1 = identificadorJ2;
    //console.log('Dentro del tercer if...');
    //console.log('---------------------------------');
  }
};

function vaciar ()  {
  jugada1 = "";	
  jugada2 = "";	

  identificadorJ1 = "";
  identificadorJ2 = "";
}

function colorCambio (posicion, color, contenido) {
  document.getElementById(posicion.toString()).style.backgroundImage = color;
  //document.getElementById(posicion.toString()).style.backgroundColor = color;
  //document.getElementById(posicion.toString()).innerHTML = contenido;
}	

function comprobar () {
  var aciertos = 0;
  for( var i = 0 ; i < 16 ; i++ ){
    if ( cartas[i].seleccion == true ) {
      aciertos ++;
    }

  }
  console.log('aciertos: '+aciertos);
  if(aciertos == 8){

    //document.getElementById("juego").innerHTML = "GANASTE";
    console.log('GANASTE');
  }
}

/*function resetearJuego () {
			cartas.sort(function() { return Math.random() - 0.5});
			for ( var i = 0; i < 16 ; i++ ) {
				var carta = cartas[i].nombre;
				var dato = document.getElementById( i.toString() );
				dato.dataset.valor = carta;
				colorCambio(i, 'black', '?');
			}
		};*/