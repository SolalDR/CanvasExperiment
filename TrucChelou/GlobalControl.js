function GlobalControl(selector, store, callback){
  this.callback = callback
	this.store = store; 
  this.container = document.querySelector(selector);
  if(this.container){
    this.generateControls();
  }
  
}

GlobalControl.prototype = {
  generateControls: function(){
    for(param in this.store) {
      this.generateControl(param);
    }
  },

  initEvent: function(el, paramName){
    var self = this;
    el.addEventListener("input", function(){
      self.store[paramName][this.getAttribute('data-bind')] = parseFloat(this.value);
        self.callback();
    }, false)
  },

  initEvents: function(container, paramName){
    var inputs = container.querySelectorAll('input'); 
    for(i=0; i<inputs.length; i++) {
      this.initEvent(inputs[i], paramName);
    }
  },

  generateControl: function(paramS){
    var param = this.store[paramS];
    var els = [];
    var container = document.createElement('div'); 
    container.className = "control-group"; 
    
    var label = document.createElement("label");
    label.innerHTML = (param.name) ? param.name : paramS

    container.appendChild(label);
    if(param.val || parseInt(param.val) === 0) {
      var input = document.createElement("input");
      input.setAttribute("type", (param.type) ? param.type : 'text');
      input.setAttribute("data-bind", 'val');
      if(param.min) input.setAttribute("min", param.min);
      if(param.max) input.setAttribute("max", param.max);
      input.setAttribute("val", param.val);
      els.push(input);
    } else {
      for(attribute in param) {
        if(attribute != "type") {
          var input = document.createElement("input");
          input.setAttribute("type", (param.type) ? param.type : 'text');
          input.setAttribute("data-bind", attribute);
          input.setAttribute("value", param[attribute]);
          els.push(input);
        }       
      }
    }

    for(i=0; i<els.length; i++){
      container.appendChild(els[i]);
    }
    this.container.append(container);
    this.initEvents(container, paramS, param);
  }
}