import { ApiPromise } from '@polkadot/api';
import {
  createButton, createLog, createError, createWrapper,createDiv,createElement, createtext, createBlockdetails
} from '../commons';


var date1=new Date();  //define time

 //https://polkadot.js.org/api/examples/promise/02_listen_to_blocks/
export default async (provider) => {
  const wrapper_blockdetails= createWrapper('blocks_details', 'Blocks Details','#content');
  const div_blocks_list = createDiv('block_list','block_list', '.blocks_details');
  try {
    // Create our API with a connection to the node
    const api = await ApiPromise.create(provider);
    window.api = api;
    //var timer=setInterval(function(){clock()},100); //clock count
    // Subscribe to the new headers on-chain. The callback is fired when new headers
    // are found, the call itself returns a promise with a subscription that can be
    // used to unsubscribe from the newHead subscription

    
    const unsubscribe = await api.rpc.chain.subscribeNewHead((header) => {
    const div_block_seq = createBlockdetails('Detail_block_list',`No_${header.blockNumber}`,'.block_list');
    const div_block_left=createDiv('block_left','block_left_'+`${header.blockNumber}`, '#'+`No_${header.blockNumber}`);
    const div_block_left_No=createDiv('block_No','D_No_'+`${header.blockNumber}`,'#'+`block_left_${header.blockNumber}`); 
    createElement(`${header.blockNumber}`, div_block_left_No); 
    const div_block_left_blocktime=createDiv('block_time','block_time_'+`${header.blockNumber}`,'#'+`block_left_${header.blockNumber}`);
    createElement(getNowFormatDate(), div_block_left_blocktime); 

    const div_block_right=createDiv('block_right','block_right_'+`${header.blockNumber}`, '#'+`No_${header.blockNumber}`);
    const div_block_right_hash=createDiv('hash','hash_'+`${header.blockNumber}`,'#'+`block_right_${header.blockNumber}`);
    //createElement(hash, div_block_right_hash); 

    const div_block_root=createDiv('root','root_'+`${header.blockNumber}`,'#'+`block_right_${header.blockNumber}`);
    createElement('pHash '+`${header.parentHash}`, div_block_root); 
    createElement('extrinsicaRoot '+`${header.extrinsicsRoot}`, div_block_root); 
    createElement('stateRoot '+`${header.stateRoot}`, div_block_root); 

    count_div_blocks(); 
    gethash();
    });


    //createButton(unsubscribe, wrapper, 'Unsubscribe');
  } catch (e) {
    createError(e, wrapper_blockdetails);
  }
};

async function gethash(provider){
  const api = await ApiPromise.create(provider);
  window.api = api;
  const chain = await api.rpc.chain.getBlockHash((hash2)=> {
    //console.log(`${hash2}`);
    var cs = document.getElementsByClassName("hash");
    var best_block = document.getElementById(cs[0].id);
    createElement(`${hash2}`, best_block); 
  });
}

//limit block No.
function count_div_blocks() {
  var cs = document.getElementById("block_list").getElementsByClassName("Detail_block_list");
  //cs.length 就是子div总数，cs[i].id 就是可以获取的id
  //console.log(cs.length);
  if (cs.length>5){
    var my = document.getElementById(cs[cs.length-1].id);
    if (my != null){
      my.parentNode.removeChild(my);
      //console.log(my);
    }     
  }
}

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
