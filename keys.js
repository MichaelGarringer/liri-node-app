console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// axios.get("http://www.omdbapi.com/?t=s&y=&&apikey=trilogy").then