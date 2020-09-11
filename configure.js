const fs = require("fs");

console.log("vypr - photo cd ripper");
console.log("============================");
console.log("writing file...");
var j = JSON.stringify({
    folder: "./pictures/",
    drive: "E:/"
});
if (fs.existsSync("./config.json")) {fs.unlinkSync("./config.json");}
fs.writeFileSync("./config.json", j);
console.log("- written! please adjust the config file to your liking!");
console.log("")