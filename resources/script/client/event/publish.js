require([
    'dojo/dom',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/request',
    'dojo/json',
    'dojo/_base/array',
    'dijit/form/Select',
    'dijit/form/CheckBox',
    'dijit/form/Button',
    'dojo/domReady!'],
    function (dom, on, domConstruct, request, JSON, array, Select, CheckBox, Button) {

        var eventType;
        var currWidget;
        var events = {};
        var fields = {};

        loadEventTypes();

        function loadEventTypes() {
            request(BASE_PATH + '/resources/script/client/event/widgets/descriptor.json', {
                handleAs: 'json'
            }).then(function (data) {
                    var options = [];
                    array.forEach(data, function (item) {
                        !item.disabled && options.push({
                            label: item.type, value: item.id
                        });
                        events[item.id] = item;
                    });
                    loadFields();
                    createEventTypes(options);
                });
        }

        function loadFields() {
            request(BASE_PATH + '/resources/script/client/event/fields/descriptor.json', {
                handleAs: 'json'
            }).then(function (data) {
                    createFieldPane(data);
                    createButtonPane();
                });
        }

        function createEventTypes(options) {
            var node = dom.byId('selector');
            eventType = new Select({
                required: true,
                options: options,
                onChange: function (val) {
                    currWidget && currWidget.destroyRecursive();
                    currWidget = null;
                    loadTemplate(val);
                }
            }, node);
            loadTemplate(eventType.get('value'));
        }

        function createFieldPane(data) {
            array.forEach(data, function (item) {
                if (!item.disabled) {
                    var pane = domConstruct.create('div', null, 'fieldPane');
                    var widgetNode = domConstruct.create('span', null, pane);
                    new CheckBox({
                        value: item.id,
                        onChange: function (checked) {
                            fields[item.id] = checked;
                        }
                    }).placeAt(widgetNode);
                    var labelNode = domConstruct.create('span', {
                        innerHTML: item.name
                    }, pane);
                }
            });

        }

        function loadTemplate(moduleId) {
            var item = events[moduleId];
            var module = item.path + '/' + item.module + '/widget_1';
            require(['client/event/widgets/' + module], function (Widget) {
                var node = domConstruct.create('div', null, 'widgetPane');
                currWidget = new Widget({}, node);
            });
        }

        function createButtonPane() {
            var button = new Button({
                label: 'Submit',
                onClick: function () {
                    if (currWidget && currWidget.validate()) {
                        sendPost();
                    }
                }
            }, 'submitButton');
        }

        function sendPost() {
            var fieldArr = [];

            for (var id in fields) {
                if (fields[id]) {
                    fieldArr.push(id);
                }
            }

            var data = {
                event_type: eventType.get('value'),
                widget: currWidget.get('serializable'),
                fields: fieldArr
            };

            var jsonString = JSON.stringify(data);

            request.post(REST_PATH + '/event_instance', {
                data: {
                    data: jsonString
                },
                handleAs: 'json'
            }).then(function (data) {

                });
        }

    });