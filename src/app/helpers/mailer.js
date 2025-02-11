import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/app/models/contactModel";
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

// export const sendContactEmail = async ({name, email, subject, text}) => {

// }

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "ReSET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 3600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "856a54cd444b0c",
        pass: "50d2f0209ca87f",
      },
    });

    const mailOPtions = {
      from: "dipsundarjana@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset your Password", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Click <a href='${
        process.env.DOMAIN
      }/verify-email?token=" + ${hashedToken} + "'>here</a> to ${
        emailType === "VERYFY" ? "verify your email" : "reset your password"
      }
            or copy and paste this link in your browser: ${
              process.env.DOMAIN
            }/verify-email?token=" + ${hashedToken}
            </p>`,
    };

    const info = await transport.sendMail(mailOPtions);

    return info;

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendContact = async ({ name, email, phone, massage }) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "856a54cd444b0c",
        pass: "50d2f0209ca87f",
      },
    });

    const mailOPtions = {
      from: "dipsundarjana@gmail.com", // sender address
      to: "dipsundarjana@gmail", // list of receivers
      subject: `You have a new message from ${name}`, // Subject line
      text: `${massage}`, // plain text body
      html: `<p>Name : ${name}</p><p>Email : ${email}</p><p>Phone : ${phone}</p><p>Massage : ${massage}</p>`,
    };

    const info = await transport.sendMail(mailOPtions);

    return info;

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error(error.message);
  }
};
