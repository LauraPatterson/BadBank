function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor='light'
      txtcolor='black'
      header='Withdraw'
      status={status}
      body={
        show ?
          <WithdrawForm setShow={setShow} setStatus={setStatus} /> :
          <WithdrawMsg setShow={setShow} /> }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type='submit'
        className='btn btn-light'
        onClick={() => props.setShow(true)}
      >
        Make another withdrawal
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [errors, setError] = React.useState('');

  function validate(field, label) {
    setError('');
    if (!field) {
      props.setStatus('Error: ' + label +' is blank');
      setTimeout(() => props.setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handle() {
    if (!validate(email, 'email')) return;
    if (!validate(amount, 'amount')) return;

    const url = `/account/withdraw/${email}/${amount}`;

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
        props.setStatus('Withdrawal was processed');
        setTimeout(() => props.setStatus(''),4000);
        props.setShow(false);
      })();
  }
  return (
    <>
      Email:
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
      Amount ($):
      <br />
      <input
        type='text'
        className='form-control'
        id='amount'
        placeholder='Withdraw Amount'
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <div style={{ color: 'red' }}>{errors}</div>
      <br />
      <button
        type='submit'
        className='btn btn-light'
        onClick={handle}
        disabled={!amount}
      >
        Withdraw
      </button>
    </>
  );
}
