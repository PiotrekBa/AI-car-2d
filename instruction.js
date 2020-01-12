function getInstruction() {
    return '<p><h2>Instruction</h2></p>'+
    '<p>The purpose of the application is to create a car that learns to drive the selected track. In the app I use: '+
    '<br>  - basic physics to simulate car drive' +
    '<br>  - AI to run a track' +
    '<br>  - genetic algorithms to improve car driving skill'+
    '<br><br>'+
    'For graphic representation I use p5.js library.</p>'+
    '<br><h4>Map and car</h4>'+
    '<p>Black lines - boundaries of the track</p>'+
    '<p>Red lines - checkpoints, last checkpoint is a finish line</p>'+
    '<p>Green rectangles - car</p>'+
    '<p>Red rectangle - the best car from previous generation</p>'+
    '<p>Black/Red dots - track boundary detector in a car (every car has 5)</p>'+
    '<p>Black dots - track boundary detector in a car that cannot see the boundary</p>'+
    '<p>Red dots - track boundary detector in a car that see the boundary</p>'+
    '<br><h4>Progress bar</h4>'+
    '<p>Progress bar shows how much the best car has passed checkpoints</p>'+
    '<br><h4>Neural network</h4>'+
    '<p>The neural network graph shows the visualization of the best car brain in generation</p>'+
    '<img src="Bez nazwy.png" height="500"/>'+
    '<p>Inp - inputs of a neural network, everyone to one track boundary detector of a car</p>'+
    '<p>h1 - first hidden layer with neurons</p>'+
    '<p>h2 - second hidden layer with neurons</p>'+
    '<p>O - outputs of neural network whith neurons, first is for gas pedal and second is for turn a car</p>'+
    '<p>Circle - (h1,h2 and O) neurons </p>'+
    '<p>Black line - neuron weight with zero value</p>'+
    '<p>Red line - neuron weight with positive value</p>'+
    '<p>Blue line - neuron weight with negative value</p>'+
    '<p>Black circle border - neuron bias with zero value</p>'+
    '<p>Red circle border - neuron bias with positive value</p>'+
    '<p>Blue circle border - neuron bias with negative value</p>'+
    '<br><h4>Progress chart</h4>'+
    '<p>Progress chart shows the progress of the best car time after driving the whole track.</p>'+
    '<br><h4>Settings</h4>'+
    '<p>Population - it says how many cars there will be in each generation</p>'+
    '<p>Dichotomous turn - when checked, the car turns at maximum turn. When unchecked'+ 
    ' the car turns in proportion to the value of neural network turn output</p>' +
    '<p>1 Hidden layer - amount of neurons in first hidden layer</p>'+
    '<p>2 Hidden layer - amount of neurons in second hidden layer</p>'+
    '<p>Kill button - use with care, only in case you see that the last cars will definitely not reach the finish line or no hit the boundary'
    ;
}