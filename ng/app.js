var app = angular.module('app', []);

app.controller( 'TimerCtrl', function( $scope, $interval ) {
    
    $scope.format = 'mm:ss';
    $scope.time = 25*60;
    $scope.minutesLeft = 25;
    $scope.secondsLeft = 10;
    
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

.directive('myCurrentTime', function( $interval, dateFilter ) {
    return function( scope, elem, attrs ) {
        var format,
            stopTime;
        
        //used to update the UI
        function updateTime() {
            elem.text( dateFilter( new Date(), format ) );
        }
        
        // watch the expression and update the UI on change
        scope.$watch( attrs.myCurrentTime, function( value ) {
            format = value;
            updateTime();
        });
        
        stopTime = $interval( updateTime, 1000 );
        
        // listen on DOM destroy ( removal ) event, and cancel the next UI update
        // to prevent updating time after DOM element is removed
        elem.on( '$destory', function() {
            $interval.cancel( stopTime );
        });
    };
})

.filter('numberFixedLen', function () {
    return function(a,b){
        return(1e4+a+"").slice(-b);
    };
});