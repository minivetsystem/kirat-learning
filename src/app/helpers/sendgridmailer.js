import sgMail from "@sendgrid/mail";


const apiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDGRID_SENDER_EMAIL;
const receiverEmail = process.env.SENDGRID_RECEIVER_EMAIL;

if (!apiKey || !senderEmail || !receiverEmail) {
  throw new Error("SendGrid email configuration is missing in environment variables");
}

sgMail.setApiKey(apiKey);

export const sendContact = async (formData) => {
  const { name, email, phone, message, organizationType, organizationName } = formData;

  try {
    const msg = {
      to: receiverEmail,
      from: senderEmail,
      replyTo: email, 
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${organizationType ? `<p><strong>${organizationType.charAt(0).toUpperCase() + organizationType.slice(1)} Name:</strong> ${organizationName || "Not provided"}</p>` : ""}
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    const response = await sgMail.send(msg);
      
    return response;
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw new Error(error.message || "Failed to send email");
  }
};

export const sendRegisterEmail = async (formData) => {
  const { name, email, phone,  } = formData;

  try {
    const msg = {
      to: receiverEmail,
      from: senderEmail,
      replyTo: email, 
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
     
       
      `,
    };

    const response = await sgMail.send(msg);
      
    return response;
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw new Error(error.message || "Failed to send email");
  }
};
