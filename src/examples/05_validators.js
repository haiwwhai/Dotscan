import { ApiPromise } from '@polkadot/api';
import {
  createButton, createLog, createError, createWrapper,createDiv,createElement, createtext
} from '../commons';

var date1=new Date();  //define time 
 //https://polkadot.js.org/api/examples/promise/02_listen_to_blocks/
export default async (provider) => {
  const wrapper = createWrapper('validators', 'validators','#content');
  const wrapper2 = createDiv('v_list', 'v-List','.validators');
  
  try {
    // Create our API with a default connection to the local node
    const api = await ApiPromise.create(provider);
    // Make our basic chain state/storage queries, all in one go
    const [validators] = await Promise.all([
    api.query.session.validators()
    ]);
    //console.log(validators);
    //createElement(`accountNonce(${ALICE}) ${accountNonce}`, wrapper);
    //createElement(`blockPeriod ${blockPeriod.toNumber()} seconds`, wrapper);
    // Retrieve the balances for all validators
    const validatorBalances = await Promise.all(
      validators.map(authorityId => api.query.balances.freeBalance(authorityId))
    );
    const nominatoraddress = await Promise.all([
      validators.map(authorityId => api.query.staking.currentNominatorsFor(authorityId))
      ]);
      //console.log(validators.authorityId[0]);
      //console.log(nominatoraddress[0].toString());
      //console.log(validatorBalances[0].toString());
      if (validators.length > 0) {        
      const string = validators.map((authorityId, index) => ({
      address: authorityId.toString(),
      balance: validatorBalances[index].toString(),
      nominator: nominatoraddress[index].toString()      
      }))
      //console.log('123');
      };
      //console.log(string);
      //console.log(validators.length, string[0].address);
    
      for (var i=0; i<validators.length; i++){
      createDiv('validator_set', 'validators_set'+i.toString(),'.v_list');
      createDiv('validatoricon', 'icon_'+string[i].address,'#validators_set'+i.toString()); 
      //createDiv('validatoricon', 'icon_'+123,'#validators_set'+i.toString()); 
      createDiv('validatorDetail', 'Detail_'+string[i].address,'#validators_set'+i.toString()); 
      createtext('validator_Seq', '#Detail_'+string[i].address,'Validator '+i);     
      createtext('validator_address', '#Detail_'+string[i].address,'Address: '+string[i].address); 
      createtext('validator_balance','#Detail_'+string[i].address,'Balance: '+string[i].balance);
      createtext('validator_nominator','#Detail_'+string[i].address,'Balance: '+string[i].nominator);
      console.log(string[i].nominator);   
      identifyicon(string[i].address,64,5,'#icon_'+string[i].address);      
      }
    

  } catch (e) {
    createError(e, wrapper);
  }
};




function identifyicon(account_id,size_all,size_small,id){
  var circ = new Array(20);
  var color = new Array();
  var k=0;
  var j=1;
  var strAscii = new Array();
  //console.log(color);  
  //通过createElementNS创建svg元素并设置属性
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg'); 	
  svg.setAttribute("style","width:100%;height:100%;");
  //svg.setAttribute("width",size_all);
  //svg.setAttribute("height",size_all);
  svg.setAttribute("id",account_id);
  //创建矩形元素并设置属性
  circ[0] = document.createElementNS('http://www.w3.org/2000/svg','circle'); 
  circ[0].setAttribute("cx",size_all/2);	circ[0].setAttribute("cy",size_all/2);	circ[0].setAttribute("r",size_all/2); 
  svg.appendChild(circ[0]);
  for (var i=1;i<=5;i++){
    circ[i] = document.createElementNS('http://www.w3.org/2000/svg','circle'); 
    circ[i].setAttribute("cx",size_all/2);	circ[i].setAttribute("cy",56-(i-1)*12);	circ[i].setAttribute("r",size_small); 
    svg.appendChild(circ[i]);
  }
  for (var i=6;i<=9;i++){
    circ[i] = document.createElementNS('http://www.w3.org/2000/svg','circle'); 
    circ[i].setAttribute("cx",'21.607695154586736');	circ[i].setAttribute("cy",50-(i-6)*12);	circ[i].setAttribute("r",size_small); 
    svg.appendChild(circ[i]);
  }
  for (var i=10;i<=13;i++){
    circ[i] = document.createElementNS('http://www.w3.org/2000/svg','circle'); 
    circ[i].setAttribute("cx",'42.392304845413264');	circ[i].setAttribute("cy",50-(i-10)*12);	circ[i].setAttribute("r",size_small); 
    svg.appendChild(circ[i]);
  } 
  for (var i=14;i<=16;i++){
    circ[i] = document.createElementNS('http://www.w3.org/2000/svg','circle'); 
    circ[i].setAttribute("cx",'11.215390309173472');	circ[i].setAttribute("cy",44-(i-14)*12);	circ[i].setAttribute("r",size_small); 
    svg.appendChild(circ[i]);
  } 
  for (var i=17;i<=19;i++){
    circ[i] = document.createElementNS('http://www.w3.org/2000/svg','circle'); 
    circ[i].setAttribute("cx",'52.78460969082653');	circ[i].setAttribute("cy",44-(i-17)*12);	circ[i].setAttribute("r",size_small); 
    //将矩形和扇形元素添加到SVG元素内
    svg.appendChild(circ[i]);
  }       
  for(var i = 0 ; i < account_id.length ; i++ ){
    strAscii[i] = account_id.charCodeAt(i);//只能把字符串中的字符一个一个的解码 整数
    //circ[k].setAttribute("fill",'rgb(121,121,121'); 
    }      
  for (var i=0; i<20;i++){
    for (var j=0; j<3; j++){
      if (i==0){
        color[i,j]=strAscii[j+3]+strAscii[j+15]+strAscii[j+40]; 
      }
      else{
        if (strAscii[i+2+j*3]%2==0){
          color[i,j]=strAscii[i+2+j*3]/2; 
        }
        else{
          color[i,j]=strAscii[i+2+j*3]*2; 
        }          
      }               
    }
    circ[i].setAttribute("fill",'rgb('+color[i,0]+','+color[i,1]+','+color[i,2]+')');      
  }
  //SVG元素添加到页面内显示
  const app = document.querySelector(id);
  app.appendChild(svg);
}