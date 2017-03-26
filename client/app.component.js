var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var globalVars = require("./service/global");
require("/socket.io/socket.io.js");
var AppComponent = (function () {
    function AppComponent() {
        this.temperature = "-";
        this.deviceId = "-";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        globalVars.socket = io({ message: "BEGIN_CONNECTION" });
        globalVars.socket.on("sendMessage", function (message) {
            console.log('sendMessage', message.deviceId);
            if (!message || !message.guid || !message.temperature) {
                return;
            }
            _this.deviceId = message.deviceId;
            _this.temperature = message.temperature;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'iot-app',
            template: "<h1>Device Id: {{deviceId}}, Temperature {{temperature}}</h1>"
        })
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
