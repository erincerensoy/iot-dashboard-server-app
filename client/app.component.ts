import { Component, OnInit, Input } from '@angular/core';
import * as globalVars from "./service/global";
import "/socket.io/socket.io.js";


@Component({
  selector: 'iot-app',
  template: `<h1>Device Id: {{deviceId}}, Temperature {{temperature}}</h1>`,
})

export class AppComponent implements OnInit {
  temperature: string; 
  deviceId: string;
  
  constructor(){
    this.temperature = "-";
    this.deviceId = "-";
  }
  
  ngOnInit() { 
    globalVars.socket = io({ message:"BEGIN_CONNECTION" });

    globalVars.socket.on("sendMessage", (message) => {  
           console.log("received message:", message);
           
           if(!message || !message.deviceId || !message.temperature){
              console.log("message format is invalid!");
              return;
           }

           this.deviceId    = message.deviceId;
           this.temperature = message.temperature;
    });
  }
}
