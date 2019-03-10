import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';

import blockinfo from './examples/01_blockinfo';
import blocksupdate from './examples/02_blocks';
import displaySystemEvents from './examples/03_events';

import blocksdetails from './examples/04_blocksdetails';
import validators from './examples/05_validators';


import makeTransfer from './examples/06-make-transfer';

import transferEvents from './examples/09-transfer-events';


// Choose which provider you want to connect to:
/**
** Local Node (Substrate, 127.0.0.1:9944)
**/
//const provider = new WsProvider('ws://127.0.0.1:9944');

/**
** Node Charred Cherry (Substrate, hosted by Parity Technologies)
**/
//const provider = new WsProvider('wss://substrate-rpc.parity.io/');
const provider = new WsProvider('wss://poc3-rpc.polkadot.io/');

(async function main () {
  // Include the examples
  blockinfo(provider);
  blocksupdate(provider);
  //chains(provider);
  displaySystemEvents(provider);
  blocksdetails(provider);
  validators(provider);

  

  //makeTransfer(provider);
  //listenToBalanceChange(provider);
  
  //transferEvents(provider);

  // Add the api to the window object to make it accessible in the browsers dev tools
  window.api = await ApiPromise.create(provider);
}());
