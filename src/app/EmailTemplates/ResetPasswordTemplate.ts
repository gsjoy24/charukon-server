const ResetPasswordTemplate = (name: string, email: string, link: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #242D39; color: #ffffff; padding: 10px 20px; text-align: center; font-size: 24px;">
            Password Reset Request
        </div>
        <div style="padding: 20px; text-align: center;">
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Hi ${name},</p>
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">We received a request to reset your password. Click the button below to reset it. This link will be valid for 30 minutes.</p>
            <a href=${link} style="display: inline-block; background-color: #242D39; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
            <p style="font-size: 16px; color: #333333; margin-top: 20px;">If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
        </div>
        <div style="margin-top: 20px; padding: 10px; font-size: 12px; color: #777777; text-align: center;">
            <p>This email was sent to ${email}. If you received it by mistake, please disregard it.</p>
            <p>&copy; 2024 charukon. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
};

export default ResetPasswordTemplate;
