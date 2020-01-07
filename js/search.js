// (function($) {
//     var $search = $(".search"),
//         $input = $search.find('.search-box'),
//         $btn = $search.find('.search-button'),
//         $layer = $search.find('.search-layer'),
//         $items = $search.find('.search-item');
//     $form = $search.find('form');
//     console.log($items);
//     $form.on('submit', function() {
//         if (!$.trim($input.val())) {
//             alert('输入不能为空');
//             return false;
//         }
//     });

//     $input.on('input', function() {
//         var $url = 'https://suggest.taobao.com/sug?code=utf-8&q=' + encodeURIComponent($(this).val()) + '&_ksTS=1574520407431_710&callback=jsonp711&k=1&area=c2c&bucketid=20';
//         $.ajax({
//             url: $url,
//             dataType: 'jsonp',
//             success: function(data) {
//                 var html = ''
//                 var result = data.result;
//                 console.log(result);
//                 for (var i = 0, len = data.result.length; i < len; i++) {
//                     html += '<li class="search-item">' + result[i][0] + '</li>';
//                 }

//                 $layer.html(html).show();
//                 // $(this).dropdown({ event: 'input' });

//             },
//             error: function(data) {

//             }
//         });
//     });

//     $input.on('focus', function() {
//         $layer.show();
//     }).on('click', function() {
//         return false;
//     });

//     $(document).on('click', function() {
//         $layer.hide();
//     });



//     $layer.on('click', '.search-item',
//         function(event) {
//             $input.val($(this).text());
//             // event.stopPropagation();
//             $input.parent().submit();

//             event.stopPropagation();
//         });

// })(jQuery);

(function($) {
    'use strict';

    function Search($ele, opts) {
        this.$ele = $ele;
        this.opts = opts;

        this.$input = this.$ele.find('.search-box');
        this.$layer = this.$ele.find('.search-layer');
        this.$form = this.$ele.find('form');
        // var own = this;
        var self = this;
        this.$ele.on('click', '.search-button', $.proxy(this.submit, this));

        this.$input.on('input', $.proxy(this.getData, this)).on('focus', function() {
            self.showLayer();
        }).on('click', function() {
            // body...
            return false;
        });

        this.$layer.on('click', '.search-item',
            $.proxy(this.autocomplete, this));

        $(document).on('click', function() {
            self.hideLayer();
        })

    }

    Search.DEFAULTS = {
        autocomplete: false,
        animation: 'fade',
        url: 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1574520407431_710&callback=jsonp711&k=1&area=c2c&bucketid=20&q=',
        js: false,
        css3: true
    }

    Search.prototype.submit = function() {

        if (this.getInputVal()) {
            this.$form.submit();
        } else {
            alert('输入不能为空！');
            return false;;
        }

    }

    Search.prototype.autocomplete = function(e) {
        // var $target = e.
        // console.log(e);
        this.$input.val(e.target.innerHTML) && this.submit();

    }

    Search.prototype.getData = function() {
        var proxy = this;
        var value = this.getInputVal();
        if (!value) return;
        $.ajax({
            url: this.opts.url + encodeURIComponent(value),
            dataType: 'jsonp',
            success: function(data) {
                var html = ''
                var result = data.result;
                // console.log(result);
                for (var i = 0, len = data.result.length; i < len; i++) {
                    html += '<li class="search-item">' + result[i][0] + '</li>';
                }

                proxy.$layer.html(html);
                proxy.showLayer();
                // $(this).dropdown({ event: 'input' });

            },
            error: function(data) {
                alert('get dat error!');
            }
        })
    }
    Search.prototype.showLayer = function() {
        this.$layer.show();
    }

    Search.prototype.hideLayer = function() {
        this.$layer.hide();
    }

    Search.prototype.getInputVal = function() {
        // body...
        var val = $.trim(this.$input.val());
        if (!val) {
            // alert('输入不能为空');
            return;
        }
        return val;
    }

    $.fn.extend({
        search: function(option) {
            return this.each(function() {
                var $this = $(this),
                    search = $this.data('search'),
                    options = $.extend({}, Search.DEFAULTS, $(this).data(), typeof option === 'object' && option);
                // console.log(options);


                if (!search) {
                    $this.data('search', search = new Search($this, options));
                }
                // console.log(search);
                if (typeof search[option] === 'function') {
                    search[option]();
                }
            });
        }
    })
})(jQuery)