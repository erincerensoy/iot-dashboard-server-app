import { Component, OnInit, Input } from '@angular/core';
import * as globalVars from "./service/global";
import "/socket.io/socket.io.js";
import { ChartModule }   from 'angular2-highcharts'; 
import 'highcharts/highcharts-more.js';
import 'highcharts/modules/solid-gauge.js';
import { enumAppComponentClass }  from './app.component.enum';

@Component({
  selector: 'iot-app',
  templateUrl:'client/app.component.html',
  styleUrls:['client/app.component.css']
})

export class AppComponent implements OnInit {

deviceId:string;
explanationStringToday:string ='Today';
explanationStringPrevious = 'Previous';
temperatureText = "TEMPERATURE (C)";
humudityText = "HUMUDITY (H)";
temperatureToday="0";
temperaturePrevious="0";
humudityToday="0";
humudityPrevious="0";
Humudity="0";

optionsTemperature = {
            title : { text :   this.temperatureText},
            chart: { zoomType: 'x'},
             series: [{
            name:this.explanationStringToday,
            data: [0,0,0,0,0],
            allowPointSelect: true
            },
            {
            name: this.explanationStringPrevious,
            data: [0,0,0,0,0],
            allowPointSelect: true
            }]
        };

optionsHumudity = {
            title : { text :   this.humudityText},
            chart: { zoomType: 'x'},
             series: [{
            name:this.explanationStringToday,
            data: [0,0,0,0,0],
            allowPointSelect: true
            },
            {
            name: this.explanationStringPrevious,
            data: [0,0,0,0,0],
            allowPointSelect: true
            }]
        };

constructor(){

  this.deviceId =  "-";
 
 /*TODO aşağıdaki değişkenleri app.component.enum dosyasından okumaya başla

  this.temperatureExplanationStringToday = enumAppComponentClass.temperatureExplanationStringToday;
  this.temperatureExplanationStringPrevious = enumAppComponentClass.temperatureExplanationStringPrevious;
  this.temperatureText = enumAppComponentClass.temperatureText;  
  this.TemperatureToday = enumAppComponentClass.TemperatureToday;
  this.TemperaturePrevious = enumAppComponentClass.TemperaturePrevious;
  */
}

onChartSelection (e) {
    this.from = e.originalEvent.xAxis[0].min.toFixed(2);
    this.to = e.originalEvent.xAxis[0].max.toFixed(2);
}

manipulate(message)
{
         this.deviceId    = message.deviceId;      

        //TODO aşağıdaki değerleri stream den array olarak alıp dizi içinde manipule et
        // this.optionsTemperature.series.push(promiseToday,promisePrevious);

         var promiseToday = {
                        name: this.explanationStringToday,
                        data:message.temperatureToday,
                        allowPointSelect: true
         };

          var promisePrevious = {
                        name: this.explanationStringPrevious,
                        data:message.temperaturePrevious,
                        allowPointSelect: true
         };


          this.optionsTemperature = {
                        title : { text : this.temperatureText },
                        chart: { zoomType: 'x'},
                        series: [promiseToday,promisePrevious]
                    };
    

            var promiseTodayHumudity = {
                        name: this.explanationStringToday,
                        data:message.humudityToday,
                        allowPointSelect: true
           };

           var promisePreviousHumudity = {
                        name: this.explanationStringPrevious,
                        data:message.humudityPrevious,
                        allowPointSelect: true
           };

            this.optionsHumudity = {
                        title : { text : this.humudityText },
                        chart: { zoomType: 'x'},
                        series: [promiseTodayHumudity,promisePreviousHumudity]
            };

             this.onChartSelection(this.optionsTemperature);
             this.onChartSelection(this.optionsHumudity);


}

incomeMessageFormatControl(message)
{
    if(!message || !message.temperatureToday ||  !message.temperaturePrevious || !message.humudityPrevious || !message.humudityToday || !message.deviceId ){
      console.log("message format is invalid!");
      return false;
    }
    else return true;
}

 ngOnInit() { 
    globalVars.socket =  io({ message:"BEGIN_CONNECTION" });

    globalVars.socket.on("sendMessage", (message) => {  
         console.log("received message:", message);
           
    if(this.incomeMessageFormatControl(message))    
          this.manipulate(message);
      
    });
  }
}


