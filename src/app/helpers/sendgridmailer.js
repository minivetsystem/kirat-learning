import sgMail from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDGRID_SENDER_EMAIL;
const receiverEmail = process.env.SENDGRID_RECEIVER_EMAIL;

if (!apiKey || !senderEmail || !receiverEmail) {
  throw new Error(
    "SendGrid email configuration is missing in environment variables"
  );
}

sgMail.setApiKey(apiKey);

export const sendContact = async (formData) => {
  const { name, email, phone, message, organizationType, organizationName } =
    formData;

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
        ${
          organizationType
            ? `<p><strong>${
                organizationType.charAt(0).toUpperCase() +
                organizationType.slice(1)
              } Name:</strong> ${organizationName || "Not provided"}</p>`
            : ""
        }
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
  const {
    name,
    email,
    phone,
    DOB,
    course,
    state,
    city,
    file,
    identity,
    consent,
  } = formData;

  console.log("Preparing registration email for:", email);

  try {
    const msg = {
      to: receiverEmail,
      from: senderEmail,
      replyTo: email,
      subject: `New Registration Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; text-align: center; margin-bottom: 30px;">New Registration Submission</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #555; margin-top: 0;">Personal Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
                  name || "Not provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
                  email || "Not provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
                  phone || "Not provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Date of Birth:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
                  DOB || "Not provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Identity:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${
                  identity || "Not provided"
                }</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #555; margin-top: 0;">Course & Location Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Course:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${
                  course || "Not provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>State:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${
                  state || "Not provided"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>City:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${
                  city || "Not provided"
                }</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #fff5f5; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #555; margin-top: 0;">Additional Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>File Uploaded:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${
                  file && file.name
                    ? `${file.name} (${Math.round(file.size / 1024)}KB)`
                    : "No file uploaded"
                }</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Consent Given:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${
                  consent === "true" ? "Yes" : "No"
                }</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">Registration submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Handle file attachment if present and not too large
    if (file && file.size > 0 && file.size <= 10 * 1024 * 1024) {
      try {
        console.log("Processing file attachment:", file.name, file.size);

        // Convert file to buffer for attachment
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        msg.attachments = [
          {
            content: buffer.toString("base64"),
            filename: file.name,
            type: file.type || "application/octet-stream",
            disposition: "attachment",
          },
        ];

        console.log("File attachment prepared successfully");
      } catch (fileError) {
        console.error("File attachment error:", fileError);
        // Continue without attachment if file processing fails
        console.log("Continuing without file attachment");
      }
    } else if (file && file.size > 10 * 1024 * 1024) {
      console.log("File too large for email attachment:", file.size);
    }

    console.log("Sending email via SendGrid...");
    const response = await sgMail.send(msg);
    console.log("SendGrid response:", response[0]?.statusCode);

    return response;
  } catch (error) {
    console.error("SendGrid registration error:", {
      message: error.message,
      code: error.code,
      response: error.response?.body,
    });

    // Provide more specific error messages
    if (error.code === 401) {
      throw new Error("SendGrid authentication failed. Please check API key.");
    } else if (error.code === 403) {
      throw new Error(
        "SendGrid access forbidden. Please check sender verification."
      );
    } else if (error.code === 413) {
      throw new Error("Email too large. Please try with a smaller file.");
    } else if (error.code >= 500) {
      throw new Error(
        "SendGrid service temporarily unavailable. Please try again later."
      );
    }

    throw new Error(error.message || "Failed to send registration email");
  }
};
