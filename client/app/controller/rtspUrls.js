import angular from 'angular'

import utils from '../../assets/js/utils'

const rtspUrlsController = angular.module('rtsp', [])

rtspUrlsController.controller('RtspUrlsController', ($scope, $sce) => {
  $scope.responseStatus   = ''
  $scope.rtspUrls         = []
  $scope.showVideo        = false
  $scope.videoUrl         = ''
  $scope.pickVideo        = (value) => {
    //https://stackoverflow.com/questions/21292114/external-resource-not-being-loaded-by-angularjs
    $scope.videoObject = {url: $sce.trustAsResourceUrl(value)}
    $scope.showVideo  = true
  }
  /* fix problem calling ajax many times before loaded page.
     https://stackoverflow.com/questions/18646756/how-to-run-function-in-angular-controller-on-document-ready */
  angular.element(document).ready(function () {
    let data = {
      username: utils.localStorage.get('username')
    }
    utils.ajax('getRtspUrlByUsername', data)  
    .then((response) => {
      $scope.responseStatus = response.reason
      $scope.rtspUrls = response.data
      $scope.$apply()
    })
    .catch(function (error) {
      console.log(error)
    })
  })
})

export default rtspUrlsController