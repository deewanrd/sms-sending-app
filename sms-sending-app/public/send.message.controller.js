angular.module('smsApp')
  .controller('SendMessageCtrl', function ($scope, $stateParams, $http) {

    function randomNumberGenerator() {
      let otp = Math.floor(100000 + Math.random() * 900000);
      return otp;
    }

    $scope.message = "Hi. Your OTP is: " + randomNumberGenerator();

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

    $scope.send = function () {
      let phone = $scope.contact.phone;
      let recipientName = $scope.contact.firstName + " " + $scope.contact.lastName;
      let params = {
        'phone': phone,
        'message': $scope.message,
        'recipientName': recipientName
      };
      $scope.loading = true;
      $http.post(document.location.protocol + '//' + document.location.host + '/sendMessage', params)
        .then((result) => {
          alert('Message sent');
          $scope.loading = false;
          window.location.href = "#";
        }).catch((error) => {
          alert(error.data);
          $scope.loading = false;
          window.location.href = "#";
        })
    };

    function init() {
      $scope.contactId = $stateParams.id;
      $scope.fetchContactInfo();
    }

    init();
  });