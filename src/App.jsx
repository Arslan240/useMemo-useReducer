import { useMemo, useReducer, useState } from 'react'
import './App.css'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 10px;
  p {
    margin: 10px 0;
  }
  .memo {
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 2px solid #2b74c2c8;
    border-radius: 10px;
    padding: 25px;

    input{
      padding: 5px;
      border: none;
      border: 1px solid #2b74c2c8;
      border-radius: 5px;
    }

    button {
      background-color: #e7e4e4;
      margin-top: 5px;
    }

    .inner-details {
      display: flex;
      flex-direction: column;
      .input-details {
        display: flex;
        flex-direction: column;
      }
    }
  }


`
const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    margin: 10px 0;
  }
  .memo {
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 2px solid #2b74c2c8;
    border-radius: 10px;
    padding: 25px;

    input{
      padding: 5px;
      border: none;
      border: 1px solid #2b74c2c8;
      border-radius: 5px;
    }

    button {
      background-color: #e7e4e4;
      margin-top: 5px;
    }
  }

  .flex-row{
    display: flex;
    .inner-div {
      width:50%;
    }
  }
`

function Form() {
  const [state, dispatch] = useReducer((state, action) => {
    return {
      ...state,
      ...action
    }
  }, {
    first: "",
    last: "",
  })

  return (
    <div className='memo inner-div'>
      <div>
        <label htmlFor="first">First Name: </label>
        <input type="text" id="first" value={state.first}
          onChange={e => dispatch({ first: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="last">Last Name: </label>
        <input type="text" id="last" value={state.last}
          onChange={e => dispatch({ last: e.target.value })}
        />
      </div>
      <div>
        Name: {state.first} {state.last}
      </div>
    </div>
  )
}

function App() {
  // Reducer
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, name: action.payload };
      case "ADD_NAME":

        return {
          ...state,
          names: [...state.names, state.name],
          name: "",
        }
    }
  }, {
    names: [],
    name: ""
  })


  //Memo
  const [numbers, setNumbers] = useState([10, 20, 30, 40]);
  const [names, setNames] = useState(["John", "Paul", "Gringo", "Awais"]);
  const sortedNames = useMemo(() => {
    console.log("Sorting names")
    return [...names].sort()
  }, [names])

  const reducedNumber = useMemo(() => {
    console.log("Numbers are being added");
    console.log(numbers)
    return [...numbers].reduce((acc, number) => acc + number, 0)
  }, [numbers])

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [count, setCount] = useState(0)

  function handleAddName() {
    if (name !== "") {
      setNames([...names, name])
      setName("")
    }
  }

  function handleNumberInput(e) {
    const num = parseInt(e.target.value)
    if (isNaN(num)) {
      setNumber("")
    } else {
      setNumber(e.target.value)
    }
  }
  function handleAddNumber() {
    const num = parseInt(number)
    if (number !== "" && !isNaN(num)) {
      console.log(number)
      setNumbers([...numbers, num])
      setNumber("")
    }
  }


  return (

    <div>
      <Container>
        <div className="should-use-memo memo">
          <h2>Should useMemo</h2>

          <p><b>Sorted Names:</b> {sortedNames.join(', ')}</p>
          <p><b>Reduced Numbers:</b> {reducedNumber}</p>
          <div className='inner-details'>
            <div>
              <div className='input-details'>
                <b>Name</b>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={handleAddName}>Add Name</button>
              </div>
              <p><b>Name:</b> {names.join(', ')}</p>
            </div>
            <div>
              <div className='input-details'>
                <b>Numbers</b>
                <input type="text" value={number} onChange={handleNumberInput} />
                <button onClick={handleAddNumber}>Add Number</button>
              </div>
              <p><b>Numbers:</b> {numbers.join(', ')}</p>
            </div>
          </div>

        </div>
        <div className="should-not-use-memo memo">
          <h2>Should not useMemo</h2>
          <button onClick={() => setCount(count + 1)}>Count: {count}</button>
        </div>
      </Container>
      <SecondContainer>
        <h2>useReducer</h2>
        <div className='flex-row'>
          <Form />
          <div style={{ margin: 10 }} className='memo inner-div'>
            <input type="text"
              value={state.name}
              onChange={e => dispatch({ type: "SET_NAME", payload: e.target.value })}
            />
            <div>
              {state.name}
            </div>
            <button
              onClick={() => dispatch({ type: "ADD_NAME" })}
            >
              Add Name
            </button>
          </div>
        </div>
      </SecondContainer>
    </div>

  )
}

export default App
