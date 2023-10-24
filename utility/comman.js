async function yyyymmdd(fromDate) {
    fromDate = fromDate.split('-');
    return `${fromDate[2]}-${fromDate[0]}-${Number(fromDate[1])} 00:00:00`;

}
async function logChunks(readable) {
    for await (const chunk of readable) {
      console.log(chunk);
    }
  }
async function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
       return false;
    }else{
       return true;
    }
  }
async function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

  module.exports={IsEmail,addDays}