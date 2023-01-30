function Deposit() {
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');

  return (
    <Card
      bgcolor="success"
      txtcolor="white"
      header="Deposit"
      status={status}
      body={show ?
            <DepositForm setShow={setShow} setStatus={setStatus} /> :
            <DepositMsg setShow={setShow} /> }
    />
  )
}

function DepositMsg(props){
  return(
    <>
    <h5>Success</h5>
    <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Make another deposit</button>
    </>
  )
}

function DepositForm(props){
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function validate(field, label){
      if (!field) {
        props.setStatus('Error: ' + label + ' is blank');
        setTimeout(() => props.setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handle(){
    console.log(amount);
    if (!validate(amount,    'amount'))    return;
    if (!validate(email,    'email'))    return;

    const url = `/account/deposit/${email}/${amount}`;

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
        props.setStatus('Deposit was received');
        setTimeout(() => props.setStatus(''),4000);
        props.setShow(false);
      })();
  }  
  return(
    <>
    Email:<br/>
    <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
  Amount ($):<br/>
    <input type="" className="form-control" id="amount" placeholder="Deposit Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/>
    <br/>
    <button type="submit" className="btn btn-light" onClick={handle} disabled={!amount}>Deposit</button>
    </>
  )
}