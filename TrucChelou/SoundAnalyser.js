function SoundAnalyser(url, args){
	window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;
	this.ctx = new AudioContext();
	this.analyser = this.ctx.createAnalyser();
	this.buffer = null;
	this.gain = this.ctx.createGain();
	this.echantillon = 50;
	this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
	this.easeAverage = 0;
	this.average = 0
	this.kicks = [];

	if(args.active !== false) this.load(url);
}

SoundAnalyser.prototype =  {
	load: function(url){
		var self = this;
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		// Decode asynchronously
		request.onload = function() {
			self.ctx.decodeAudioData(request.response, function(buffer) {
			// success callback
			self.buffer = buffer;

			// Create sound from buffer
			self.audio = self.ctx.createBufferSource();
			self.audio.buffer = self.buffer;

			// connect the audio source to context's output
			self.audio.connect( self.analyser )
			self.analyser.connect( self.ctx.destination )

			// play sound
			self.audio.start();

			// self.callback();
		}, function(e){
			console.log(e)
        });
        }
        request.send();
    },

    addKick: function(value){
    	this.kicks.push({
    		value: value,
    		name: name
    	})
    },

    hasKicked: function(kick, value){
    	if( kick < value ) {
    		return true;
    	}
    	return false;
    },

    getFrequencies: function(){
    	this.analyser.getByteFrequencyData(this.frequencyData);
    	return this.frequencyData
    },

    getFrequenciesUsed: function(){
    	this.getFrequencies();
    	var frequences = [];
    	var step, id;
    	for(i=0; i < this.echantillon; i++) {
    		step = i/this.echantillon;     		
    		id = Math.floor(1024 * step);
    		frequences.push(this.frequencyData[id]);
    	}
    	return frequences;
    },

    getEaseFrequency: function(ease) {
    	var freqs = this.getFrequenciesUsed();
    	var cumul = 0;
    	for(i=0; i<freqs.length; i++){
    		cumul+= freqs[i];
    	}
    	this.average = cumul/freqs.length; 
    	this.easeAverage += (this.average - this.easeAverage) * ease;  //cumul/freqs.length
    	return this.easeAverage;
    },

    getAverageFrequency: function() {
    	var freqs = this.getFrequenciesUsed();
    	var cumul = 0;
    	for(i=0; i<freqs.length; i++){
    		cumul+= freqs[i];
    	}
    	return cumul/freqs.length;
    }
}