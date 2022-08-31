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
	oscillator_2 = context.createOscillator();
	oscillator_3 = context.createOscillator();

    // define seu tipo
    oscillator.type = 'sine'; // sine, triangle, sawtooth, square
	oscillator_2.type = 'sine';
	oscillator_3.type = 'sine';

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
			//oscillator.connect(oscillator.type = 'sine').connect(oscillator.type = 'triangle')
		});

		document.getElementById("square").addEventListener('click', ()=>{
			oscillator.type = 'square';
		});

		//Wave 2
		document.getElementById("sine_2").addEventListener('click', ()=>{
			oscillator_2.type = 'sine';
		});

		document.getElementById("triangle_2").addEventListener('click', ()=>{
			oscillator_2.type = 'triangle';
		});

		document.getElementById("sawtooth_2").addEventListener('click', ()=>{
			oscillator_2.type = 'sawtooth';
			//oscillator.connect(oscillator.type = 'sine').connect(oscillator.type = 'triangle')
		});

		document.getElementById("square_2").addEventListener('click', ()=>{
			oscillator_2.type = 'square';
		});

		//Wave 3
		document.getElementById("sine_3").addEventListener('click', ()=>{
			oscillator_2.type = 'sine';
		});

		document.getElementById("triangle_3").addEventListener('click', ()=>{
			oscillator_2.type = 'triangle';
		});

		document.getElementById("sawtooth_3").addEventListener('click', ()=>{
			oscillator_2.type = 'sawtooth';
			//oscillator.connect(oscillator.type = 'sine').connect(oscillator.type = 'triangle')
		});

		document.getElementById("square_3").addEventListener('click', ()=>{
			oscillator_2.type = 'square';
		});

		

		oscillator.connect(context.destination);
		oscillator_2.connect(context.destination);

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
			oscillator.connect(gain).connect(delay).connect(reverb);
			oscillator_2.connect(gain).connect(delay).connect(reverb);
			oscillator_3.connect(gain).connect(delay).connect(reverb);
		});
		




    // Inicia o Teremim com zero!
    // um valor diferente de 0 nos permitirá ligar ele
    oscillator.start(0);
	oscillator_2.start(0);
	oscillator_3.start(0);
  });

  noteOff.on('click', function(e) {
    if(oscillator || oscillator_2 || oscillator_3) {
      // Para o oscilador imediatamente
      oscillator.stop(0);
	  oscillator_2.stop(0);
	  oscillator_3.stop(0);
      // define a variável como null para que saibamos que nada está sendo reproduzido.
			oscillator = null;
			oscillator_2 = null;
			oscillator_3 = null;
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
    if (!oscillator || !oscillator_2 || !oscillator_3) {
      return;
		}

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}
		
		document.getElementById("random").addEventListener('click', (e)=>{
			
			i = 500;
			while(i > 0){
			oscillator.frequency.value = xValue + getRandomInt(100,1000);
			oscillator_2.frequency.value = yValue + getRandomInt(100,1000);
			i--;
			}
		});

    // define a frequência para a posição x do mouse!
    oscillator.frequency.value = xValue;
	oscillator_2.frequency.value = yValue;
	oscillator_3.frequency.value = xValue;


	});

	$('body').on('touchmove', function(e) {
    // Pega o movimento do mouse nos eixos X e Y!
    var xValue = e.clientX;
    var yValue = e.clientY;

    // dêem uma olhada nos valores ao movimentar o mouse
    x.text(xValue);
    y.text(yValue);

    // se não temos um oscilador funcionando nesse momento, então, 
    // não temos nada mais a fazer aqui, apenas retornar
    if (!oscillator || !oscillator_2 || !oscillator_3) {
      return;
    }

    // define a frequência para a posição x do mouse!
    oscillator.frequency.value = xValue;
	oscillator_2.frequency.value = yValue;
	oscillator_3.frequency.value = xValue

	});

});