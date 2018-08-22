
// The component service is a function responsible for bootstrapping the SignalR 
// components hub proxy. It exposes the sendRequest() function to invoke the sendComponent
// dynamic method on the hub.
//
// This service was written by Ravi Kiran and documented on his blog at
// http://sravi-kiran.blogspot.com/2013/09/ABetterWayOfUsingAspNetSignalRWithAngularJs.html

app.service('componentSvc', function ($, $rootScope) {
    var proxy = null;

    var initialize = function () {

        // fetch connection object and create proxy
        var connection = $.hubConnection();
        this.proxy = connection.createHubProxy('widgets');

        // start connection
        connection.start();

        this.proxy.on('newWidget', function (data) {
            $rootScope.$emit("newComponent", data);
        });
    };

    var sendRequest = function () {
        // invoke sendComponent method defined in hub
        this.proxy.invoke('sendComponent');
    };

    return {
        initialize: initialize,
        sendRequest: sendRequest
    };
});