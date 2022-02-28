import nodemailer from "nodemailer";
import config from "config";
import { logger } from ".";
import { User } from "../models";

const smtp = config.get<{
  host: string;
  port: number;
  from: string;
  auth: {
    user: string;
    pass: string;
  };
}>("smtp");
const origin = config.get<string>("origin");

const transporter = nodemailer.createTransport({
  pool: true,
  secure: true,
  ...smtp,
});

export function verifySmtp() {
  transporter.verify((err, _) => {
    err ? logger.error(err, "SMTP Error") : logger.info("Connected to SMTP");
  });
}

export async function sendVerificationEmail(payload: User & { _id: any }) {
  const { _id, email, verificationCode } = payload;
  transporter.sendMail(
    {
      from: `Authentication Fullstack Demo<${smtp.auth.user}>`,
      to: email,
      subject: "Please verify your email",
      text: `${origin}/verify/${_id}/${verificationCode}`,
      html: `Please click on the link below to verify your email.
    <br><br>
    ${origin}/verify/${_id}/${verificationCode}
    <br><br>
    If you did not create an account on Authentication Fullstack Demo you can ignore this email.
    <br><br>
    We hope to see you soon on our app!`,
    },
    (err, _) => {
      if (err) {
        logger.error(err, "Nodemailer Error");
        return false;
      }
      logger.info(`Verification email sent to ${email}`);
      return true;
    }
  );
}

export async function sendPasswordResetEmail(payload: User & { _id: any }) {
  const { email, passwordResetCode } = payload;
  transporter.sendMail({
    from: `Authentication Fullstack Demo<${smtp.auth.user}>`,
    to: email,
    subject: "Password reset email",
    text: `${origin}/password/${passwordResetCode}`,
    html: `Please click on the password reset link below.
  <br><br>
  ${origin}/password/${passwordResetCode}
  <br><br>
  If you did not ask to reset your password on Authentication Fullstack Demo you can ignore this email.
  <br><br>
  We hope to see you soon on our app!`,
  });
}
