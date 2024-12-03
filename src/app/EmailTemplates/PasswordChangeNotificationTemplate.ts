const PasswordChangeNotificationTemplate = (
  name: string,
  email: string,
  supportEmail: string,
) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed Successfully</title>
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
            Password Changed Successfully
        </div>
        <div class="content">
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Hi ${name},</p>
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Your password has been successfully changed. If you made this change, no further action is required.</p>
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">However, if you did not authorize this change, please contact our support team immediately at <a href="mailto:${supportEmail}" style="color: #0073e6;">${supportEmail}</a>.</p>
            <p style="font-size: 16px; color: #333333; margin-top: 20px;">For your security, we recommend that you regularly update your password and ensure it is strong and unique.</p>
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

export default PasswordChangeNotificationTemplate;
