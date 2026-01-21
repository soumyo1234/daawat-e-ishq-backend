Email/SMTP setup

This project sends real contact emails from the website to your restaurant email. Configure SMTP credentials in the environment before starting the server.

Required environment variables (add to your .env in server/):

- SMTP_HOST=your.smtp.server.com
- SMTP_PORT=587
- SMTP_USER=your_smtp_user@example.com
- SMTP_PASS=your_smtp_password
- CONTACT_EMAIL=Daawateishq.restro@gmail.com   # destination address for site messages

Notes:
- The app will use SMTP_USER as the "from" address when sending messages.
- For Gmail SMTP you may need an app password and to enable less-secure access options as appropriate.

Usage:
- Endpoint: POST /api/contact
- Body (JSON): { name, email, phone, subject?, message }
- Response: { success: true, messageId } on success or { error } on failure

Security:
- Never commit SMTP credentials to source control. Use environment variables or a secrets manager.

If you want I can add a simple frontend contact form that posts to /api/contact and show success/error UI. I won't send test emails from my side.
