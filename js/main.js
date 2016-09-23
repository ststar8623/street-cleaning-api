window.onload = function(){

	// google map options //
	var mapOptions = {
		center: new google.maps.LatLng(37.7759258,-122.4502152),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		navigationControl: false,
	    mapTypeControl: false,
	    scaleControl: false,
	    rotateControl: false,
	    fullscreenControl: false,
		styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
	}

	// displaying map //
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	function streetCleaning(){

		// input values //
		var search = document.getElementById('search').value.toUpperCase()
		var roadWay = document.getElementById('roadWay').value

		var streetSearch = "streetname=" + search + " " + roadWay

		$.ajax({
		    url: "https://data.sfgov.org/resource/u2ac-gv9v.json?" + streetSearch,
		    type: "GET",
		    data: {
		      "$limit" : 5000,
		      "$$app_token" : "Ew1HE0NbfrvgAXKG8HZiXHOWe"
		    },

		    success: function(data){

				var results = document.getElementById('results')

				// loop //
		    	$.each(data, function(i) {

		    		console.log(data[i])

		    		results.innerHTML += "<h4>" + data[i].lf_fadd + " - " + data[i].lf_toadd + " " + data[i].streetname + "</h4>"
		    		results.innerHTML += "<h4>" + data[i].blockside + "bound" + "</h4>"
		    		results.innerHTML += "<h5>" + data[i].weekday + " " + "From: " + data[i].fromhour + " to " + data[i].tohour + "</h5>"
		    		results.innerHTML += "<table class='table table-bordered'><thead><tr><th>Week :</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>Holidays</th></thead><tbody><tr><td></td><td>" + data[i].week1ofmon + "</td><td>" + data[i].week2ofmon + "</td><td>" + data[i].week3ofmon + "</td><td>" + data[i].week4ofmon + "</td><td>" + data[i].week5ofmon + "</td><td>" + data[i].holidays + "</tr></body></table>"

		    		// info window for markers //
		    		var info = "<h3>" + data[i].lf_fadd + " - " + data[i].lf_toadd + " " + data[i].streetname + "</h3>" + "<h4>" + data[i].blockside + "bound" + "</h4>" + "<h5>" + data[i].weekday + " " + "From: " + data[i].fromhour + " to " + data[i].tohour + "</h5>" + "<table class='table table-bordered'><thead><tr><th>Week:</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>Holidays</th></thead><tbody><tr><td></td><td>" + data[i].week1ofmon + "</td><td>" + data[i].week2ofmon + "</td><td>" + data[i].week3ofmon + "</td><td>" + data[i].week4ofmon + "</td><td>" + data[i].week5ofmon + "</td><td>" + data[i].holidays + "</tr></body></table>"

		    		var popUpWindow = new google.maps.InfoWindow({
		    			content: info
		    		});

		    		// initalize markers on google map //
					var marker = new google.maps.Marker({
					  	position: new google.maps.LatLng(data[i].geometry.coordinates[0][1], data[i].geometry.coordinates[0][0]),
					  	map: map,
					  	title: location.name,
					  	animation: google.maps.Animation.DROP
					});

					var marker2 = new google.maps.Marker({
						position: new google.maps.LatLng(data[i].geometry.coordinates[1][1], data[i].geometry.coordinates[1][0]),
						map: map,
						title: location.name,
						animation: google.maps.Animation.DROP
					})

					// added click function on marker //
					marker.addListener('click', function(){
						popUpWindow.open(map, marker);
					});

					marker2.addListener('click', function(){
						popUpWindow.open(map, marker);
					});

					// added animation on marker dropping down //
					function toggleBounce(){
						if (marker.getAnimation() !== null){
							marker.setAnimation(null);
						} else {
							marker.setAnimation(google.maps.Animation.BOUNCE);
						}
					}
	        	});
		    }
		})
	}

	document.getElementById('button').addEventListener('click', streetCleaning, false)
}

// animate results //
$(document).ready(function(){
	$('#button').click(function(){
		var search = document.getElementById('search').value
		if(search !== ""){
			$('#results').animate({left: '10px'}, 1000);
		}
	})
})




