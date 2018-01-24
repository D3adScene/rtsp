import angular from 'angular';

import utils from '../../assets/js/utils'

const LoginModule = angular.module('login', [])

LoginModule.controller('LoginController', ($scope) => {
  $scope.username       =   ''
  $scope.password       =   ''
  $scope.responseStatus =   ''
  $scope.isDisabled     = false

  $scope.submitLogin = () => {
    let user = {
      username: $scope.username,
      password: $scope.password
    }
    $scope.isDisabled = true
    utils.ajax('login', user)
    .then((response) => {
      $scope.isDisabled = false
      if (response.status === 'SUCCESS') {
        utils.localStorage.set('username', user.username)
        utils.redirect('upload')
      } else {
        $scope.isDisabled     = false
        $scope.responseStatus = response.reason
        $scope.$apply()
      }
    })
    .catch(function (error) {
      console.log(error)
    })

  }
})

export default LoginModule