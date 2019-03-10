import { ApiPromise } from '@polkadot/api';
import {
  createLog, createError, createWrapper,createDiv
} from '../commons';

// https://polkadot.js.org/api/examples/promise/08_system_events/
export default async (provider) => {
  const wrapper2 = createWrapper('chains', 'Chain State','#content');
  const wrapper = createDiv('event', 'system_event','.chains');
  // Create our API with a default connection to the local node
  try {
    // Create an await for the API
    const api = await ApiPromise.create(provider);
    // subscribe to system events via storage
    api.query.system.events((events) => {

      createLog(getNowFormatDate()+` ${events.length} new event(s)`, wrapper, 'highlight');
      // loop through the Vec<EventRecord>
      events.forEach((record) => {
      // extract the phase, event and the event types
        const { event, phase } = record;
        const types = event.typeDef;
        // show what we are busy with
        createLog(`${event.section}:${event.method}:: (phase=${phase.toString()})`, wrapper);
        createLog(`\t${event.meta.documentation.toString()}`, wrapper);
        // loop through each of the parameters, displaying the type and data
        event.data.forEach((data, index) => {
          createLog(`\t\tt${types[index].type}: ${data.toString()}`, wrapper);
        });
      });
      //createLog(`----- End ${events.length} event(s): -----------`, wrapper, 'console');
    });
  } catch (e) {
    createError(e, wrapper);
  }
};


//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var strHour = date.getHours();
  var strMin = date.getMinutes();
  var strSec = date.getSeconds();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  if (strMin >= 0 && strMin <= 9) {
     strMin = "0" + strMin;
  }
  if (strHour >= 0 && strHour <= 9) {
     strHour = "0" + strHour;
  }
  if (strSec >= 0 && strSec <= 9) {
     strSec = "0" + strSec;
  }  
  //var strSec = date.getSeconds();
  var currentdate = year + seperator1 + month + seperator1 + strDate + "  " + strHour+ ":" + strMin+ ":" + strSec;
  return currentdate;
}