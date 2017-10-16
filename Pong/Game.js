function Game(args) {
	this.config = args.config
	this.ctx = args.ctx
	this.canvas = args.canvas
	this.players = []
	this.balle = new Balle({
		canvas: this.canvas,
		config: this.config.balle
	})
}

Game.prototype = {

	addPlayer: function(args) {
		var raquette = new Raquette({
			canvas: this.canvas,
			top: this.canvas.height/2,
			side: args.side,
			config: this.config.raquette,
			control: args.control
		})
		raquette.addCollapser(this.balle)
		console.log(this.balle)
		this.players.push(raquette)
	},

	render: function() {
		for(i=0; i<this.players.length; i++) {
			this.players[i].render(this.ctx);
		}
		this.balle.render(this.ctx)
	}
}