(function($) {
    'use strict'
    var transition = window.mt.transition;
    var Css3 = function($elem) {
        // body...
        this.$elem = $elem;
        this.$elem.addClass('transition');
        this.curX = parseFloat(this.$elem.css('left'));
        this.curY = parseFloat(this.$elem.css('top'));
        this.$elem.css({ left: this.$curX, top: this.$curY });
    }

    Css3.prototype.to = function(x, y) {
        var proxy = this;
        if (this.curX === x && this.curY === y) return;
        this.$elem.off(transition.end).on(transition.end, function() {
            proxy.$elem.trigger('moved', [this.$elem]);
        });
        this.$elem.trigger('move', [this.$elem]);
        this.$elem.css({ left: x, top: y });
        this.curX = x;
        this.curY = y;

    }

    Css3.prototype.x = function(x) {
        this.to(x, this.curY);
    }

    Css3.prototype.y = function(y) {
        this.to(this.curX, y);
    }

    var Js = function($elem) {
        // body...
        this.$elem = $elem;
        this.$elem.removeClass('transition');
        this.curX = parseFloat(this.$elem.css('left'));
        this.curY = parseFloat(this.$elem.css('top'));
    }

    Js.prototype.to = function(x, y) {
        var proxy = this;
        if (this.curX === x && this.curY === y) return;
        this.$elem.stop().animate({ left: x, top: y }, function() {

        });
        this.curX = x;
        this.curY = y;

    }

    Js.prototype.x = function(x) {
        this.to(x, this.curY);
    }

    Js.prototype.y = function(y) {
        this.to(this.curX, y);
    }

    var Silent = function($elem) {
        // body...
        this.$elem = $elem;
        this.$elem.removeClass('transition');
        this.curX = parseFloat(this.$elem.css('left'));
        this.curY = parseFloat(this.$elem.css('top'));
    }

    Silent.prototype.to = function(x, y) {
        if (this.curX === x && this.curY === y) return;
        this.$elem.css({ left: x, top: y });

        this.curX = x;
        this.curY = y;
    }

    Silent.prototype.x = function(x) {
        this.to(x, this.curY);
    }

    Silent.prototype.y = function(y) {
        this.to(this.curX, y);
    }





    var DEFAULTS = {
        css3: true,
        js: false
    }

    $.fn.extend({
        move: function(option, x, y) {
            return this.each(function() {
                var $this = $(this),
                    move = $this.data('move'),
                    options = $.extend({}, DEFAULTS, typeof option === 'object' && option);



                if (!move) {
                    if (options.css3) {
                        $this.data('move', move = new Css3($this));
                    } else if (options.js) {
                        $this.data('move', move = new Js($this));
                    } else {
                        $this.data('move', move = new Silent($this));
                    }

                }

                console.log(move);
                if (typeof move[option] === 'function') {
                    move[option](x, y);
                }
            });
        }
    });

})(jQuery)