import fs from "fs";

const CONFIG_FILE_PATH = "ethos-agent.json";

export class EthOSConfig {
  constructor() {
    this._json = EthOSConfig.load() || EthOSConfig.getDefault();
  }
  get json()           { return this._json; }
  get verbose()        { return this._json.verbose || 0; }
  get watch_enable()   { return this._json.watch  ? (this._json.watch.enable   || false) : false; }
  get watch_delay()    { return this._json.watch  ? (this._json.watch.delay    || 3) : 0; }
  get watch_interval() { return this._json.watch  ? (this._json.watch.interval || 5) : 0; }
  get notify_type()    { return this._json.notify ? (this._json.notify.type    || "slack-webhook") : ""; }
  get notify_url()     { return this._json.notify ? (this._json.notify.url     || "") : ""; }
  static load() {
    try {
      return JSON.parse( fs.readFileSync(CONFIG_FILE_PATH, "utf8") );
    } catch(err) {
      console.error(err.message);
    }
    return null;
  }
/*
  static save(json) {
    const data = JSON.stringify(json, null, 2);
    try {
      fs.writeFileSync(CONFIG_FILE_PATH, data, "utf8");
    } catch(err) {
      console.error(err.message);
    }
  }
 */
  static getDefault() {
    return {
      "verbose": 0,     // 0 or 1 or 2
      "watch": {
        "enable": true, // watch enable
        "delay": 3,     // watch start minutes (at after OS booted)
        "interval": 5,  // watch interval minutes
      }, 
      "notify": {
        "type": "slack-webhook",
        "url": "",  // "https://hooks.slack.com/services/T00000000/B00000000/xxxxxxxxxxxxxxxxxxxxxxxx"
      },
    };
  }
}

export default EthOSConfig;
