$( function() {

  var context = new AudioContext();

	var oscillator;

	var reverb;

	var gain;

	var delay;


  var noteOn  = $('#liga');
  var noteOff = $('#desliga');
  
  var x       = $('#x');
  var y       = $('#y');

  noteOn.on('click', function(e) {
    // Isso evita criar uma nova referência ao oscilador 
    // e a antiga ficar para sempre inacessível.
    if (oscillator) {
      return;
		}

    // crie o nó do oscilador
    oscillator = context.createOscillator();

    // define seu tipo
    oscillator.type = 'sine'; // sine, triangle, sawtooth, square


		// Criear reverb
		reverb = context.createConvolver();
		reverb.connect(context.destination);


		// Criar gain
		gain = context.createGain();
		gain.connect(context.destination);
		gain.gain.value = 0.65;

		// Criar delay
		delay = context.createDelay();
		delay.connect(context.destination);
		delay.delayTime.value = 0.5;

		
		//Tipos de onda
		document.getElementById("sine").addEventListener('click', ()=>{
			oscillator.type = 'sine';
		});

		document.getElementById("triangle").addEventListener('click', ()=>{
			oscillator.type = 'triangle';
		});

		document.getElementById("sawtooth").addEventListener('click', ()=>{
			oscillator.type = 'sawtooth';
		});

		document.getElementById("square").addEventListener('click', ()=>{
			oscillator.type = 'square';
		});

		

		oscillator.connect(context.destination);

		// coisas
		document.getElementById("delay").addEventListener('click', ()=>{
			oscillator.connect(delay);
		});

		document.getElementById("reverb").addEventListener('click', ()=>{
			oscillator.connect(reverb);
		});

		document.getElementById("gain").addEventListener('click', ()=>{
			oscillator.connect(gain);
		});
		
		
		document.getElementById("juice").addEventListener('click', ()=>{
			oscillator.connect(gain);
			oscillator.connect(delay);
			oscillator.connect(reverb);
		});
		




    // Inicia o Teremim com zero!
    // um valor diferente de 0 nos permitirá ligar ele
    oscillator.start(0);
  });

  noteOff.on('click', function(e) {
    if(oscillator) {
      // Para o oscilador imediatamente
      oscillator.stop(0);
      // define a variável como null para que saibamos que nada está sendo reproduzido.
			oscillator = null;
			document.getElementById("mostrar").innerHTML = 0;
    }
  });

  $('body').on('mousemove', function(e) {
    // Pega o movimento do mouse nos eixos X e Y!
    var xValue = e.clientX;
    var yValue = e.clientY;

    // dêem uma olhada nos valores ao movimentar o mouse
    x.text(xValue);
    y.text(yValue);

    // se não temos um oscilador funcionando nesse momento, então, 
    // não temos nada mais a fazer aqui, apenas retornar
    if (!oscillator) {
      return;
    }

    // define a frequência para a posição x do mouse!
    oscillator.frequency.value = xValue;
  });

});