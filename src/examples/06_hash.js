import { ApiPromise } from '@polkadot/api';
import {
  createLog, createError, createWrapper,createElement
} from '../commons';

// https://polkadot.js.org/api/examples/promise/01_simple_connect/
export default async (provider) => {
  //const wrapper = createWrapper('Block_info',"","#top_bar");
  var cs = document.getElementsByClassName("hash");
  var my = document.getElementById(cs[cs.length-1].id);
  createElement('my.id', my); 
  //console.log(cs);
  //const wrapper = createWrapper('Block_hash',"lock_hash",my);
  // Retrieve the chain & node information information via rpc calls
  try {
    // Create our API with a connection to the node
    const api = await ApiPromise.create(provider);
    const [chain, nodeName, nodeVersion, properties] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
      api.rpc.system.properties()
    ]);
    console.log(`haha3'${chain}`);

    
  } catch (e) {
    createError(e, wrapper);
  }
};
