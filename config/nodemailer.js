// const nodemailer = require("nodemailer");

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     host: "smtp.sendpost.io",
//     port: 2525,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: "default@35995.sendpost.io", // generated ethereal user
//         pass: "k21H2jz8", // generated ethereal password
//     },
//     requireTLS: false,
//     debug: true,
//     logger: true,

// });


// const transferMail = async (from,to,subject,html) => {
//     // send mail with defined transport object


//     try {
//         let info = await transporter.sendMail({
//             from: from.emailid,
//             to: to,
//             subject: subject,
//             html: html,      
//         });
//         console.log("Message sent: %s", info.messageId);
//         return info.messageId;
//     } catch (e) {
//         console.log("======================", e)
//     }
// }

// module.exports ={transferMail};
