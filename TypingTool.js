/**
 * Typing tool Class: 
 * Class to simulate typing like actions
 * 
 * @param {Object} options Options for the default settings of the class
 * @param {Node} options.container the dom element to perform the typing on.
 * @param {Number} options.speed the default speed of typing
 * @param {Number} options.delay the default delay for typing
 * 
 */
function TypingTool(options) {
    var opt = options || {};
    
    this.cont = document.getElementById(opt.container) || document.body;
    this.speed = opt.speed || 100;
    this.delay = opt.delay || 0;
}

/**
 * Type function 
 * function to simulate typing a line
 * 
 * @param {String} text The text to type
 * @param {Object} options Options for the default settings of the class
 * @param {Node} options.container the dom element to perform the typing on.
 * @param {Number} options.speed the default speed of typing
 * @param {Number} options.delay the default delay for typing
 * 
 */
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

/**
 * Type function 
 * function to simulate erasing a line
 * 
 * @param {Number} partialLength number of characters from the end to be erased in case of partial erasure.
 * @param {Object} options Options for the default settings of the class
 * @param {Node} options.container the dom element to perform the typing on.
 * @param {Number} options.speed the default speed of typing
 * @param {Number} options.delay the default delay for typing
 * 
 */
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


/**
 * Erase then Type function 
 * function to simulate erasing then typing of a line
 * 
 * @param {String} text The text to type
 * @param {Object} options Options for the default settings of the class
 * @param {Node} options.container the dom element to perform the typing on.
 * @param {Number} options.speed the default speed of typing
 * @param {Number} options.delay the default delay for typing
 * 
 */
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