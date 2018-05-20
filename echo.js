const EventEmitter = require("events").EventEmitter;
var fs = require("fs");
var moment = require("moment");
var path = require("path");
class BotClass extends EventEmitter {
    constructor() {
        super();
        this.directory = __dirname;
        this.commands = {};
        this.modules = {};
        this.minimumloglevel = 0;
    }
    // modulename is the module that started it, level is as follows:
    // 0 = debug, use for verbose messages
    // 1 = info
    // 2 = warning
    // 3 = error
    // 4 = fatal (terminates the program);
    log(moduleName, level, content) {
        if(level >= this.minimumloglevel || level === 4) {
            console.log("["+moment().format('LTS')+"] "+moduleName+" ("+level+"): "+content);
            if(level === 4) {
                throw new Error("Fatal error from module "+moduleName+". The error has been logged.")
            }
        }
    }
    loadModules() {
        var dir = this.directory+"/modules/";
        var loadlist = {}
        fs.readdirSync(dir).forEach(function (file)
        {
            var stat = fs.statSync(path.join(dir, file));
            if (stat.isDirectory())
            {
                loadlist[file] = require(dir+file+"/index.js"); //Adds module to loadlist
            }
        });
        Object.keys(loadlist).forEach(key => {
            loadlist[key].moduleInitialize(this);
            this.commands[key] = loadlist[key].getCommands();
            this.modules = loadlist;
        });
        Object.keys(loadlist).forEach(key => {
            loadlist[key].allModulesLoaded();
        });
    }
    callModule(name, data) {
        if(this.commands[name]) {
            return this.modules[name].moduleCalled(data);
        }
        else {
            return false;
        }
    }
    executeCommand(message, commandStr) {
        var status = -1;var params = commandStr.split(" ");
        Object.keys(this.commands).forEach(mod => {
            this.commands[mod].forEach(modcmd => {
                if(modcmd == params[0]) {
                    if(this.modules[mod].enabled === true) {
                        try {
                            this.modules[mod].commandCalled(this.prefix+params[0], message);
                        }
                        catch(e) {
                            this.log("echo", 3, "module encountered an error: "+commandStr+": "+e);
                            status = 3;
                        }
                        status = 0;
                    }
                    else {
                        status = 2;
                    }
                }
            });
        })
        if(status === -1) status = 1;
        return status;
    }
    moduleExists(name) {
        return commands[name];
    }
}
module.exports.bot = new BotClass();
class EchoModule extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.enabled = true;
    }
    moduleInitialize(bot) {
        this.bot = bot;
    }
    getCommands() {
        return [];
    }
    allModulesLoaded() {

    }
    moduleCalled(data) {

    }
    commandCalled(command, args) {

    }
}
module.exports.EchoModule = EchoModule;