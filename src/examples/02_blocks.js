import { ApiPromise } from '@polkadot/api';
import { Api_derive } from '@polkadot/api-derive';
import {
  createButton, createLog, createError, createWrapper,createDiv,createElement, createtext, createBlockdeails
} from '../commons';

var date1=new Date();  //define time 
 //https://polkadot.js.org/api/examples/promise/02_listen_to_blocks/
export default async (provider) => {
  const wrapper = createWrapper('listen-to-blocks', 'Summary','#content');
  //const wrapper_blocks = createWrapper('block_details', 'Blocks Details','#content');
  const div_block = createDiv('best_blocks','best_blocks', '.listen-to-blocks');
  
  const div_clock = createDiv('clock_count','clock_count', '.listen-to-blocks');
  const div_era = createDiv('era','era','.listen-to-blocks');
  const div_era_curr = createDiv('era_curr','era_curr', '.era');
  //createtext('dash','era','/');
  const div_era_len = createDiv('era_len','era_len','.era');
  //const div_era_index = createDiv('era_index','era_index', '.era');
  const div_session = createDiv('session','session', '.listen-to-blocks');  
  const div_session_curr = createDiv('session_curr','session_curr', '.session'); 
  //createtext('dash','session','/');
  const div_session_len = createDiv('session_len','session_len', '.session');
  //const div_session_index = createDiv('session_index','session_index', '.session');

  try {
    // Create our API with a connection to the node
    const api = await ApiPromise.create(provider);
    window.api = api;
    var timer=setInterval(function(){clock()},100); //clock count
    // Subscribe to the new headers on-chain. The callback is fired when new headers
    // are found, the call itself returns a promise with a subscription that can be
    // used to unsubscribe from the newHead subscription
    const unsubscribe = await api.rpc.chain.subscribeNewHead((header) => {
      createElement(` ${header.blockNumber}`, div_block); 
      var temp = header.blockNumber; 
      var a=document.getElementById("best_blocks").innerText;
      if (temp!=a){
        document.getElementById("best_blocks").innerText=temp;
        date1=new Date();  //Reset time if have new block 
        //var b_index=document.getElementById("session_index").innerText;
        var b_len=document.getElementById("session_len").innerText;
        //document.getElementById("session_curr").innerText=temp-b_index*b_len; 
        //var c_index=document.getElementById("era_index").innerText;
        var c_len=document.getElementById("era_len").innerText;
        //document.getElementById("era_curr").innerText=temp-c_index*c_len;
        //session_curr = session_curr + 1;
        //document.getElementsByClassName("best_blocks").innerText=session_curr+'/ ';
      };
    });

    const session_index = await api.derive.session.sessionProgress((header) => {
      var temp = header+'/';
      createElement(` ${header} `  , div_session_curr);     
      var a=document.getElementById("session_curr").innerText;
      if (temp!=a){
        document.getElementById("session_curr").innerText=temp;        
      };     
     });

    const session_len = await api.query.session.sessionLength((header) => {
      var temp =header;
      createElement(`${header} ` , div_session_len);  
      //createElement('pHash '+`${header.parentHash}`, div_block_root);    
      var a=document.getElementById("session_len").innerText;
      if (temp!=a){
        document.getElementById("session_len").innerText=temp;
      };     
     });

     const era_len = await api.query.staking.sessionsPerEra((header) => {
      var s=document.getElementById("session_len").innerText;
      var temp =header*s;
      createElement(`${header}*${s} `  , div_era_len);     
      var a=document.getElementById("era_len").innerText;
      if (temp!=a){        
        //console.log(s);
        document.getElementById("era_len").innerText=temp;
      };     
     });
     const era_index = await api.derive.session.eraProgress((header) => {
      var temp = header+'/';
      createElement(` ${header} `  , div_era_curr);     
      var a=document.getElementById("era_curr").innerText;
      if (temp!=a){        
        document.getElementById("era_curr").innerText=temp;
      };     
     });

    //createButton(unsubscribe, wrapper, 'Unsubscribe');
  } catch (e) {
    createError(e, wrapper);
  }
};


function clock()
{
    var date2=new Date();    //结束时间
    var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数
    if (date3>=10000){
      var t=(date3/1000).toFixed(0);
    }
    else{
      var t=(date3/1000).toFixed(1);
    }        
    document.getElementById("clock_count").innerText=t + 's';
}

