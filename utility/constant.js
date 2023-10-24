
const EMAIL_PLAN_TYPE={
   DAILY:"daily",
   BULK:"bulk"
}
const ServerStatusCode={
    NOT_EXIST_CODE:403,
    NOT_VALID_CODE:401,
    SUCCESS_CODE:200,
    BAD_REQUEST:400,
    UNPROCESSABLE:422
}

const CommonErrorMessage={
    SomethingError:"something went wrong please try again"
}

const CURD_MESSAGE={
    fetch:"Record successfully fetched",
    update:"Record successfully updated",
    create:"Record successfully created",
    delete:"Record successfully created",


}
const STATUS={    
    pending:"pending"
}

module.exports={
    EMAIL_PLAN_TYPE,
    CommonErrorMessage,
    ServerStatusCode,
    STATUS,
    CURD_MESSAGE
}


