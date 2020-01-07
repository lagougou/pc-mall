(function($) {
    'use strict';

    function Tab($elem, options) {
        // body..
        this.$elem = $elem;
        this.opts = options;
        this.$items = this.$elem.find('.tab-item');
        this.$panels = this.$elem.find('.tab-panel');
        this.itemNum = this.$items.length;
        this.curIndex = options.activeIndex;

        this._init();


    }

    Tab.prototype._init = function() {
        this.$items.removeClass('tab-item-active');
        this.$items.eq(this.curIndex).addClass('tab-item-active');
        this.$panels.removeClass('tab-panel-active');
        this.$panels.eq(this.curIndex).addClass('tab-panel-active');

        var proxy = this;
        // console.log(this.opts);
        console.log(this.itemNum);
        this.$elem.on(this.opts.event, '.tab-item', function() {
            console.log($(this));
            proxy.show(proxy.$items.index(this));
            return false;
        });
    }

    Tab.prototype.show = function(index) {
        if (this.curIndex == index) return;
        this.$items.eq(this.curIndex).removeClass('tab-item-active');
        this.$panels.eq(this.curIndex).removeClass('tab-panel-active');

        this.$items.eq(index).addClass('tab-item-active');
        this.$panels.eq(index).addClass('tab-panel-active');
        this.curIndex = index;
    }


    Tab.DEFAULTS = {
        event: 'mouseenter',
        css3: true,
        js: false,
        activeIndex: 1,
        animation: 'fade'
    };


    $.fn.extend({
        tabs: function(option) {
            return this.each(function() {
                var $this = $(this),
                    mode = $this.data('tabs'),
                    options = $.extend({}, Tab.DEFAULTS, typeof option === 'object' && option);

                if (!mode) {
                    $this.data('tabs', mode = new Tab($this, options));
                }

                if (typeof mode[option] === 'function') {
                    mode[option]();
                }
            })
        }
    });

})(jQuery)