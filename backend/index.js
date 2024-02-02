const express = require('express')

const app = express();

app.get('/',(req,res)=>{
     return res.status(200).json({
          message : "hi",
     })
})

app.listen(8080, () => {
     console.log(`Server on port 8080`)
})