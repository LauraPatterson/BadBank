function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail] = React.useState('');
  const [amount, setAmount]     = React.useState('');
  const [errors, setError]      = React.useState('');
  const [user, setUser]      = React.useState('');

  function validate(field, label){
      setError('');
      const url = `/account/balance/${email}/`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        if(data.name === 'error'){
          alert(user.balance);
          return false;
        }
        setUser(data);
        console.log(data);
      })();
      if (!field) {
        setStatus('Error: ' + label);
        alert('Please enter withdrawal amount');
        setTimeout(() => setStatus(''),2000);
        return false;
      }
      console.log(field);
      if (label === 'amount'){
      if (Number.isNaN(Number(field))) {
        alert('Not a number. Please enter a valid number');
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      else if (parseInt(user.balance) < field) {
        alert('Insufficient funds');
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
    }
      return true;
  }

  function handle(){
    if (!validate(amount, 'amount'))    return;
    const url = `/account/withdraw/${email}/${amount}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      if (!data.value){
        setStatus('Withdraw failed.');
        setTimeout(() => setStatus(''),3000);
        setShow(true);
        return;
      }
    })();
    setStatus('Withdrawal was processed');
    setTimeout(() => setStatus(''),3000);
    setShow(false);
  }    

  function clearForm(){
    setAmount('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="Withdraw"
      status={status}
      body={show ? (  
              <>
              Email:<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Amount:<br/>
              <div className="input-group-prepend">
              <span className="input-group-text">$</span>
              <input type="text" className="form-control" id="amount" placeholder="Withdraw Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/>
              </div>
              <div style={{color:'red'}}>{errors}</div><br/>
              <button type="submit" className="btn btn-light" onClick={handle} disabled={!amount}>Withdraw</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make another withdrawal</button>
              </>
            )}
    />
  )
}
