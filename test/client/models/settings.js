'use strict';
// Load modules

const Backbone = require('backbone');
const Sinon = require('sinon');

const Settings = require('../../../source/js/models/settings');


// Declare internals

const internals = {};


describe('Settings', function () {

    beforeEach(function () {

        this.settingsStore = Settings.prototype._store = {
            _store: {},

            get: Sinon.spy(function (key) {

                return this._store[key];
            }),

            set: Sinon.spy(function (key, value) {

                this._store[key] = value;
                return value;
            })
        };

        this.options = {
            webSocketManager: {
                applyFilter: Sinon.spy()
            }
        };
    });

    describe('#defaults', function () {

        it('sets the expected defaults from settings', function () {

            const clientId = 'foobar';
            const channel = '*';

            this.settingsStore.set('clientId', clientId);
            this.settingsStore.set('channel', channel);

            expect(new Settings(null, this.options).attributes).to.eql({
                clientId: clientId,
                channel: channel
            });
        });

    });

    describe('#initialize', function () {

        it('applies the filter to the websocket when channel is changed', function () {

            const settings = new Settings(null, this.options);

            expect(this.options.webSocketManager.applyFilter).to.have.not.been.called;

            settings.set('channel', '*');

            expect(this.options.webSocketManager.applyFilter).to.have.been.called;
            expect(this.options.webSocketManager.applyFilter).to.have.been.calledWith('*');
        });

        it('updates the store when properties change with the properties that changed', function () {

            const settings = new Settings(null, this.options);

            settings.set('channel', '*');

            expect(this.settingsStore.set).to.have.been.calledWithExactly('channel', '*');

            settings.set('clientId', 'foobar');

            expect(this.settingsStore.set).to.have.been.calledWithExactly('clientId', 'foobar');
        });

    });

});
