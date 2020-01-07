(function($) {
    'use strict'
    var transition = window.mt.transition;

    function Slider($elem, opts) {

        this.$elem = $elem;
        // this.timer = null;
        this.opts = opts;
        this.moved = false;
        this.$slider = this.$elem.find('.slider-item');
        this.$indicator = this.$elem.find('.slider-indicator-item');
        // console.log(this.$indicator);
        this.$nextbtn = this.$elem.find('.right-button');
        this.$prvbtn = this.$elem.find('.left-button');
        this.$index = this._getCurrectIndex(opts.activeIndex);

        this._init($elem, opts);

        // this.startAutoMove();
        // this.direciton = -1;
        this.startAuto();




    }

    Slider.prototype._init = function($elem, opts) {
        var proxy = this;

        this.$indicator.removeClass('slider-indicator-active');
        this.$indicator.eq(this.$index).addClass('slider-indicator-active');
        // this.$slider.showHide(opts);

        if (opts.animate === "fade") {
            this.$elem.addClass('slider-fade');
            // this.$slider.addClass('fadeOut');
            this.$slider.eq(this.$index).showHide("show");
            this.to = this._fade;

        } else if (opts.animate === 'slide') {
            this.$elem.addClass('slider-slide');
            this.$slider.eq(this.$index).css({ left: 0 });
            this.$sliderWidth = this.$elem.width();
            this.to = this._slide;
            // this.$slider.removeClass('transition');
        }



        this.$elem.on('click', '.slider-indicator-item', function() {
            clearTimeout(proxy.timer);
            proxy.timer = null;
            if (proxy.$index != $(this).index()) {

                proxy.to($(this).index());
            }
            return false;
        }).on('click', '.left-button', function() {
            clearTimeout(proxy.timer);
            proxy.timer = null;
            proxy.to(proxy.$index - 1);
            return false;
        }).on('click', '.right-button', function() {
            clearTimeout(proxy.timer);
            proxy.timer = null;
            proxy.to(proxy.$index + 1);
            return false;
        });

        // this.$nextbtn.on('click', $.proxy(this.clickMoveNext, this));
        // this.$prvbtn.on('click', $.proxy(this.movePrevious, this));

        this.$slider.on("show shown hide hidden", function(e) {
            proxy.$elem.trigger('slide-' + e.type, [proxy.$slider.index(this), this])
        });
    }

    Slider.prototype._slide = function(index) {
        // if (index >= this.$slider.length - 1 || index <= 0) {
        //     this.direciton = -this.direciton;
        // }
        var num = this._getCurrectIndex(index);
        if (index > this.$index) {

            this.$slider.eq(num).removeClass('transition').css({ left: -this.$sliderWidth });
            this.$slider.eq(num).css('left');
            this.$slider.eq(this.$index).move('x', this.$sliderWidth);
            // debugger;
        } else if (index < this.$index) {
            this.$slider.eq(num).removeClass('transition').css({ left: this.$sliderWidth });
            this.$slider.eq(num).css('left');
            this.$slider.eq(this.$index).move('x', -this.$sliderWidth);
        } else {
            return;
        }
        this.$slider.eq(num).addClass('transition').move('x', 0);
        this.$indicator.eq(this.$index).removeClass('slider-indicator-active');
        this.$indicator.eq(num).addClass('slider-indicator-active');
        this.$index = num;
        this.startAuto();
    }

    Slider.prototype._fade = function(index) {
        // console.log(this.timer);
        index = this._getCurrectIndex(index);
        // console.log(index);
        // this.$slider.eq(this.$index).hide();
        this.$slider.eq(this.$index).showHide('hide');
        this.$slider.eq(index).showHide('show');
        // this.$slider.eq(index).show();
        this.$indicator.eq(this.$index).removeClass('slider-indicator-active');
        this.$indicator.eq(index).addClass('slider-indicator-active');
        this.$index = index;
        this.startAuto();
    }

    Slider.prototype.autoAnimate = function() {
        var proxy = this;
        this.timer = setInterval(function() {
            proxy.to(proxy.$index + 1);
        }, 3000)
    }

    Slider.prototype._getCurrectIndex = function(index) {
        if (index >= this.$slider.length) {
            index = 0;

        }
        if (index < 0) index = this.$slider.length - 1;
        return index;
    }

    Slider.prototype.startAuto = function() {
        if (this.opts.auto && !this.timer) {
            this.autoAnimate();
        }
    }


    Slider.DEFAULTS = {
        css3: true,
        js: false,
        animate: 'fade',
        activeIndex: 0,
        auto: true
    };

    $.fn.extend({
        slide: function(option) {
            return this.each(function() {
                console.log($(this));
                var $this = $(this),
                    slide = $this.data('slide'),
                    options = $.extend({}, Slider.DEFAULTS, $(this).data(), typeof option === 'object' && option);



                if (!slide) {
                    $this.data('slide', slide = new Slider($this, options));
                }
                // console.log(slide);
                if (typeof slide[option] === 'function') {
                    slide[option]();
                }
            });
        }
    });

})(jQuery);