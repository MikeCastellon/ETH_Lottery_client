import { useState, useEffect } from 'react';
import web3 from './web3';
import lottery from './lottery'

function App() {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [prize, setPrize] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    async function getManager(){
      const manager = await lottery.methods.manager().call()
      const players = await lottery.methods.getPlayers().call()
      const prize = await web3.eth.getBalance(lottery.options.address)
      

      setManager(manager)
      setPlayers(players)
      setPrize(prize)
    }

    getManager()
  }, [])

  onSubmit = () => {

  }
  
  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This Contract is managed by: {manager}. There are currently {players.length} players competing to win {web3.utils.fromWei(prize, 'ether')} Ether</p>  

      <hr/>
      <h4>Want to try your luck?</h4>
      <form onSubmit={this.onSubmit}>
        <label>Amount of Ether you want to enter.</label>
        <div>
          <input
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
    </div>
  );
}

export default App;
