const twilio = require("twilio");

// Initialize Twilio client
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

const { sendEmail } = require("../config/mailer");

/**
 * Send SMS using Twilio (falls back to console.log if Twilio not configured)
 * @param {string} to - Phone number to send to
 * @param {string} body - Message body
 */
const sendSMS = async ({ to, body }) => {
  if (!twilioClient || !process.env.TWILIO_FROM) {
    console.log("[SMS] (fallback) To:", to, "Body:", body);
    return;
  }
  
  try {
    await twilioClient.messages.create({
      from: process.env.TWILIO_FROM,
      to,
      body,
    });
    console.log(`SMS sent to ${to}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw new Error("Failed to send SMS");
  }
};

/**
 * Send OTP via email with a nicely formatted template
 * @param {string} email - Recipient email address
 * @param {string} code - OTP code
 */
const sendEmailOtp = async (email, code) => {
  const expirationMinutes = process.env.OTP_EXP_MINUTES || 10;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .otp-code { 
          font-size: 24px; 
          font-weight: bold; 
          color: #2c7be5;
          margin: 20px 0;
          padding: 10px;
          background: #f9fafc;
          display: inline-block;
        }
        .footer { margin-top: 30px; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Your Verification Code</h2>
        <p>Please use the following code to verify your account:</p>
        <div class="otp-code">${code}</div>
        <p>This code will expire in ${expirationMinutes} minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <div class="footer">
          © ${new Date().getFullYear()} ${process.env.APP_NAME || 'Our App'}. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail({ 
      to: email, 
      subject: `Your ${process.env.APP_NAME || ''} Verification Code`.trim(), 
      html 
    });
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

/**
 * Send OTP via SMS
 * @param {string} phone - Recipient phone number
 * @param {string} code - OTP code
 */
const sendPhoneOtp = async (phone, code) => {
  const expirationMinutes = process.env.OTP_EXP_MINUTES || 10;
  const body = `Your ${process.env.APP_NAME || ''} verification code is ${code}. It expires in ${expirationMinutes} minutes.`.trim();
  
  await sendSMS({ to: phone, body });
};

module.exports = {
  sendSMS,
  sendEmailOtp,
  sendPhoneOtp
};