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
    var self = this;
    
    self.cont = document.getElementById(opt.container) || document.body;
    self.speed = opt.speed || 50;
    self.delay = opt.delay || 0;
    
    // Cursor functions
    self.cursor = {
        enabled: opt.enableCursor || true
    };
    
    // Queue features
    self.queue = [];
    self.isTyping = false;
    self.typeEvent = new Event("type");

    document.addEventListener("type", function () {
        // Do nothing if typing in progress
        if (self.isTyping || !self.queue.length) {return;}  
        self.isTyping = true;

        // Take one out of the queue and initialize
        var qItem = self.queue.shift();
        var length = qItem.text.length;
        var index = 0;
        var error = 0;
        
        setTimeout(function() {
            var typing = setInterval(function () {
                qItem.cont.innerHTML = qItem.text.substring(0, ++index);

                // after typing
                if (length < index || error++ > 1000) {
                    clearInterval(typing);
                    self.addCursor(qItem.cont);

                    // If erase is required 
                    if (qItem.erase && self.queue.length) {
                        self.erase(null,{triggerType: true, delay: qItem.delay})
                    } else {
                        setTimeout(function() {
                            self.isTyping = false;
                            document.dispatchEvent(self.typeEvent);
                        }, 100);
                    }
                }
            }, qItem.speed);
        }, qItem.delay);
    });
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
    var self = this;
    var opt = options || {};
    var cont = opt.container || self.cont;
    var speed = opt.speed || self.speed;
    var delay = opt.delay || self.delay;

    // Add text to queue
    var qItem = {
        text: text,
        cont: cont,
        speed: speed,
        delay: delay
    }
    if (text && typeof text === 'string') {self.queue.push(qItem);}
    console.log(self.queue);
    document.dispatchEvent(self.typeEvent);
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

                // trigger Type
                if (opt.triggerType) {
                    self.isTyping = false;
                    document.dispatchEvent(self.typeEvent);
                }
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
    var opt = options || {};
    var cont = opt.container || self.cont;
    var speed = opt.speed || self.speed;
    var delay = opt.delay || self.delay;

    var qItem = {
        text: text,
        speed: speed,
        delay: delay,
        cont: cont,
        erase: true
    }
    self.queue.push(qItem);
    console.log(self.queue);
    document.dispatchEvent(self.typeEvent);
}

/**
 * Add Cursor function 
 * function to Add a Cursor to the container
 * 
 * @param {Node} container the dom element to add the cursor to.
 * 
 */
TypingTool.prototype.addCursor = function (container) {
    var self = this;
    if(!self.cursor.enabled) {return};

    // Add cursor style if necessary
    if (!self.cursor.hasStylesheet) {
        // Create a new style tag
        var style = document.createElement("style");
        
        style.innerHTML = 
        '.cursor { \
            position: relative;\
            top: -1px;\
            font-size: 1.1em;\
            animation: blink 1s linear infinite;\
         }\
         @keyframes blink {0% {opacity:0} 49% {opacity:0} 50% {opacity:1} 100% {opacity:1} }';
        document.head.appendChild(style);
        self.cursor.hasStylesheet = true;
    }
    
    // Add Cursor
    var cursor = document.createElement("span");
    var cont = document.getElementById(container) || self.cont;
    
    cursor.classList.add("cursor");
    cursor.innerHTML = "|";
    cont.appendChild(cursor);
}