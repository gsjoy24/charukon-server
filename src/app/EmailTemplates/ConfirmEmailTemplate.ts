const ConfirmEmailTemplate = (name: string, email: string, link: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #242D39;
            color: #ffffff;
            padding: 10px 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            display: inline-block;
            background-color: #242D39;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            margin-top: 20px;
            padding: 10px;
            font-size: 12px;
            color: #777777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Email Confirmation
        </div>
        <div class="content">
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Hi ${name},</p>
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Thank you for signing up! Please confirm your email by clicking the button below. This link is valid for 30 minutes. If you don't confirm within this time, you'll need to sign up again.</p>
            <a href="${link}" class="button">Confirm Email</a>
            <p style="font-size: 16px; color: #333333; margin-top: 20px;">If you did not sign up for this account, please ignore this email or contact support if you have questions.</p>
        </div>
        <div class="footer">
            <p>This email was sent to ${email}. If you received it by mistake, please disregard it.</p>
            <p>&copy; 2024 charukon. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
};

export default ConfirmEmailTemplate;
