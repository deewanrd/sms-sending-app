angular.module('smsApp')
  .controller('ContactInfoCtrl', function ($scope, $stateParams, $http) {

    $scope.fetchContactInfo = function () {
      $http.get(document.location.protocol + '//' + document.location.host + '/fetchContactInfo', {
        'params': { 'id': $scope.contactId }
      })
        .then((response) => {
          $scope.contact = response.data;
        })
        .catch((error) => {
          alert(error.data);
        })
    };

    function init() {
      $scope.contactId = $stateParams.id;
      $scope.fetchContactInfo();
    }
    init();
  });