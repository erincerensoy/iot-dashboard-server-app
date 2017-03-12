import { Component, OnInit, Input } from '@angular/core';
import * as globalVars from "./service/global";
import "/socket.io/socket.io.js";


@Component({
  selector: 'iot-app',
  template: `<h1>Hello {{name}}, Device Id: {{guid}}</h1>`,
})

export class AppComponent implements OnInit {
  name: string; 
  guid: string;
  
  constructor(){
    this.name = "iot";
    this.guid = "-";
  }
  
  ngOnInit() { 
    globalVars.socket = io({ message:"BEGIN_CONNECTION" });

    globalVars.socket.on("sendMessage", (message) => {  
           console.log('sendMessage', message.deviceId);
           if(!message || !message.deviceId){
              return;
           }

           this.guid = message.deviceId;
    });
  }
}
