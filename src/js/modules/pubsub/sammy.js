// ### AMD wrapper
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['uijet_dir/uijet', 'sammy'], function (uijet) {
            return factory(uijet);
        });
    } else {
        root.uijet_pubusb = factory(uijet);
    }
}(this, function (uijet) {
    return function (app, context) {
        uijet.use({
            publish         : function (topic, data) {
                app.trigger(topic, data);
                return this;
            },
            subscribe       : function (topic, handler, context) {
                if ( context ) {
                    if ( typeof handler == 'string' ) {
                        handler = context[handler];
                    }
                    handler = handler.bind(context);
                }
                app.bind(topic, handler);
                return this;
            },
            unsubscribe     : function (topic, handler) {
                app._unlisten(topic, handler);
                return this;
            }
        }, uijet, context);

        return app;
    };
}));