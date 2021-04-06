import { useState, useEffect } from 'react';
import web3 from './web3';
import lottery from './lottery'

function App() {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [prize, setPrize] = useState('')
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')

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

  const onSubmit = async (event) => {
    event.preventDefault()
    window.ethereum.enable()

    const accounts = await web3.eth.getAccounts()

    setMessage('Waiting on transaction success')

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    })
    setMessage('You have been entered!')
  }
  
  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This Contract is managed by: {manager}. There are currently {players.length} players competing to win {web3.utils.fromWei(prize, 'ether')} Ether</p>  

      <hr/>
      <h4>Want to try your luck?</h4>
      <form onSubmit={onSubmit}>
        <label>Amount of Ether you want to enter.</label>
        <div>
          <input
            placeholder='min to enter 0.01 ether'
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>

      <hr/>

      <h3>{message}</h3>
    </div>
  );
}

export default App;
