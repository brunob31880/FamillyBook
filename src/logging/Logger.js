/* eslint-disable no-useless-concat */
const Level = ["ERROR", "WARNING", "INFO", "DEBUG", "TRACE"];
/**
 * Le Logger
 */
class LoggerClass {
  get level() {
    return this._level;
  }
  set level(val) {
    console.log("Setting level to " + val);
    this._level = val;
  }
  get autorized() {
    return this._autorized;
  }
  set autorized(auth) {
    this._autorized = auth;
  }
  //
  //
  //
  constructor(lel) {
    this._level = lel;
    this._autorized = [];
    this._date = new Date();
    console.log(this._date);
  }
  info(from, msg) {
    this.log("INFO", from, msg);
  }
  warn(from, msg) {
    this.log("WARN", from, msg);
  }
 
  debug(from, msg) {
    this.log("DEBUG", from, msg);
  }
  log(lvl, from, msg) {
    if (msg) {
      //if (lvl==="INFO") console.log(Level.indexOf(lvl) + " <-> " + this.level + " " +msg);
      if (Level.indexOf(lvl) <= this.level)  {
        let h=new Date();
        let delta=h.getTime()-this._date.getTime();
         console.log(" [" + from.toUpperCase() + "] " + msg+" (timestamp="+delta+")");
      }
      //else console.debug(Level.indexOf(lvl) + " <-> " + Level[this.level] + " " + msg);
    }
  }

};
//
//
//
class Logger {
  static _instance

  static _createInstance() {
    console.log("Logger CreateInstance Level INFO by default");
    const logger = new LoggerClass(2)
    return logger
  }

  static getInstance() {
    
    if (!this._instance) {
 
      this._instance = this._createInstance()
    }
    return this._instance
  }
}
export default Logger;


