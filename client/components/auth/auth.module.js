'use strict';

angular.module('ocpApp.auth', [
  'ocpApp.constants',
  'ocpApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
