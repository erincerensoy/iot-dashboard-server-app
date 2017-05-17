"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var globalVars = require("./service/global");
require("/socket.io/socket.io.js");
var AppComponent = (function () {
    function AppComponent() {
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['TVOC', 'TEMP.', 'HUM.', 'CO2', 'PM25', 'ACCMAX', 'LIGHT', 'NOISE', 'PRESS.'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.doughnutChartLabels = ['TVOC', 'TEMP.', 'HUM.', 'CO2', 'PM25', 'ACCMAX', 'LIGHT', 'NOISE', 'PRESS.'];
        this.doughnutChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.doughnutChartType = 'doughnut';
        this.ChartColors = {
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        };
        this.barChartData = [
            { data: [0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'UNITS' }
        ];
        this.deviceId = "";
        this.temperature = "...";
    }
    // events
    AppComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    AppComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    AppComponent.prototype.doughnutchartManipulate = function (message) {
        this.doughnutChartData = message;
    };
    AppComponent.prototype.barchartManipulate = function (message) {
        var clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = message;
        this.barChartData = clone;
    };
    AppComponent.prototype.incomeMessageFormatControl = function (message) {
        if (!message || !message.data || !message.deviceId) {
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
            if (_this.incomeMessageFormatControl(message)) {
                _this.deviceId = message.deviceId;
                var data = message.data;
                var tempData = [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]];
                _this.temperature = data[0];
                _this.barchartManipulate(tempData);
                _this.doughnutchartManipulate(tempData);
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'iot-app',
        templateUrl: 'client/app.component.html',
        styleUrls: ['client/app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
