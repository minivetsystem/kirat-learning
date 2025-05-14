import nodemailer from "nodemailer";
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
