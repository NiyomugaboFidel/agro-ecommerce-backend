import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, 
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 5 * 60 * 1000,
  socketTimeout: 5 * 60 * 1000,
  debug: true,
  logger: true
});


export const sendEmail = async (dto) => {
  const { sender, recipients, subject, message,data } = dto;
  const htmlMessage =data.htmlMessage;
  const mailOptions = {
    from: `${sender.name} <${sender.address}>`,
    to: recipients.map(recipient => `${recipient.name} <${recipient.address}>`).join(", "),
    subject,
    text: message, 
    html: htmlMessage,
  };

  return await transport.sendMail(mailOptions);
};
