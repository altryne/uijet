//TODO: try converting this widget into a mixin
(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['uijet_dir/uijet', 'uijet_dir/widgets/Base', 'uijet_dir/mixins/Layered'], function (uijet) {
            return factory(uijet);
        });
    } else {
        factory(uijet);
    }
}(function (uijet) {
    uijet.Widget('Overlay', {
        options     : {
            type_class  : 'uijet_overlay'
        },
        init        : function (options) {
            this._super(options).render()
                ._finally();
            return this;
        },
        render      : function () {
            this._super();
            if ( this.options.darken ) {
                (this.$wrapper || this.$element).addClass('darken');
                // no need to repeat this
                delete this.options.darken;
            }
            return this;
        },
        appear      : function () {
            if ( this.$wrapper ) {
                this.$wrapper.addClass('z_top')[0].style.visibility = 'visible';
            } else {
                this.$element.addClass('z_top');
            }
            this._super();
            return this;
        },
        disappear   : function (no_transitions) {
            if ( this.$wrapper ) {
                this.$wrapper.removeClass('z_top')[0].style.visibility = 'hidden';
            } else {
                this.$element.removeClass('z_top');
            }
            this._super(no_transitions);
            return this;
        }
    }, ['Layered']);
}));