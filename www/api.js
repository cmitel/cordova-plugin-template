var exec = require("cordova/exec"),
    constants = require("./SvnConstants"),
    debug = true;

module.exports = {
    // methodes API goes here....
	// hello: hello
};

// function hello (params1, params2, success, error) {
	// 'hello' is method API on native side
	// apiCall('hello', [params1, params2], success, error);
// }

/////////////////////////////

function commonApiFn(apiFn) {
    return function (success, error) {
        apiCall(apiFn, [], success, error);
    };
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

/**
 * Convenient wrapper for calling API methods
 * @param String apiFn API method to call
 * @param Array params API method parameters list
 * @param Function success Callback success function
 * @param Function erorr Callback error function
 */
function apiCall(apiFn, params, success, error) {

    success = defaultNoopFn(success);
    error = defaultNoopFn(error);

    exec(
        function (res) {
            resultLogger('log', apiFn, res);
            success(res);
        },
        function (err) {
            resultLogger('error', apiFn, err);
            error(err);
        },
        constants.API_NAME,
        apiFn,
        params
    );
}