const express = require("express") // this is always necessary to import the library and then you also need to do the npm install express to get the express on system


function sum(n){ // this is the function we created for back processing 
    let ans =0;
    for(let i =1; i<=n; i++){
        ans=ans+i;
    }
    return ans;
}


const app = express(); // this is just for syntax

app.get("/", function(req,res) { // here we tell that we are looking for  "/" which is by default like if we not write anything after 3000 then / is by default
    const n = req.query.n; // it means its looking for n as the input for our processing
    const ans = sum (n); // this is the processing we do 
    res.send("hi your ans is  " + ans) // this is output we give 
}) 

app.listen(3000);