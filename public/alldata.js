function AllData() {
  const [data, setData] = React.useState('');

  const ctx = React.useContext(UserContext);
  console.log(JSON.stringify(ctx));

  React.useEffect(() => {
      fetch('/account/all')
      .then(response => response.json())
      .then(result => {
        console.log(JSON.stringify(result));
        setData(result);
      });
  },[]);

    // create card for each account
  console.log(data);
  let map1 = [];
  if(data){
  map1 = data.map((account) =>
  <Card
  txtcolor="black"
  header= {account.name}
  title={account.email}
  text= {`Password: ${account.password} \nBalance: ${account.balance}`}
/>);
  }
  return (map1);
}
