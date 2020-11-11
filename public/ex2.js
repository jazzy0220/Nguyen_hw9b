const Data = {
    name: 'Nguyen',
    countries: [
        {
            name: "Vietnam" ,
            year: 2002
        },
        {
            name: "Canada" ,
            year: 2004
        },
        {
            name: "France" ,
            year: 2010
        }
    ]
}
document.getElementById("button").addEventListener("click", function(){ 
    fetch("http://localhost:3000/api/countries", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Data)
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById('result').textContent = result;
    })
    .catch(err => {
        console.error(err.message);
    });
}); 