// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { tests } = require('@iobroker/testing');

// Run integration tests - See https://github.com/ioBroker/testing for a detailed explanation and further options
tests.integration(path.join(__dirname, '..'), {
    // If the adapter may call process.exit during startup, define here which exit codes are allowed.
    // By default, termination during startup is not allowed.
    allowedExitCodes: [11],

    // Define your own tests inside defineAdditionalTests
    defineAdditionalTests({ suite }) {
        // All tests (it, describe) must be grouped in one or more suites. Each suite sets up a fresh environment for the adapter tests.
        // At the beginning of each suite, the databases will be reset and the adapter will be started.
        // The adapter will run until the end of each suite.

        // Since the tests are heavily instrumented, each suite gives access to a so-called "harness" to control the tests.
        suite('Test shutters()', (getHarness) => {
            // For convenience, get the current suite's harness before all tests
            let harness;
            before(() => {
                harness = getHarness();
            });

            //======================================================================
            it('Should work', async () => {
                //prepare objects:
                const shutterObject = {
                    _id: 'adapter.0.shutter.level',
                    type: 'state',
                    common: {
                        role: 'level.blind',
                        type: 'number',
                        name: 'Cool Shutter',
                        min: 0,
                        max: 100,
                        read: true,
                        write: true
                    },
                    native: {}
                };
                await harness.getObjects().setObjectAsync(shutterObject._id, shutterObject);

                // Start the adapter and wait until it has started
                await harness.startAdapterAndWait();

                await harness.setStateAsync(shutterObject._id, 100, true);
            });


            //======================================================================
        });
    }
});