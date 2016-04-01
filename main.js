jQuery(document).ready(function ($) {
    var counter = 1;
    getScore(counter);
    //runs every 30s
    setInterval(function () {
        counter++;
        getScore(counter);
    }, 30000);
    
    
    
	//gets score from http://data.ncaa.com/jsonp/scoreboard/basketball-men/d1/YYYY/MM/DD/scoreboard.html
	function getScore() {
		//sets date to EST time
		//var date = moment().tz("America/New_York").format("YYYY/MM/DD")
		var date = "2016/03/31",
		    url = "http://data.ncaa.com/jsonp/scoreboard/basketball-men/d1/" + date + "/scoreboard.html",
            script;
		
        //creates script element for JSONP
        script = document.createElement('script');
        script.id = 'tab-update';
        script.type = 'text/javascript';
        script.src = url; //?callback=callbackWrapper"
        
        //remove already existing tab-update script if it exists
        if ($("#tab-update").length > 0) {
            $("#tab-update").remove();
        }
        $("body").append(script);
        
        if ($("#counter").length > 0) {
            $("#counter").remove();
        }
        $("body").append("<p id=\"counter\">" + counter + "</p>");
	}
    
    
});

//function gets called when JSONP request is fulfilled
function callbackWrapper(data) {
    var gamesList = data.scoreboard[0].games;
    //alert(gamesList[0].home.nameRaw + " vs. " + gamesList[0].away.nameRaw);
    var gameString;
    var currentGame,
        gameState,
        gameID,
        tvNetwork,
        liveURL,
        homeTeam, homeSeed, homeScore, homeLogo,
        awayTeam, awaySeed, awayScore, awayLogo;
    
    for(var i = 0; i < gamesList.length; i++) {
        currentGame = gamesList[i];
        
        //general game info
        gameID = currentGame.id;
        tvNetwork = currentGame.network;
        liveURL = currentGame.champInfo.watchLiveUrl;
        gameState = currentGame.gameState;
        
        //home team info
        homeTeam = currentGame.home.nameRaw;
        homeSeed = currentGame.home.teamSeed;
        homeScore = currentGame.home.currentScore;
        homeLogo = currentGame.home.iconURL;
        
        //away team info
        awayTeam = currentGame.away.nameRaw;
        awaySeed = currentGame.away.teamSeed;
        awayScore = currentGame.away.currentScore;
        awayLogo = currentGame.away.iconURL;
        
        
        gameString = "(" + homeSeed + ")" + " " + homeTeam + " vs. " + 
                     "(" + awaySeed + ")" + " " + awayTeam + ", " +
                     homeScore + " - " + awayScore + "  " + gameState;
        
        if ($("#test-score").length > 0) {
            $("#test-score").remove();
        }
        $("body").append("<p id=\"test-score\">" + gameString + "</p>");
    }
}