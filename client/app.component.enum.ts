export class enumAppComponentClass
{
  temperatureExplanationStringToday:string;
  temperatureExplanationStringPrevious:string;
  temperatureText:string ;
  deviceId:string;
  TemperatureToday:string;
  TemperaturePrevious:string;
  Humudity:string;

  constructor()
  {
    this.temperatureExplanationStringToday ='Today';
    this.temperatureExplanationStringPrevious = 'Previous';
    this.temperatureText = "TEMPARATURE";
    this.deviceId ="-";
    this.TemperatureToday="0";
    this.TemperaturePrevious="0";
    this.Humudity="0";
  }
};
