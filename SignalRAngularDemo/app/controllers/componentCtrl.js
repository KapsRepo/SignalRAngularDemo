
// the component service is "constructor injected" into the controller

function ComponentCtrl($scope, componentSvc, $rootScope) {
    $scope.components = new Array();

    $scope.sendComponent = function() {
        componentSvc.sendRequest();
    };

    var addComponent = function(data) {
        $scope.components.push(data);
    };

    componentSvc.initialize();

    $scope.$parent.$on("newComponent", function (e, data) {
        $scope.$apply(function () {
            addComponent(data);
        });
    });
}