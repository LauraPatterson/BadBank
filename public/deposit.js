function Deposit(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState('');
  
    function validate(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        if (label === 'amount'){
          if (Number.isNaN(Number(field))) {
            alert('Not a number. Please enter a valid number');
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
          }
          else if ((Number(field)) < 1){
            alert('Cannot enter a number less that 1');
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
          }
        }

        return true;
    }
  
    function handle(){
      console.log(amount);
      if (!validate(amount,    'amount'))    return;
      if (!validate(email,    'email'))    return;

      const url = `/account/deposit/${email}/${amount}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
        if (!data.value){
          setStatus('Deposit failed.');
          setTimeout(() => setStatus(''),3000);
          setShow(true);
          return;
        } else {
          setStatus('Deposit was received');
          setTimeout(() => setStatus(''),3000);
        }
      })();

      setShow(false);
    }    
  
    function clearForm(){
      setAmount('');
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="success"
        txtcolor="black"
        header="Deposit"
        status={status}
        body={show ? (  
                <>
                Email:<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Amount:<br/>
              <div className="input-group-prepend">
              <span className="input-group-text">$</span>
                <input type="" className="form-control" id="amount" placeholder="Deposit Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/>
                </div>
                <br/>
                <button type="submit" className="btn btn-light" onClick={handle} disabled={!amount}>Deposit</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
                </>
              )}
      />
    )
  }