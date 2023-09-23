
import './App.css'
import {useState, useEffect} from 'react'




function App() {
  /* -- YOUR CODE/CRUD OPERATIONS HERE --*/


  const MOCK_API_URL = 'https://64f38da5edfa0459f6c6aaa4.mockapi.io/newFilms'
  
  const [users, SetUsers] = useState([{}])

  const [newUserName, setNewUsername] = useState('')
  const [newUserJobTitle, setNewUserjobTitle] = useState('')
  const [newUsercompanyName, setNewUsercompanyName] = useState('')

  const [updatedName,setUpdatedName] = useState('')
  const [updatedJobTitle,setUpdatedJobTitle] = useState('')
  const [updatedcompanyName,setUpdatedcompanyName] = useState('')
 

  function getUsers(){
    fetch(MOCK_API_URL)
    .then(data => data.json())
    .then(data => SetUsers(data))
  }

useEffect(() => {
  getUsers()
  console.log(users)
}, [])


  function deleteUser(id){
    fetch('${xsde45MOCK_API_URL}/${id}', {
      method: 'DELETE'
    }).then(() => getUsers())
  }
  
  
  
  function postNewUser(e){
    e.preventDefault()

    

  

    fetch(MOCK_API_URL, {
      method: 'POST',
      headers: { "content-Type": "application/json"},
      body: JSON.stringify({
        name: newUserName,
        companyName:newUsercompanyName,
        JobTitle:newUserJobTitle,
      })
    }).then(() => getUsers())
  }

  function updateUser(e, userObject){
    e.preventDefault()

    let updatedUserObject = {
      ...userObject,
      name: updatedName,
      jobTitle: updatedJobTitle,
      companyName: updatedcompanyName,
    }

    fetch(`${MOCK_API_URL}/${userObject.id}`,{
      method: 'PUT',
      body: JSON.stringify(updatedUserObject),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => getUsers())


  }


  return (
    <div className="App">
      {/* CODE BELOW: PART: 5.3 Connecting our POST */}
      <form>
        <h3> POST new user form</h3>
        <label>Name</label>
        <input onChange={(e) => setNewUsername(e.target.value)}></input>
        <label>Job Title</label>
        <input onChange={(e) => setNewUserjobTitle(e.target.value)}></input>
        <label>Company Name</label>
        <input onChange={(e) => setNewUsercompanyName(e.transfer.value)}></input>
        <button onClick={(e) => postNewUser(e)}>submit</button>
      </form>

      {/* CODE BELOW: PART 5.1: Connecting our GET  //  PART 5.4: Connecting our UPDATE */}
      {users.map((user, index) => (
        <div className= "userContainer" key={index}>
          <div>
Name: {user.name} <br></br>
Job Title: {user.jobTitle} <br></br>
Company name: {user.companyName} <br></br>
<button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
          <form>
            <h3>Update This User</h3>
            <label>Update Name</label>
            <input onChange={(e) => setUpdatedName(e.target.value)}></input><br></br>

            <label>update Job title</label>
            <input onChange={(e) => setUpdatedJobTitle(e.target.value)}></input><br></br>

            <label>update Company Name</label>
            <input onChange={(e) => setUpdatedcompanyName(e.target.value)}></input><br></br>
            <button onClick={(e) => updateUser(e, user )}>update</button>
          </form>
          </div>
      ))}
   </div>
  )
      }

export default App

