define([
    '../../dojo/_base/declare',
    'dojo/dom',
    'dojo/_base/array',
    'dojo/dom-construct',
    'dijit/_WidgetBase'
], function (declare, dom, array, domConstruct, _WidgetBase) {

    return declare([_WidgetBase], {

        layout: null,

        postCreate: function () {
            this.inherited(arguments);
            this.layout && this.createImages();
        },

        createImages: function () {
            var self = this;
            array.forEach(self.layout, function (item) {
                var node = self.domNode;
                if (item.href) {
                    node = domConstruct.create('a', {
                        href: item.href
                    }, node);
                    if (item.target) {
                        node.target = item.target;
                    }
                }
                domConstruct.create('img', {
                    src: item.src,
                    alt: item.alt
                }, node);
            });
        }
    });

});