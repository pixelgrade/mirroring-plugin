var gn = new GyroNorm();

var cache = {
	y: null
};

var args = {
	frequency:150,					// ( How often the object sends the values - milliseconds )
	gravityNormalized:true,			// ( If the gravity related values to be normalized )
	orientationBase:GyroNorm.WORLD,		// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
	decimalCount:1,					// ( How many digits after the decimal point will there be in the return values )
	logger:null,					// ( Function to be called to log messages from gyronorm.js )
	screenAdjusted:false			// ( If set to true it will return screen adjusted values. )
};

gn.init(args).then(function(){
	gn.start(function(data){
		// console.log( data.dm.x );

		if ( cache.z !== data.dm.z ) {
			console.log( data.dm );
			cache = data.dm;
		}

		// Process:
		// data.do.alpha	( deviceorientation event alpha value )
		// data.do.beta		( deviceorientation event beta value )
		// data.do.gamma	( deviceorientation event gamma value )
		// data.do.absolute	( deviceorientation event absolute value )

		// data.dm.x		( devicemotion event acceleration x value )
		// data.dm.y		( devicemotion event acceleration y value )
		// data.dm.z		( devicemotion event acceleration z value )

		// data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
		// data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
		// data.dm.gz		( devicemotion event accelerationIncludingGravity z value )

		// data.dm.alpha	( devicemotion event rotationRate alpha value )
		// data.dm.beta		( devicemotion event rotationRate beta value )
		// data.dm.gamma	( devicemotion event rotationRate gamma value )
	});
}).catch(function(e){
	// Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
});