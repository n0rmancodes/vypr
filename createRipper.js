var { Input } = require("enquirer");
var fs = require("fs");

if (!fs.existsSync("./rippers/custom")) {fs.mkdirSync("./rippers/custom")}

var a = new Input({
    message: "Create a title.",
})
a.run().then(function(a) {
    var a = a.toString();
    var fileName = "./rippers/custom/" + a.toLowerCase().split(" ")[0] + ".json";
    if (fs.existsSync(fileName)) {fs.unlinkSync(fileName)}
    var b = new Input({
        message: "Where are the photos?",
        hint: "Do not include the drive name, but include the first slash."
    })
    b.run().then(function(b) {
        var b = b.toString();
        var j = {
            name: a,
            folder: b
        }
        var j = JSON.stringify(j);
        fs.writeFileSync(fileName, j);
    })
})