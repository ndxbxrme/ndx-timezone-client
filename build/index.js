(function() {
  'use strict';
  var e, error, module;

  module = null;

  try {
    module = angular.module('ndx');
  } catch (error) {
    e = error;
    module = angular.module('ndx', []);
  }

  module.run(function($rootScope, $http, Auth) {
    var reported;
    reported = false;
    return $rootScope.$on('$stateChangeSuccess', function() {
      var d, i, lastOffset, timezone;
      if (Auth.getUser()) {
        timezone = [];
        if (!reported) {
          i = 0;
          d = new Date(new Date().toDateString());
          lastOffset = d.getTimezoneOffset();
          while (i++ < 365 * 5 * 24) {
            if (d.getTimezoneOffset() !== lastOffset) {
              timezone.push({
                date: d.valueOf(),
                offset: lastOffset
              });
              lastOffset = d.getTimezoneOffset();
            }
            d.setHours(d.getHours() + 1);
          }
          return $http.post('/api/timezone', {
            timezone: timezone
          }).then(function(response) {
            if (response.data === 'OK') {
              return reported = true;
            }
          }, function(err) {
            return false;
          });
        }
      }
    });
  });

}).call(this);

//# sourceMappingURL=index.js.map
