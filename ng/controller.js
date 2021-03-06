app.controller( 'TimerCtrl', function( $scope, $interval ) {
    
    $scope.format = 'mm:ss';
    $scope.time = 25*60;
    $scope.minutesLeft = 25;
    $scope.secondsLeft = 0;
    $scope.pomsCompleted = 0;
    
    var stop;
    
    $scope.startTimer = function() {
        // Dont start a new timer if one is already running
        if ( angular.isDefined(stop) ) return;
            $('body').css(
                'background-image', 'url("assets/img/broken-plane.jpg")');
        
        stop = $interval( function() {
            if ( $scope.time > 0 ) {
                $scope.time = $scope.time - 1;
                $scope.minutesLeft = Math.floor($scope.time/60);
                $scope.secondsLeft = $scope.secondsLeft - 1;
                if ($scope.secondsLeft === 60) $scope.secondsLeft = 0;
                if ($scope.secondsLeft === -1) $scope.secondsLeft = 59;
                
                
                $scope.animateHands();
                
            } else {
                $scope.resetTimer();
            }
        }, 1000);
    };
    
    $scope.stopTimer = function() {
        if ( angular.isDefined( stop ) ) {
            $interval.cancel( stop );
            stop = undefined;
        }
    };
    
    $scope.finishTimer = function() {
        if ( angular.isDefined( stop ) ) {
            $scope.resetTimer();
            $scope.pomsCompleted = $scope.pomsCompleted + 1;
        }
    };
    
    $scope.resetTimer = function() {
        if ( angular.isDefined( stop ) ) {
            $scope.stopTimer();
            $scope.time = 25*60;
            $scope.minutesLeft = 25;
            $scope.secondsLeft = 0;
            $('body').css(
                'background-image', 'url("assets/img/evening-water.jpg")');
            $scope.animateHands();
        }
    };
    
    $scope.$on( '$destroy', function() {
        $scope.stopTimer();
    } );
    
    $scope.animateHands = function() {
        $scope.secondsAngle = $scope.time*6;
        $scope.minutesAngle = $scope.minutesLeft*6;
        $('.second-hand').css(
            'transform', 'rotate(' + $scope.secondsAngle + 'deg)');
        $('.minute-hand').css(
            'transform', 'rotate(' + $scope.minutesAngle + 'deg)');
    };
    $scope.animateHands();
    
});

