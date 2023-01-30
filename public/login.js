function Login() {
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');

  return (
    <Card
      bgcolor="warning"
      txtcolor="black"
      header="Login"
      status={status}
      body={show ?
        <LoginForm setShow={setShow} setStatus={setStatus} /> :
        <LoginMsg setShow={setShow} /> }
    />
  )
}

function LoginMsg(props){
    return(
        <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Logout</button>
              </>
    )
}

function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');

    function validate(field, label){
    
        if (!field) {
            props.setStatus('Error: ' + label + ' is blank');
            setTimeout(() => props.setStatus(''),3000);
            return false;
        }
        return true;
      }
    
      function handle(){
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;
    
        const url = `/account/login/${email}/${password}`;
    
        (async () => {
          const res = await fetch(url);
          const data = await res.json();
            console.log(data);
        
          if (data.error){
            props.setStatus(data.error);
            setTimeout(() => props.setStatus(''),4000);
            props.setShow(true);
            return;
          }

          props.setShow(false);
        })();
      }
    return(
        <>
        Email address<br/>
        <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
        Password<br/>
        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
        <button type="submit" className="btn btn-light" onClick={handle} disabled={!email && !password}>Login</button>
        </>
    )
}