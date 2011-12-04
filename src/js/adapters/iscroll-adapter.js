uijet.Adapter('iScroll', {
    setScrolling: function (switch_on) {
        var iS_ops = {
            bounce  : false
        };
        if ( switch_on ) {
            this._wrap();
            if ( this.options.horizontal ) {
                iS_ops.vScroll = false;
                iS_ops.vScrollbar = false;
            }
            this.iScroll = new iScroll(this.$wrapper[0], iS_ops);
        } else {
            this.iScroll && this.iScroll.destroy();
        }
        return this;
    },
    scrollTo    : function (element) {
        this.iScroll && this.iScroll.scrollToElement(element);
    }
});
