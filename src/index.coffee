'use strict'
module = null
try
  module = angular.module 'ndx'
catch e
  module =angular.module 'ndx', []
module.run ($rootScope, $http, Auth) ->
  reported = false
  $rootScope.$on '$stateChangeSuccess', ->
    if Auth.getUser()
      timezone = []
      if not reported
        i = 0
        d = new Date(new Date().toDateString())
        lastOffset = d.getTimezoneOffset()
        while i++ < 365 * 5 * 24
          if d.getTimezoneOffset() isnt lastOffset
            timezone.push
              date: d.valueOf()
              offset: lastOffset
            lastOffset = d.getTimezoneOffset()
          d.setHours(d.getHours() + 1)
        $http.post '/api/timezone', timezone:timezone
        .then (response) ->
          if response.data is 'OK'
            reported = true
        , (err) ->
          false
  