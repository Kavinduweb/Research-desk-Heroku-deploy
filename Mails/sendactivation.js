const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const{OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'


const id='224743397304-anbkbqn3fmsghc5ot2k6q1ogf0kg0del.apps.googleusercontent.com';
const secret ='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';
const ref_token='1//04RLrjvCW-mocCgYIARAAGAQSNwF-L9Ir9dmCjzf8dspWC3Q6JOimLDORshlqozqKvB-71oEjQ8ZnLZiCbnh-_hZW7QIZjjqLdQw';
const mail="kavindupro40@gmail.com";

const oauth2Client = new OAuth2(
    id,
    secret,
    ref_token,
    mail
)

const sendactivemail =(to,url)=>{
    oauth2Client.setCredentials({
        refresh_token:ref_token
    })
    const accessToken= oauth2Client.getAccessToken();
    const smtp = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:mail,
            clientId:id,
            clientSecret:secret,
            refreshToken:ref_token,
            accessToken

        }

    })

    const mainotion={
        from:mail,
        to:to,
        subject:"active",
        html:`<h2> ${url}</h2>`
    }

    smtp.sendMail(mainotion,(err,info)=>{
        if(err) return err;
        return info
    })
}


module.exports = sendactivemail;