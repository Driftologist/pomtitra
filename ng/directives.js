app.directive('myCurrentTime', function( $interval, dateFilter ) {
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