const express= require("express");
const app= express();

// also the fact that this users is kindof array which is collection of many user
const users=[{ 
    name: "John",
    kidneys: [{
        healthy: false
    }] // this is object under object 
}];

app.use(express.json());

app.get("/", function(req,res){
    const johnkidneys = users[0].kidneys; // i.e. first thing in the array and uski kidneys
    const numberofkidneys = johnkidneys.length; // means no of element in that array 
    let numberofhealthykidneys = 0;
    for (let i=0; i<johnkidneys.length;i++){
        if(johnkidneys[i].healthy) { // means is the john kidneys will be healtthy 
            numberofhealthykidneys= numberofhealthykidneys + 1;
        }
    }
    const numberofunhealthykidneys = numberofkidneys - numberofhealthykidneys;
    res.json( // this is the response we are going to get 
        {
            numberofkidneys,
            numberofhealthykidneys,
            numberofunhealthykidneys
        })
})


app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done"
    })
})



app.put("/", function(req, res){
    for (let i = 0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({}); // this means its a empty output

})


app.delete("/", function(req,res){
    if(isThereAtleastOneUnhealthyKidney()){
    const newKidneys = [];
    for(let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy:true 
            }) // this means that we are pushing newkidney inside whose one of the object healthy is true
        }
    } 
    users[0].kidneys = newKidneys;
    res.json({msg: "Done"})
    }
    else{
        res.status(411).json({
            msg:"You have no bad kidneys"
        });
    }
})



function isThereAtleastOneUnhealthyKidney(){
    let AtleastOneUnhealthyKidney=false;
    for(let i = 0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            AtleastOneUnhealthyKidney = true;
        }
    }
    return AtleastOneUnhealthyKidney // before I put this return in the above loop which is creating problems
}

app.listen(3001);