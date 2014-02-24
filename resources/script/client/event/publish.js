require([
    'dojo/dom',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/store/JsonRest',
    'dojo/request',
    'dojo/json',
    'dojo/_base/array',
    'dijit/form/Select',
    'dijit/form/CheckBox',
    'dijit/form/Button',
    'client/module/event/BasicFields',
    'dojo/domReady!'],
    function (dom, on, domConstruct, JsonRest, request, JSON, array, Select, CheckBox, Button, BasicFields) {

        var eventType;
        createEventTypes();
        createFields();
        createButtonPane();

        function createEventTypes() {
            var store = new JsonRest({
                idProperty: 'id',
                target: REST_PATH + '/event_type'
            });
            var node = dom.byId('selector');
            eventType = new Select({
                required: true,
                store: store,
                labelAttr: 'name'
            }, node);
            eventType.startup();
        }

        function createFields() {
            var fields = new BasicFields({

            }, 'widgetPane');
        }

        function createButtonPane() {
            new Button({
                label: 'Submit',
                onClick: function () {
                    if (eventType.get('value')) {
                        sendPost();
                    }
                }
            }, 'submitButton');
        }

        function sendPost() {

        }

    });