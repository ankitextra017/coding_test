const express = require("express");
const axios = require("axios");
const app = express();
const apiUrl = "https://jsonkeeper.com/b/N9OS";

app.get("/myAPIData", (req, res) => {
    axios.get(apiUrl).then((result) => {
        const dataList = Object.assign([], result.data); //data getting as array
        dataList.map((obj) => {
            let dayCountStamp = (new Date().getTime() - new Date(obj.createdAt).getTime()) / (24 * 60 * 60 * 1000);
            console.log(Math.floor(dayCountStamp));
            obj.isPrime = isPrime(Math.floor(dayCountStamp));
        });
        res.status(200).json({'status': 'Success', 'result': {'allUsers': dataList, 'taggedUsers': dataList.filter((x) => !!(x.tag))}})
    })
    .catch((err) => {
        console.log(err);
        res.status(err.status).json({'status': 'Failure', 'message': err.message})
    })
})

const isPrime = (num) => {
    let sqrtnum=Math.floor(Math.sqrt(num)), prime = num != 1;
    for(let i=2; i<sqrtnum+1; i++) {
        if(num % i == 0) {
            prime = false;
            break;
        }
    }
    return prime;
}

app.get("/", (req, res) => {
    res.send(200);
})

app.listen(5000, () => {
    console.log("App Running on 5000 Port");
})