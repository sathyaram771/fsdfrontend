import React,{userState, useState} from "react";

function App(){
    const [username,setusername] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");
    const [message,setmessage] = useState("");

    const submitfunc = async (e)=>{
      e.preventDefault();
      if(!username || !email || !password || !confirmpassword){
        return setmessage("please enter all the fields");
      }
      if(password !== confirmpassword){
        return setmessage("passwords do not match");
      }
      
      const response = await fetch("https://fsdbackend.onrender.com/add",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({username,email,password})
      });
      const data = await response.json();
      console.log(data.message);
      setmessage(data.message);
    }
    return(
      <div style={{textAlign:"center"}}>
        <h1>REGISTER</h1>
        <form onSubmit={submitfunc}>
              <input type = "text" placeholder = "USERNAME" value = {username} onChange={(e)=>setusername(e.target.value)}/><br/>
              <input type = "text" placeholder = "EMAIL" value = {email} onChange={(e)=>setemail(e.target.value)}/><br/>
              <input type = "password" placeholder = "PASSWORD" value = {password} onChange={(e)=>setpassword(e.target.value)}/><br/>
              <input type = "password" placeholder = "CONFIRMPASSWORD" value = {confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)}/><br/>
              <button type="submit">REGISTER</button>
        </form>
        <p style={{color:"red"}}>{message}</p>
      </div>
    );
}
export default App;