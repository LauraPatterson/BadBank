function AllDataRaw() {
    const [data, setData] = React.useState('');
  
    const ctx = React.useContext(UserContext);
    console.log(JSON.stringify(ctx));
  
    React.useEffect(() => {
        fetch('/account/all')
        .then(response => response.json())
        .then(result => {
          console.log(JSON.stringify(result));
          setData(JSON.stringify(result));
        });
    },[]);
  
    return (
        <Card
          txtcolor="black"
          header="All Data in Store"
          title="Track User Submissions"
          text= {data}
        />
    );
  }