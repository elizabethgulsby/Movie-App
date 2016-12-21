/*Version 1: 

1) Now Playing results show on load.  If another display is desired for the landing page in future versions, the data from that respective AJAX call will need to be provided in place of Now Playing data.  
*/

$(document).ready(function() {
	//need an input - all of the following code (except Now Playing) depends upon user input
	$('#input').submit(function (){
		event.preventDefault();
	});

//VARIABLES FOR USE IN URLS, FUNCTIONS
	//
		// var movieID = 

//BASE URLS

	// base url for all api calls
		var apiBaseUrl = 'http://api.themoviedb.org/3';

	//base URL for image
		var imageBaseUrl = 'http://image.tmdb.org/t/p/';

	//base URL for genre
		var genreBaseUrl = apiBaseUrl + '/genre/movie/list?api_key=' + apiKey;

	//base URL for people (takes firstname/lastname inputs - need regex for partial inputs?)
		var peopleBaseUrl = 'http://api.tmdb.org/3/search/person?api_key=' + apiKey + '&query=';
	// console.log(peopleBaseUrl);

	//base URL for titles (need regex for partial titles?)
		var titleBaseUrl = ''

	//Now-playing URL
		const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey;


	//AJAX call for Now Playing (shows on load)
		// function getNowPlaying() - construct this?
		$.getJSON(nowPlayingUrl, function(nowPlayingData) {
			console.log(nowPlayingData);

			// looping through results, building HTML with JS
			var nowPlayingHTML = '';
			for (let i = 0; i < nowPlayingData.results.length; i++) {
				var poster = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path; //have to add base_url +  width desired + poster_path to get poster images
				console.log(poster);
				nowPlayingHTML += '<div class="col-sm-3">';
					nowPlayingHTML += '<img src="' + poster + '">';
					nowPlayingHTML += '<div></div>';
				nowPlayingHTML += '</div>';
			}
			//populates #movie-grid with HTML constructed above
			$('#movie-grid').html(nowPlayingHTML);
		})

	//genre array - to loop through for assignment to film results
		var genres = [
		    {
		      "id": 10759,
		      "name": "Action & Adventure"
		    },
		    {
		      "id": 16,
		      "name": "Animation"
		    },
		    {
		      "id": 35,
		      "name": "Comedy"
		    },
		    {
		      "id": 80,
		      "name": "Crime"
		    },
		    {
		      "id": 99,
		      "name": "Documentary"
		    },
		    {
		      "id": 18,
		      "name": "Drama"
		    },
		    {
		      "id": 10751,
		      "name": "Family"
		    },
		    {
		      "id": 10762,
		      "name": "Kids"
		    },
		    {
		      "id": 9648,
		      "name": "Mystery"
		    },
		    {
		      "id": 10763,
		      "name": "News"
		    },
		    {
		      "id": 10764,
		      "name": "Reality"
		    },
		    {
		      "id": 10765,
		      "name": "Sci-Fi & Fantasy"
		    },
		    {
		      "id": 10766,
		      "name": "Soap"
		    },
		    {
		      "id": 10767,
		      "name": "Talk"
		    },
		    {
		      "id": 10768,
		      "name": "War & Politics"
		    },
		    {
		      "id": 37,
		      "name": "Western"
		    }
		];



	//AJAX call for genres
		function getGenre(genreID) {
			var genreIDUrl = 'http://api.themoviedb.org/3/genre/' + genreID + 'movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';
			 	$.getJSON(genreIDUrl, function(genreData) {

			 	})
	 	}

	// })

});