import { Component, OnInit, Input } from '@angular/core';
import * as globalVars from "./service/global";
import "/socket.io/socket.io.js";
import { ChartsModule } from 'ng2-charts';
import { enumAppComponentClass }  from './app.component.enum';

@Component({
  selector: 'iot-app',
  templateUrl:'client/app.component.html',
  styleUrls:['client/app.component.css']
})

export class AppComponent implements OnInit {

  deviceId:string;
  deviceType:string;
  temperature:string;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['TVOC', 'TEMP.', 'HUM.', 'CO2', 'PM25', 'ACCMAX', 'LIGHT','NOISE','PRESS.'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public doughnutChartLabels:string[] = ['TVOC', 'TEMP.', 'HUM.', 'CO2', 'PM25', 'ACCMAX', 'LIGHT','NOISE','PRESS.'];
  public doughnutChartData:number[] = [0, 0, 0, 0, 0, 0, 0,0,0];
  public doughnutChartType:string = 'doughnut';

   public ChartColors:any = 
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }



  public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0,0,0], label: 'VALUES'}
  ];
 
  constructor(){

  this.deviceId =  "Device Id";
  this.deviceType =  "Device Type";
  this.temperature = "...";

}

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


   public doughnutchartManipulate(message:any):void {
   

    this.doughnutChartData = message;
 
  }


  public barchartManipulate(message:any[]):void {

    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = message;
    this.barChartData = clone;
 
  }


incomeMessageFormatControl(message)
{
    if(!message || !message.deviceType ||  !message.data  || !message.deviceId ){
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
   {  
         this.deviceId    = message.deviceId;   
         this.deviceType   = message.deviceType;  
         var dataArr = message.data.split(',').map(Number);
         this.temperature  =  dataArr[1];
         this.barchartManipulate(dataArr);
         this.doughnutchartManipulate(dataArr);
   }
      
    });
  }
}


