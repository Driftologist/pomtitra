app.controller( 'TimerCtrl', function( $scope, $interval ) {
    
    $scope.format = 'mm:ss';
    $scope.time = 25*60;
    $scope.minutesLeft = 25;
    $scope.secondsLeft = 0;
    
    var stop;
    
    $scope.countDown = function() {
        // Dont start a new timer if one is already running
        if ( angular.isDefined(stop) ) return;
        
        stop = $interval( function() {
            if ( $scope.time > 0 ) {
                $scope.time = $scope.time - 1;
                $scope.minutesLeft = Math.floor($scope.time/60);
                $scope.secondsLeft = $scope.secondsLeft - 1;
                if ($scope.secondsLeft === 60) $scope.secondsLeft = 0;
                if ($scope.secondsLeft === -1) $scope.secondsLeft = 59;
            } else {
                $scope.stopTimer();
            }
        }, 1000);
    };
    
    $scope.stopTimer = function() {
        if ( angular.isDefined(stop) ) {
            $interval.cancel( stop );
            stop = undefined;
        }
    };
    
    $scope.$on( '$destroy', function() {
        $scope.stopTimer();
    } );
})

