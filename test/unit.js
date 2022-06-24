/// <reference types="iobroker" />
import path from 'path';
import {tests, utils} from '@iobroker/testing';

// Run unit tests - See https://github.com/ioBroker/testing for a detailed explanation and further options
tests.unit(path.join(__dirname, '..'));, {
    // Define your own tests inside defineAdditionalTests
    defineAdditionalTests() {
        // Create mocks and asserts
        const {adapter, database} = utils.unit.createMocks({name: 'autoshadow'});
        const {assertObjectExists} = utils.unit.createAsserts(
            database,
            adapter,
        );

        describe('test shutter scenarios', () => {
            // Create an object in the fake db we will use in this test

            //add shutter before each test.
            beforeEach(() => {
                database.publishObject(shutterObject);
            });

            afterEach(() => {
                // The mocks keep track of all method invocations - reset them after each single test
                adapter.resetMockHistory();
                // We want to start each test with a fresh database
                database.clear();
            });

            it('should close because of sun', () => {
                const dirOfShutter = 90;
                const heightLimit = 10;
                database.publishState(shutterObject._id, {val: 0, ack: true}); //open

                // Do something that should be tested
                if (adapter.stateChangeHandler !== undefined) {
                    console.log('Calling state change?');
                    adapter.stateChangeHandler(shutterObject._id, {val: 100, ack: true, ts: new Date().getTime(), lc: 0, from: 'me'});
                }

                // Assert that the object still exists
                assertObjectExists(shutterObject._id);
            });
        });
    }
});
