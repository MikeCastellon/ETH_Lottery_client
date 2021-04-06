import { useState, useEffect } from 'react';
import web3 from './web3';
import lottery from './lottery'

function App() {
  const [manager, setManager] = useState('')

  useEffect(() => {
    async function getManager(){
      const manager = await lottery.methods.manager().call()

      setManager(manager)
    }

    getManager()
  })

  
  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This Contract is managed by: {manager}</p>  
    </div>
  );
}

export default App;
