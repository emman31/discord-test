const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');
const Help = require('./server/Help.js');

console.log("Starting bot...\n");

// Loading secrets.
var secretsString = fs.readFileSync("secrets.json");
var secrets = JSON.parse(secretsString);
console.log("Finished loading secrets. shhh...");





var doc = new GoogleSpreadsheet(secrets.google_spreadsheet_id);
var spreadsheet;
var help;
doc.getInfo(function(err, info) {
    if (err) {
        console.log(err);
    }
    
    console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
    spreadsheet = info.worksheets[0];
    console.log('sheet 1: '+spreadsheet.title+' '+spreadsheet.rowCount+'x'+spreadsheet.colCount);
    help = new Help(spreadsheet);
});




client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
    var commandPrefix = "!pogo help";

    if (message.content.startsWith(commandPrefix)) {
        var command = message.content.substring(commandPrefix.length + 1);

        console.log(commandPrefix.length);

        var helpText = help.GetString(command);
        message.channel.send(helpText);
        
    }
});

client.login(secrets.discord_bot_token);