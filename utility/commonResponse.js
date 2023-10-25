
const apiErrorRes=(res,message,code,error) =>{
    console.log({
        IsSuccess:false,
        ResponseStatusCode:code,
        Message:message,
        Error:error

    });
    return res.status(code).send({
        IsSuccess:false,
        ResponseStatusCode:code,
        Message:message,
        Error:error

    })
}


const apiSuccessRes=(res,message,code,error,data) =>{ 
    return res.status(code).send({
        IsSuccess:true,
        ResponseStatusCode:code,
        Message:message,
        Error:error,
        data:data

    })
}

module.exports={apiErrorRes,apiSuccessRes}