
//var COMMIT_SHA = '6922b00c842193f85780dda8ad3b8e117a3292e1';
//var REPO_NAME = 'bkauf/gcpdemo';
const args = process.argv.slice(1)
const https = require('https');

var options = {
  host: 'api.github.com',
  port: 443,
  path: '/repos/'+args[1]+'/commits/'+args[2],
  headers: { 'User-Agent': 'node' },
  method: 'GET'
};


https.get(options, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    var gitDataObj = JSON.parse(data);
    if (typeof gitDataObj.commit === 'undefined'){
         console.log("could not find git details: "+options.host+options.path);
        
    }else{
        console.log("Commit Author: "+gitDataObj.commit.author.name);
        console.log("Commit Date: "+gitDataObj.commit.author.date);

        // Calculate difference between current and gitcommit times
        dt1 = new Date(gitDataObj.commit.committer.date).getTime();
        dt2 = Date.now();
        console.log("Commit: " +args[2]+" || LeadTime: "+diff_hours(dt1, dt2));

    }

  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

function diff_hours(dt1, dt2) 
 {

  var diff =(dt2 - dt1);
  var minutesRaw = diff/60000;
  // var minutes = Math.floor(diff / 60000);
  // var seconds = ((diff % 60000) / 1000).toFixed(0);
  //return minutes + ":" + seconds;
  return minutesRaw.toFixed(2); //minutes with 2 decimals
 }