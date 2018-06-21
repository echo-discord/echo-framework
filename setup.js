var fs = require("fs");
function setUpFiles() {
    const defaultConfig = {
        "repository": {
            "description": "This is the default repository for module downloads, config updates, etc.",
            "value": "https://github.com/echo-discord/"
        },
        "defaultModuleDownloads": {
            "description": "These are the default modules to be downloaded for the Discord version. Run on first setup.",
            "value": [
                "blu-discord",
                "blu-database",
                "blu-permissions",
                "blu-mapper",
                "blu-essentials"
            ]
        }
    }
    if(!fs.existsSync(__dirname+"/modules")) {
        fs.mkdirSync(__dirname+"/modules");
    }
    if(!fs.existsSync(__dirname+"/config.json")) {
        fs.writeFileSync(__dirname+"/config.json", defaultConfig);
    }
}