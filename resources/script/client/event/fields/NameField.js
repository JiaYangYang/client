define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dijit/form/ValidationTextBox',
    'dijit/_WidgetBase'
], function (declare, domConstruct, ValidationTextBox, _WidgetBase) {

    return declare([_WidgetBase], {

        label: 'Name',

        _widget: null,

        postCreate: function () {
            this.inherited(arguments);
            this._createWidget();
        },

        _createWidget: function () {
            var labelNode = domConstruct.create('div', {
                innerHTML: this.label
            }, this.domNode);

            this._widget = new ValidationTextBox({
                trim: true,
                required: true,
                maxLength: '99',
                promptMessage: '',
                invalidMessage: '',
                missingMessage: ''
            }, this.domNode);
        },

        validate: function () {
            return this._widget.validate();
        }
    });

});