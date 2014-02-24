define([
    'dojo/_base/declare',
    'dojo/date',
    'dijit/form/ValidationTextBox',
    'dijit/form/Form',
    'dijit/form/DateTextBox',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!../../templates/event/basic_fields.html'
], function (declare, dateUtil, ValidationTextBox, Form, DateTextBox, _WidgetBase, _TemplatedMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin], {

        templateString: template,

        form: null,

        _name: null,

        _date: null,

        postCreate: function () {
            this.inherited(arguments);
            this._form = new Form({}, this.formNode);
            this._createWidgets();
        },

        _createWidgets: function () {
            this._name = new ValidationTextBox({
                trim: true,
                required: true,
                maxLength: '99',
                promptMessage: '',
                invalidMessage: '',
                missingMessage: ''
            }, this.nameNode);

            this._date = new DateTextBox({}, this.dateNode);
            var today = new Date();
            this._date.constraints.min = dateUtil.add(today, 'day', 1);
            this._date.constraints.max = dateUtil.add(today, 'day', 100);
        },

        validate: function () {
            return this._form.validate();
        },

        _getSerializableAttr: function () {
            return {
                'event_name': this._name.get('value'),
                'date': this._date.get('value').getTime()
            }
        }
    });

});