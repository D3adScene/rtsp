import angular from 'angular';

import utils from '../../assets/js/utils'

const UploadModule = angular.module('upload', []);

UploadModule.controller('UploadController', ($scope) => {
  $scope.rtspUrl        = ''
  $scope.responseStatus = ''
  $scope.isDisabled     = false
  
  $scope.submitUploadUrl = () => {
    $scope.isDisabled = true
    let data = {
      rtspUrl: $scope.rtspUrl,
      username: utils.localStorage.get('username')
    }

    utils.ajax('upload', data) 
    .then((response) => {
      $scope.isDisabled = false
      $scope.responseStatus = response.reason
      $scope.$apply()
    })
    .catch(function (error) {
      $scope.isDisabled = false
      console.log(error)
    })
  }
})

export default UploadModule