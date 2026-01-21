const nodemailer = require('nodemailer');

const getTransporter = () => {
  // Create a reusable transporter using SMTP config from env
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration missing. Set SMTP_HOST, SMTP_USER, SMTP_PASS in environment');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass
    }
  });
};

exports.sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }

    const transporter = getTransporter();

    const contactEmail = process.env.CONTACT_EMAIL || 'Daawateishq.restro@gmail.com';

    const mailOptions = {
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      subject: subject || `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
             <hr/>
             <p>${message.replace(/\n/g, '<br/>')}</p>`
    };

    const info = await transporter.sendMail(mailOptions);

    return res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Contact send error:', err);
    return res.status(500).json({ error: 'Failed to send contact message', details: err.message });
  }
};

exports.sendTestEmail = async (req, res) => {
  try {
    // Guard: only allow test when explicitly enabled in env
    if (process.env.ALLOW_TEST_EMAIL !== 'true') {
      return res.status(403).json({ error: 'Test emails are disabled. Set ALLOW_TEST_EMAIL=true to enable.' });
    }

    const transporter = getTransporter();
    const contactEmail = process.env.CONTACT_EMAIL || 'Daawateishq.restro@gmail.com';

    const info = await transporter.sendMail({
      from: `"Website Test" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      subject: 'Test email from Daawat-E-Ishq website',
      text: 'This is a test email sent from the Daawat-E-Ishq server to verify SMTP configuration.',
      html: '<p>This is a <strong>test</strong> email sent from the Daawat-E-Ishq server to verify SMTP configuration.</p>'
    });

    return res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Test email send error:', err);
    return res.status(500).json({ error: 'Failed to send test email', details: err.message });
  }
};
