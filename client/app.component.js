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
require('highcharts/highcharts-more.js');
require('highcharts/modules/solid-gauge.js');
var AppComponent = (function () {
    function AppComponent() {
        this.explanationStringToday = 'Today';
        this.explanationStringPrevious = 'Previous';
        this.temperatureText = "TEMPERATURE (C)";
        this.humudityText = "HUMUDITY (H)";
        this.temperatureToday = "0";
        this.temperaturePrevious = "0";
        this.humudityToday = "0";
        this.humudityPrevious = "0";
        this.Humudity = "0";
        this.optionsTemperature = {
            title: { text: this.temperatureText },
            chart: { zoomType: 'x' },
            series: [{
                    name: this.explanationStringToday,
                    data: [0, 0, 0, 0, 0],
                    allowPointSelect: true
                },
                {
                    name: this.explanationStringPrevious,
                    data: [0, 0, 0, 0, 0],
                    allowPointSelect: true
                }]
        };
        this.optionsHumudity = {
            title: { text: this.humudityText },
            chart: { zoomType: 'x' },
            series: [{
                    name: this.explanationStringToday,
                    data: [0, 0, 0, 0, 0],
                    allowPointSelect: true
                },
                {
                    name: this.explanationStringPrevious,
                    data: [0, 0, 0, 0, 0],
                    allowPointSelect: true
                }]
        };
        this.deviceId = "-";
        /*TODO aşağıdaki değişkenleri app.component.enum dosyasından okumaya başla
       
         this.temperatureExplanationStringToday = enumAppComponentClass.temperatureExplanationStringToday;
         this.temperatureExplanationStringPrevious = enumAppComponentClass.temperatureExplanationStringPrevious;
         this.temperatureText = enumAppComponentClass.temperatureText;
         this.TemperatureToday = enumAppComponentClass.TemperatureToday;
         this.TemperaturePrevious = enumAppComponentClass.TemperaturePrevious;
         */
    }
    AppComponent.prototype.onChartSelection = function (e) {
        this.from = e.originalEvent.xAxis[0].min.toFixed(2);
        this.to = e.originalEvent.xAxis[0].max.toFixed(2);
    };
    AppComponent.prototype.manipulate = function (message) {
        this.deviceId = message.deviceId;
        //TODO aşağıdaki değerleri stream den array olarak alıp dizi içinde manipule et
        // this.optionsTemperature.series.push(promiseToday,promisePrevious);
        var promiseToday = {
            name: this.explanationStringToday,
            data: message.temperatureToday,
            allowPointSelect: true
        };
        var promisePrevious = {
            name: this.explanationStringPrevious,
            data: message.temperaturePrevious,
            allowPointSelect: true
        };
        this.optionsTemperature = {
            title: { text: this.temperatureText },
            chart: { zoomType: 'x' },
            series: [promiseToday, promisePrevious]
        };
        var promiseTodayHumudity = {
            name: this.explanationStringToday,
            data: message.humudityToday,
            allowPointSelect: true
        };
        var promisePreviousHumudity = {
            name: this.explanationStringPrevious,
            data: message.humudityPrevious,
            allowPointSelect: true
        };
        this.optionsHumudity = {
            title: { text: this.humudityText },
            chart: { zoomType: 'x' },
            series: [promiseTodayHumudity, promisePreviousHumudity]
        };
        this.onChartSelection(this.optionsTemperature);
        this.onChartSelection(this.optionsHumudity);
    };
    AppComponent.prototype.incomeMessageFormatControl = function (message) {
        if (!message || !message.temperatureToday || !message.temperaturePrevious || !message.humudityPrevious || !message.humudityToday || !message.deviceId) {
            console.log("message format is invalid!");
            return false;
        }
        else
            return true;
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        globalVars.socket = io({ message: "BEGIN_CONNECTION" });
        globalVars.socket.on("sendMessage", function (message) {
            console.log("received message:", message);
            if (_this.incomeMessageFormatControl(message))
                _this.manipulate(message);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'iot-app',
            templateUrl: 'client/app.component.html',
            styleUrls: ['client/app.component.css']
        })
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
