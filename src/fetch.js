import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
var AppSettings = require('./settings.json'); 

export function execute_fetch(query, page) {
	
	
	var accessToken = AppSettings.fetch.token;
	var url1 = AppSettings.fetch.url1;
	var url2 = AppSettings.fetch.url2;
	if (query == ""){
	// query = "if empty use this default search criteria.. "
	  }

	var searchURL = url1+query+url2;


	return fetch(searchURL)
		.then(response => response.json())
		.then(responseData => {
			console.log(responseData);

			TimeAgo.locale(en);
			const timeAgo = new TimeAgo("en-US");

			var len = responseData.results.length;
				
			var	newData = { resultCount: responseData.resultCount, items: [] };
			var	i;
			

			//Loop through the source JSON and format it into the standard format
			for (i = 0; i < len; i += 1) {
			try{

			
				newData.items.push({
					key: responseData.results[i].artistId,
					rawItem: responseData.results[i],
					title: responseData.results[i].trackName,
					description: responseData.results[i].artistViewUrl,
					target: "_blank",
					open_url: responseData.results[i].trackViewUrl,
					iconName: "music",
					iconColor: "blue",
					mediaType: "video",
					author: responseData.results[i].author,
					source: responseData.results[i].source,
					thumbnail: responseData.results[i].artworkUrl30,					
					highres: responseData.results[i].previewUrl,
					dragAndDropString:
						"<mos><mosID>itunes</mosID>" +
						"<objID>" +
						responseData.results[i].previewUrl +
						"</objID>" +
						"<objSlug>" +
						responseData.results[i].title +
						"</objSlug>" +
						"<mosAbstract>" +
						responseData.results[i].description +
						"</mosAbstract></mos>",
						meta:
							responseData.results[i].artistName +
							"&nbsp;&middot;&nbsp" +
							"Track price :" + responseData.results[i].trackPrice + "$" +
							"&nbsp;&middot;&nbsp" +
							timeAgo.format(new Date(responseData.results[i].releaseDate))

				});
			}
			catch(e)
			{
				console.log("Error occoured fetching a value from JSON:" + e)
			}
			
		
			}
			
			return newData;
		})
		.catch(error => console.warn(error));
}
