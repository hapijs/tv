'use strict';
// Load modules

const Backbone = require('backbone');
const _ = require('lodash');
const Sinon = require('sinon');

const AppView = require('../../../source/js/views/app');
const Request = require('../../../source/js/models/request');
const ToolbarView = require('../../../source/js/views/toolbar');
const FeedHeaderView = require('../../../source/js/views/feedHeader');
const FeedBodyView = require('../../../source/js/views/feedBody');
const SettingsView = require('../../../source/js/views/settings');


// Declare internals

const internals = {};


describe('AppView', function () {

    describe('#render', function () {

        beforeEach(function () {

            const fakeModel = new Backbone.Model();
            const fakeCollection = new Backbone.Collection();

            const mockWebSocketManager = {
                pause: function (){},
                resume: function (){}
            };

            this.appView = new AppView({
                model: fakeModel,
                collection: fakeCollection,
                webSocketManager: mockWebSocketManager
            });
        });

        it('renders the toolbar', function () {

            expect(this.appView.render().$('.toolbar').html()).to.not.be.empty;
        });

        it('renders the settings modal (hidden)', function () {

            expect(this.appView.render().$('.settings-modal-container').html()).to.not.be.empty;
        });

        it('renders the feed header', function () {

            expect(this.appView.render().$('.feed .header').html()).to.not.be.empty;
        });

        it('renders the feed body', function () {

            this.appView.render().collection.add(new Request());
            expect(this.appView.$('.feed .body').html()).to.not.be.empty;
        });

        describe('when visiting the app for the first time', function () {

            it('defaults the channel to "all"');

            it('defaults the client id to a random generated value');

            it('shows the settings view');

        });

        describe('when the toolbar triggers', function () {

            describe('"search criteria changed"', function () {

                it('filters the body\'s requests by the search criteria');

            });

            describe('"show settings"', function () {

                it('shows the settings view');

            });

            describe('clear feed', function () {

                it('"clears the feed body"');

            });

        });

        describe('when the feed header triggers', function () {

            describe('"toggle favorites"', function () {

                it('toggles favorites on the feed body');

            });

            describe('"collapse all"', function () {

                it('collapses all the requests in the feed body');

            });

        });

        describe('when the feed body triggers', function () {

            describe('"request expand toogle"', function () {

                context('with a request collapse and no other requests expanded', function () {

                    it('disables the feed header\'s collapse all action');

                });

                context('with a request expanded', function () {

                    it('enables the feed header\'s collapse all action');

                });

            });

            describe('"request favorite toogle"', function () {

                context('with a request unfavorited and no other requests favorited', function () {

                    it('disables the feed header\'s favorites filter action');

                });

                context('with a request favorited', function () {

                    it('enables the feed header\'s favorites filter action');

                });

            });

        });

    });

});
