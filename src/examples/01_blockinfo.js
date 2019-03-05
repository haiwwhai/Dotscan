import { ApiPromise } from '@polkadot/api';
import {
  createLog, createError, createWrapper
} from '../commons';

// https://polkadot.js.org/api/examples/promise/01_simple_connect/
export default async (provider) => {
  const wrapper = createWrapper('Block_info',"","#top_bar");
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

    createLog(`Connecting to chain ${chain} using ${nodeName} v${nodeVersion}`, wrapper);
    console.log(`WebSocket URL is ${provider.endpoint}`);
  } catch (e) {
    createError(e, wrapper);
  }
};
