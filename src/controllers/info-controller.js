const info =(req, res)=>{
    return res.json({
        sucess :'true' ,
        message: 'API is live',

    })
}

module.exports={
    info
}