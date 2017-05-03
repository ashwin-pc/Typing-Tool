function TypingTool(options) {
    var opt = options || {};
    
    this.cont = document.getElementById(opt.container) || document.body;
    this.speed = opt.speed || 100;
    this.delay = opt.delay || 0;
}

// Method to type text
TypingTool.prototype.type = function (text, options) {
    var length = text.length;
    var index = 0;
    var self = this;
    var opt = options || {};
    var cont = opt.container || self.cont;
    var speed = opt.speed || self.speed;
    var delay = opt.delay || self.delay;

    if (!text) {return}

    setTimeout(function() {
        var typing = setInterval(function () {
            cont.innerHTML = text.substring(0, index++);
            if (length < index) {
                clearInterval(typing);
            }
        }, speed);
    }, delay);

}

// Method to erase text
TypingTool.prototype.erase = function (partialLength, options) {
    var self = this;
    var opt = options || {};
    var cont = opt.container || self.cont;
    var speed = opt.speed || self.speed;
    var delay = opt.delay || self.delay;
    
    var text = cont.innerText;
    var index = text.length;
    var stop = (partialLength) ? index - partialLength : 0 ;

    setTimeout(function() {
        var erasing = setInterval(function () {
            cont.innerHTML = text.substring(0, index--);
            if (index < stop) {
                clearInterval(erasing);
            }
        }, speed);
    }, delay);    
    
}

// Method to erase then type text
TypingTool.prototype.eraseAndType = function (text, options) {
    var self = this;
    var cont = options.container || self.cont;
    var speed = options.speed || self.speed;
    var delay = options.delay || self.delay;
    var timeout = (speed * cont.innerText.length) + delay + 100;
    
    self.erase(null, options);
    setTimeout(function() {
        self.type(text, options);
    }, timeout);
}
