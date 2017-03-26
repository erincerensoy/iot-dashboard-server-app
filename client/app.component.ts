import { Component, OnInit, Input } from '@angular/core';
import * as globalVars from "./service/global";
import "/socket.io/socket.io.js";


@Component({
  selector: 'iot-app',
  template: `<h1>Device Id: {{guid}}, Temperature {{temperature}}</h1>`,
})

export class AppComponent implements OnInit {
  temperature: string; 
  guid: string;
  
  constructor(){
    this.temperature = "-";
    this.guid = "-";
  }
  
  ngOnInit() { 
    globalVars.socket = io({ message:"BEGIN_CONNECTION" });

    globalVars.socket.on("sendMessage", (message) => {  
           console.log('sendMessage', message.deviceId);
           if(!message || !message.guid || !message.temperature){
              return;
           }

           this.guid        = message.guid;
           this.temperature = message.temperature;
    });
  }
}
