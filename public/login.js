function Login(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);

  if (ctx){
    setShow(false);
  }

  function validate(field, label){
    
    if (!field) {
        setStatus('Error: ' + label + ' is blank');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;

  }

  function handle(){
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    let check = true;
    const url = `/account/login/${email}/${password}`;

    (async () => {
      var res = await fetch(url);
      var data = await res.json();
        console.log(data);
    
      if (data.type === 'error'){
        setStatus('Login failed.');
        setTimeout(() => setStatus(''),3000);
        setShow(true);
        return;
      }
    })();

    setShow(false);
  }    

  function clearForm(){
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="warning"
      txtcolor="black"
      header="Login"
      status={status}
      body={show ? ( 
              <>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handle} disabled={!email && !password}>Login</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Logout</button>
              </>
            )}
    />
  )

}