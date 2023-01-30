function Balance() {
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [user, setUser]       = React.useState('');

    return (
        <Card
    bgcolor="primary"
    txtcolor="white"
    header="Balance"
    status={status}
    body={show ? 
        <BalanceForm setShow={setShow} user={user} setUser={setUser} setStatus={setStatus} /> : 
        <BalanceMsg setShow={setShow} user={user} />}
  />
    )
}

function BalanceMsg(props){
    return(
        <>
            <h1>Balance</h1>
            {props.user.name}'s Current Balance: ${props.user.balance} <br/><br/>
            <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Check another balance</button>
        </>
    )
}

function BalanceForm(props){
    const [email, setEmail]       = React.useState('');
    
    function handle() {
        const url = `/account/balance/${email}`;

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

            props.setUser(data);
            props.setShow(false);
          })();
    }
    return(
        <>
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" onClick={handle} disabled={!email}>Submit</button>
        </>
    )
}