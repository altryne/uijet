// ### AMD wrapper
(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([
            'uijet_dir/uijet',
            'uijet_dir/widgets/Base',
            'uijet_dir/mixins/Submitted'
        ], function (uijet) {
            return factory(uijet);
        });
    } else {
        factory(uijet);
    }
}(function (uijet) {
    var boolean_type_re = /checkbox|radio/i;

    uijet.Widget('Form', {
        options         : {
            type_class  : 'uijet_form',
            serializer  : function () {
                var $fields = this.$element.find('[name]'),
                    data = {};
                $fields.each(function (i, field) {
                    var name = field.name;
                    // if it's a checkbox or a radio field and not checked ignore
                    if ( ! boolean_type_re.test(field.type) || field.checked ) {
                        // if this key already exists
                        if ( name in data ) {
                            // if it's corresponding value is not an `Array`
                            if ( ! uijet.Utils.isArr(data[name]) ) {
                                // wrap it in an `Array`
                                data[name] = [data[name]];
                            }
                            // push the new value to the list
                            data[name].push(field.value);
                        }
                        else {
                            // otherwise just set this value
                            data[name] = field.value;
                        }
                    }
                });
                return data;
            }
        },
        register        : function () {
            var that = this;
            this._super();
            // check if there's no one else handling the form submit event, e.g. Sammy.js
            if ( ! uijet.options.submit_handled ) {
                this.$element.on('submit', function (e) {
                    // stop and prevent it
                    e.preventDefault();
                    e.stopPropagation();
                    // instead call `send`
                    that.send();
                });
            } else {
                // otherwise register this Form on the sandbox via `uijet.Form`
                uijet.Form(this.id, this);
            }
            return this;
        },
        appear          : function () {
            var $inputs;
            this._super();
            // on iOS devices the element.focus() method is broken  
            // if `dont_focus` option is not set to `true`
            if ( ! this.options.dont_focus ) {
                // find first `<input>` and focus on it
                $inputs = this.$element.find('input');
                $inputs.length && $inputs.get(0).focus();
            }
            return this;
        },
        // ### widget.getSendRoute
        // @sign: getSendRoute()  
        // @return: send_route OR `null`
        //
        // Returns an `Object` with __method__ and __path__ keys which represent a RESTful route, which
        // is the route that's called when the form is submitted.  
        // Checks the `send_route` option, if it's an `Object` then use its path value, or if it's a `String`
        // then use it as __path__.  
        // If this option isn't set check for the `actoin` attribute of `$element`.  
        // If that isn't set too then return `null`.  
        // if this option isn`t set, check for the method value or check the `method` attribute on `$element`, or
        // simply use 'get'.
        getSendRoute    : function () {
            var route = this.options.send_route,
                path = route ? route.path || route : this.$element.attr('action');
            return path ? { method: route && route.method || this.$element.attr('method') || 'get', path: path } : null;
        },
        // ### widget.clearErrors
        // @sign: clearErrors()
        // @return: this
        //
        // Clears error messages in the DOM.
        clearErrors     : function () {
            // looks for elements with `error` `class` and empties them.
            this.$element.find('.error').empty();
            return this;
        }
    }, ['Submitted']);
}));