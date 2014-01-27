define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dijit/_WidgetBase'
], function (declare, array, domConstruct, domClass, _WidgetBase) {

    return declare([_WidgetBase], {

        'class': 'grid-widget',

        noDataMessage: 'No data exists.',

        errorMessage: 'Failed to load data.',

        caption: null,

        header: null,

        body: null,

        footer: null,

        store: null,

        query: null,

        data: null,

        buildRendering: function () {
            this.domNode = domConstruct.create('table');
        },

        postCreate: function () {
            this.inherited(arguments);
            this._createGrid();
        },

        _createGrid: function () {
            this.class && domClass.add(this.domNode, this.class);
            if (this.style) {
                this.domNode.style = this.style;
            }

            this.caption && domConstruct.create('caption', {
                innerHTML: this.caption
            }, this.domNode);

            this.header && this._createHeader();
            this.footer && this._createFooter();
            this.body && this._createBody();
        },

        _createHeader: function () {
            var header = domConstruct.create('thead', null, this.domNode);
            this.header.class && domClass.add(header, this.header.class);
            var row = domConstruct.create('tr', null, header);
            array.forEach(this.header.layout, function (item) {
                var cell = domConstruct.create('td', null, row);
                if (item.label) {
                    cell.innerHTML = item.label;
                }
                item.formatter && item.formatter(cell);
            });
        },

        _createFooter: function () {
            var footer = domConstruct.create('tfoot', null, this.domNode);
            this.footer.class && domClass.add(footer, this.footer.class);
            var row = domConstruct.create('tr', null, footer);
            array.forEach(this.footer.layout, function (item) {
                var cell = domConstruct.create('td', null, row);
                if (item.label) {
                    cell.innerHTML = item.label;
                }
                item.formatter && item.formatter(cell);
            });
        },

        _createBody: function () {
            var self = this;

            var body = domConstruct.create('tbody', null, this.domNode);
            this.body.class && domClass.add(body, this.body.class);

            var hasData = false;
            if (this.data) {
                array.forEach(this.data, function (item) {
                    hasData = true;
                    self._createBodyRow(body, item);
                });
                if (!hasData && this.header && this.header.layout) {
                    self._handleNoData(body);
                }
            } else if (this.store) {
                this.query && this.store.query(this.query).forEach(function (item) {
                    hasData = true;
                    self._createBodyRow(body, item);
                }).then(function (response) {
                        if (!hasData && self.header && self.header.layout) {
                            self._handleNoData(body);
                        }
                    }, function (err) {
                        self._handleError(body);
                    });

                !this.query && this.store.query().forEach(function (item) {
                    hasData = true;
                    self._createBodyRow(body, item);
                }).then(function (response) {
                        if (!hasData && self.header && self.header.layout) {
                            self._handleNoData(body);
                        }
                    }, function (err) {
                        self._handleError(body);
                    });
            }

        },

        _handleNoData: function (body) {
            var row = domConstruct.create('tr', null, body);
            domConstruct.create('td', {
                'colspan': this.header.layout.length,
                innerHTML: this.noDataMessage
            }, row);
        },

        _handleError: function (body) {
            domConstruct.empty(body);
            var row = domConstruct.create('tr', null, body);
            domConstruct.create('td', {
                'colspan': this.header.layout.length,
                innerHTML: this.errorMessage
            }, row);
        },

        _createBodyRow: function (body, item) {
            var row = domConstruct.create('tr', null, body);
            array.forEach(this.body.layout, function (field) {
                var cell = domConstruct.create('td', null, row);
                if (field.field) {
                    cell.innerHTML = item[field.field];
                }
                field.formatter && field.formatter(cell, item);
            });
        }
    });
});