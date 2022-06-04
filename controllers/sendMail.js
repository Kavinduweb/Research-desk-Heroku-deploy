const nodeMailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVER_CLIENT_ID,
    MAILING_SERVER_CLIENT_SECRET,
    MAILING_SERVER_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env


const oauth2Client = new OAuth2(
    MAILING_SERVER_CLIENT_ID,
    MAILING_SERVER_CLIENT_SECRET,
    MAILING_SERVER_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

//send mail notification

const sendEmail = (to, url, txt) => {
oauth2Client.setCredentials({
    refresh_token: MAILING_SERVER_REFRESH_TOKEN
})

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVER_CLIENT_ID,
            clientSecret: MAILING_SERVER_CLIENT_SECRET,
            refreshToken: MAILING_SERVER_REFRESH_TOKEN,
            accessToken


        }

    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'Activate your account',
        html:
        ` <div style="max-width:700px; margin:auto; border:6px solid #ddd"; padding:50px 20px; margin-left:30px>
            <h2 style="text-align: center; color:teal" >SLIIT Research Desk Staff Registration</h2>
        <p>Your Account has been created. Click the button below to activate</p>   
        <a href="${url}" style="background:crimson; text-decoration: none; color:white; padding:10px 20px">Activate</a>
        <p>If button doesn't work, Please click on the link below</p>
        <div>${url}</div>

        </div> 
        `

    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
       return infor
    })
}

module.exports = sendEmail