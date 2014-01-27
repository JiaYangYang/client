require(['dojo/date/locale',
    'dojo/dom-construct',
    'dijit/Dialog',
    'dijit/form/Form',
    'dijit/form/ValidationTextBox',
    'dijit/form/Button',
    'dojo/store/JsonRest',
    'app/module/Grid',
    'dojo/domReady!'],
    function (locale, domConstruct, Dialog, Form, ValidationTextBox, Button, JsonRest, Grid) {

        var path = '/event_type/';
        var store = new JsonRest({
            target: this.REST_PATH + path
        });
        var grid;

        startup();

        function startup() {
            createGrid();
            createWidget();
        }

        function createGrid() {
            grid && grid.destroyRecursive();
            var gridNode = domConstruct.create('div', null, 'gridNode');
            grid = new Grid({
                store: store,
                caption: 'Event Types',
                header: {
                    layout: [
                        {label: 'Event Type'},
                        {label: 'Created'},
                        {label: 'Disabled'},
                        {label: 'Action'}
                    ]
                },
                body: {
                    layout: [
                        {field: 'name'},
                        {field: 'created', formatter: function (cell, item) {
                            cell.innerHTML = locale.format(new Date(item.created), {
                                selector: "date",
                                datePattern: "yyyy-MM-dd"
                            });
                        }},
                        {field: 'disabled', formatter: function (cell, item) {
                            if (item.disabled) {
                                cell.innerHTML = locale.format(new Date(item.disabled), {
                                    selector: "date",
                                    datePattern: "yyyy-MM-dd"
                                });
                            }
                        }},
                        {formatter: function (cell, item) {
                            if (!item.disabled) {
                                createDisableButton(cell, item.id);
                            }
                        }}
                    ]
                }
            }, gridNode);
        }

        function createWidget() {
            var form = new Form();
            form.placeAt('formNode');
            var text = new ValidationTextBox({
                required: true,
                trim: true,
                placeHolder: 'Event Name'
            });
            form.domNode.appendChild(text.domNode);

            var button = new Button({
                label: 'Create',
                onClick: function () {
                    if (!form.validate()) {
                        return;
                    }
                    createEvent(text.get('value'));
                    form.reset();
                }
            });
            form.domNode.appendChild(button.domNode);
        }

        function createDisableButton(node, id) {
            var button = new Button({
                label: 'Disable',
                onClick: function () {
                    store.remove(id).then(function () {
                        createGrid();
                    });
                }
            }, node);
        }

        function createEvent(name) {
            store.add({
                name: name
            }).then(function (response) {
                    createGrid();
                }, function (err) {
                    new Dialog({
                        title: 'Error',
                        content: 'Cannot create the event type.',
                        onBlur: function () {
                            this.hide();
                        }
                    }).show();
                });
        }
    });
