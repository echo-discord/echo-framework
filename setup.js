var fs = require("fs");
function setUpFiles() {
    if(fs.existsSync(__dirname+"modules")) {
        fs.mkdirSync("modules");
    }
}
console.log(__dirname);