import 'bootstrap-css-only'
import 'normalize.css'
import angular from 'angular'

import appComponent from './app.component'
import LoginController from './controller/Login'
import UploadController from './controller/Upload'
import rtspUrlsController from './controller/rtspUrls'

import router from 'angular-ui-router'
import routes from './routes'

const myApp = angular.module('app', [
  router,
  LoginController.name,
  UploadController.name,
  rtspUrlsController.name
]).component('app', appComponent)

myApp.controller('login')

myApp.config(function($stateProvider) {
  $stateProvider.state(routes.login)
  $stateProvider.state(routes.upload)
  $stateProvider.state(routes.rtsp)
})