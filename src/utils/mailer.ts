import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const { GMAIL_USER, GMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
});

export default transporter;
