const fs = require("fs");
if (!fs.existsSync("./config.json")) {
    console.log("please run `node configurate`.")
    return;
}
const config = JSON.parse(fs.readFileSync("./config.json"));
const { Select } = require("enquirer")

console.log("")
console.log("vypr - photo cd ripper");
console.log("============================");
var rippers = fs.readdirSync("./rippers");
var r = [];
for (var c in rippers) {
    r.push(rippers[c].split(".json")[0]);
}
if (!fs.existsSync(config.drive)) {
    console.log("ERR! please edit `config.json` to the correct drive!")
    return;
}
if (!fs.existsSync(config.folder)) {
    console.log("ERR! please add a " + config.folder + " folder!");
    return;
}
var p = new Select({
    name: "ripper",
    message: "Select a ripper.",
    choices: r
})
p.run().then(function (a) {
    var s = a.toString();
    console.log("- ripping...");
    var foldName = config.folder + s + "-" + new Date() * 1 + "/";
    fs.mkdirSync(foldName);
    var ripper = JSON.parse(fs.readFileSync("./rippers/" + s + ".json"));
    var fold = config.drive + ripper.folder;
    if (fs.existsSync(fold)) {
        var pics = fs.readdirSync(fold);
        for (var c in pics) {
            var d = fold + pics[c];
            var dest = foldName + pics[c];
            fs.copyFileSync(d, dest)
        }
        console.log("- ripped!");
        console.log("");
    } else {
        console.log("ERR! Invalid ripper.")
    }
}).catch(console.error)