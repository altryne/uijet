// ### AMD wrapper
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['uijet_dir/uijet', 'jquery'], function (uijet, $) {
            return factory(uijet, $);
        });
    } else {
        factory(uijet, root.jQuery);
    }
}(this, function (uijet, $) {
    uijet.use({
        Promise     : $.Deferred,
        when        : $.when,
        isPromise   : function (obj) {
            return obj && uijet.isFunc(obj.then);
        }
    }, uijet, $);
}));