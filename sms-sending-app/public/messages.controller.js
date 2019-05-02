angular.module('smsApp')
  .controller('MessagesCtrl', function ($scope, $http, NgTableParams) {

    $scope.messages = [];

    $scope.fetchMessages = function () {
      $http.get(document.location.protocol + '//' + document.location.host + '/fetchMessages')
        .then((response) => {
          let messages = response.data;
          messages.forEach(function (message) {
            $scope.messages.push(message);
          })
          $scope.tableData = new NgTableParams({ sorting: { sent_at: "desc" } }, { dataset: $scope.messages });
        }).catch((error) => {
          alert(error.data);
        })
    }

    function init() {
      $scope.fetchMessages();
    }
    init();
  })