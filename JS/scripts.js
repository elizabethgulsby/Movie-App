/*Version 1: 

1) Now Playing results show on load.  If another set of results are desired for the landing page, the data from that respective AJAX call will need to be provided in place of Now Playing data.  
*/

$(document).ready(function() {
	//need an input - all of the following code (except Now Playing) depends upon user input
	$('#input').submit(function (){
		event.preventDefault();
	});

//VARIABLES FOR USE IN URLS, FUNCTIONS
	//get value of input field
	var input = $('#input').val();

	//get movie by title (regex? partial title?)

	//get movie by actor (regex? partial name?)



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
		// var titleBaseUrl = '';

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
					// nowPlayingHTML += '<div></div>';
				nowPlayingHTML += '</div>';
			}
			//populates #movie-grid with HTML constructed above
			$('#movie-grid').html(nowPlayingHTML);
		})

	//genre array - to loop through for assignment to film results
		var genres = [
		    {
		      "id": 28,
		      "name": "Action"
		    },
		    {
		      "id": 12,
		      "name": "Adventure"
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
		      "id": 14,
		      "name": "Fantasy"
		    },
		    {
		      "id": 36,
		      "name": "History"
		    },
		    {
		      "id": 27,
		      "name": "Horror"
		    },
		    {
		      "id": 10402,
		      "name": "Music"
		    },
		    {
		      "id": 9648,
		      "name": "Mystery"
		    },
		    {
		      "id": 10749,
		      "name": "Romance"
		    },
		    {
		      "id": 878,
		      "name": "Science Fiction"
		    },
		    {
		      "id": 10770,
		      "name": "TV Movie"
		    },
		    {
		      "id": 53,
		      "name": "Thriller"
		    },
		    {
		      "id": 10752,
		      "name": "War"
		    },
		    {
		      "id": 37,
		      "name": "Western"
		    }
  		];

  	//click listeners - call getGenre() on each click to retrieve AJAX call for genre-specific data and change html of genre-description class to match corresponding genre
  	$('#28').click(function() {
  		getGenre(28);
  		$('.genre-description').html("Action");
  	});

  	$('#12').click(function() {
  		getGenre(12);
  		$('.genre-description').html("Adventure");
  	});	

  	$('#16').click(function() {
  		getGenre(16);
  		$('.genre-description').html("Animation");
  	});	

  	$('#35').click(function() {
  		getGenre(35);
  		$('.genre-description').html("Comedy");
  	});	

  	$('#80').click(function() {
  		getGenre(80);
  		$('.genre-description').html("Crime");
  	});	

  	$('#99').click(function() {
  		getGenre(99);
  		$('.genre-description').html("Documentary");
  	});	

  	$('#18').click(function() {
  		getGenre(18);
  		$('.genre-description').html("Drama");
  	});	

  	$('#10751').click(function() {
  		getGenre(10751);
  		$('.genre-description').html("Family");
  	});	

  	$('#14').click(function() {
  		getGenre(14);
  		$('.genre-description').html("Fantasy");
  	});	

  	$('#36').click(function() {
  		getGenre(36);
  		$('.genre-description').html("History");
  	});	

  	$('#27').click(function() {
  		getGenre(27);
  		$('.genre-description').html("Horror");
  	});	

  	$('#10402').click(function() {
  		getGenre(10402);
  		$('.genre-description').html("Music");
  	});

  	$('#9648').click(function() {
  		getGenre(9648);
  		$('.genre-description').html("Mystery");
  	});

  	$('#10749').click(function() {
  		getGenre(10749);
  		$('.genre-description').html("Romance");
  	});

  	$('#878').click(function() {
  		getGenre(878);
  		$('.genre-description').html("Science Fiction");
  	});

  	$('#10770').click(function() {
  		getGenre(10770);
  		$('.genre-description').html("TV Movie");
  	});

  	$('#53').click(function() {
  		getGenre(53);
  		$('.genre-description').html("Thriller");
  	});

  	$('#10752').click(function() {
  		getGenre(10752);
  		$('.genre-description').html("War");
  	});

  	$('#37').click(function() {
  		getGenre(37);
  		$('.genre-description').html("Western");
  	});

	//AJAX call for genres placed into a function; genre ID passed in from click listener
		function getGenre(genreID) {
			//constructing URL to get genre data
			var genreIDUrl = 'https://api.themoviedb.org/3/genre/' + genreID + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';
				var genreHTML = '';
			 	$.getJSON(genreIDUrl, function(genreData) {
			 		console.log(genreData);
			 		for (let i = 0; i < genreData.results.length; i++) {
			 			var genrePoster = imageBaseUrl + 'w300' + genreData.results[i].poster_path;
			 			genreHTML += '<div class="col-sm-3">';
			 				genreHTML += '<img src="' + genrePoster + '">';
			 			genreHTML += '</div>';
			 		}
			 		console.log(genreHTML);
			 		$('#movie-grid').html(genreHTML);
			 	});
	 	}

});
