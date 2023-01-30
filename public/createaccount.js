function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor='primary'
      txtcolor='white'
      header='Create Account'
      status={status}
      body={
        show ? 
        <CreateForm setShow={setShow} setStatus={setStatus} /> : 
        <CreateMsg setShow={setShow} /> }
    />
  );
}

function CreateMsg(props){
    return(
        <>
            <h5>Success</h5>
            <button type='submit' className='btn btn-light' onClick={() => props.setShow(true)}>
              Add another account
            </button>
          </>
    )
}

function CreateForm(props){
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    function validate(field, label){
    
        if (!field) {
            props.setStatus('Error: ' + label + ' is blank');
            setTimeout(() => props.setStatus(''),3000);
            return false;
        }
        return true;
    }

    function handle() {
        if (!validate(name,    'name'))    return;
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;
        console.log(name, email, password);

        const url = `/account/create/${name}/${email}/${password}`;

        (async () => {
            const res = await fetch(url);
            const data = await res.json().catch(err => console.log(err));
            console.log(data);
          
            if (data.error){
              props.setStatus(data.error);
              setTimeout(() => props.setStatus(''),4000);
              props.setShow(true);
              return;
            }
  
            props.setShow(false);
            return;
          })();
    }

    return(
        <>
            Name
            <br />
            <input
              type='input'
              className='form-control'
              id='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type='input'
              className='form-control'
              id='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type='submit'
              className='btn btn-light'
              onClick={handle}
              disabled={!name && !email && !password}
            >
              Create Account
            </button>
          </>
    )
}
