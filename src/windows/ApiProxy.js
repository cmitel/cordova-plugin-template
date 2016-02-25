var proxy = require("cordova/exec/proxy"),
	// @todo require constant module
    constants = require("./[CONSTANT_MODULE_NAME_IN_PLUGIN.XML]"),
    debug = true;

// Create instance of Windows Runtime Component
var WinRT_component = null;

module.exports = {
    // methodes API goes here....
	// hello: hello
};

proxy.add(constants.API_NAME, module.exports);

// ------------- private functions ------------- //

/***
 * Gets/Creates the WinRT component singleton instance
 * @params {mixed} params
 * @returns {*}
 */
function getWinRTComponentInstance(params) {
    if (WinRT_component === null) {
        WinRT_component = new YourNamespaceComponent.NativeFeatureClass(...params...);
    }
    return WinRT_component;
}

/**
 * Returns default empty function if the parameter function is not set
 * @param Function fn Callback function
 * @return Function
 */
function defaultNoopFn(fn) {
    return fn || function () {};
}

/**
 * Convenient logger for api callbacks
 * @param String mode 'log' or 'error'
 * @param String fnName Api function to call
 * @param Mixed result API callback result
 */
function resultLogger(mode, fnName, result) {
    if (debug && (mode === "error" || mode === "log")) {
        console = console || {};
        console[mode] = defaultNoopFn(console[mode]);
        console[mode](constants.API_NAME + ' : ' + fnName);
        console[mode](result);
    }
}

// ------------- API functions ------------- //

// Example
/* function hello(success, error, args) {
     try {
		getWinRTComponentInstance().hello(args[0], args[1])
			.then(function (res) {
				// ....control result here ....
				success(res);
			},
			error
		);
	} catch (e) {
		resultLogger('hello', 'enable', e);
		error(e);
	}
} */