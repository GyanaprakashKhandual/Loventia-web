const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Loventia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Secure OTP for Loventia Registration",
      text: `Your Loventia verification code is: ${otp}\n\nThis code expires in 5 minutes.`,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loventia OTP Verification</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        
        body {
            font-family: 'Poppins', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .header {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .content {
            padding: 30px;
        }
        
        h1 {
            color: #2d3748;
            font-size: 22px;
            margin-top: 0;
            text-align: center;
        }
        
        .otp-container {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            margin: 25px 0;
        }
        
        .otp-code {
            font-size: 32px;
            font-weight: 600;
            letter-spacing: 3px;
            color: #4f46e5;
            margin: 15px 0;
        }
        
        .note {
            font-size: 14px;
            color: #64748b;
            text-align: center;
            margin: 20px 0;
        }
        
        .warning {
            background: #fff3f3;
            border-left: 4px solid #ff5252;
            padding: 12px;
            font-size: 13px;
            margin: 20px 0;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            font-size: 12px;
            color: #64748b;
        }
        
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 15px 0;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">LOVENTIA</div>
            <div>Account Verification</div>
        </div>
        
        <div class="content">
            <h1>Your One-Time Password (OTP)</h1>
            <p>Hello there,</p>
            <p>We received a request to verify your email address for your Loventia account. Please use the following verification code:</p>
            
            <div class="otp-container">
                <div style="font-size: 14px; margin-bottom: 10px;">Your verification code:</div>
                <div class="otp-code">${otp}</div>
                <div style="font-size: 13px;">(Valid for 5 minutes)</div>
            </div>
            
            <p>If you didn't request this code, you can safely ignore this email. Someone else might have entered your email address by mistake.</p>
            
            <div class="warning">
                <strong>Security tip:</strong> Never share this code with anyone, including Loventia support. We will never ask for it.
            </div>
            
            <p>Need help? <a href="mailto:support@loventia.com" style="color: #4f46e5;">Contact our support team</a></p>
        </div>
        
        <div class="footer">
            © ${new Date().getFullYear()} Loventia. All rights reserved.<br>
            <div style="margin-top: 8px;">
                <a href="#" style="color: #64748b; text-decoration: none; margin: 0 8px;">Privacy Policy</a>
                <a href="#" style="color: #64748b; text-decoration: none; margin: 0 8px;">Terms of Service</a>
            </div>
        </div>
    </div>
</body>
</html>
            `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOTPEmail;
