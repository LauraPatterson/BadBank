const { response } = require( "express" );

function AllData(){
  const [data, setData] = React.useState('');

  
  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));      
      });
  }, []);

  return (
    <Card
    txtcolor="black"
    header="All Data in Store"
    title="Track User Submissions"
    text= {data}
  />    
  );
}
