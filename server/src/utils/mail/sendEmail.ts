import nodemailer from 'nodemailer';

export const sendMail = async (email: string, url: string, subject: string) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Job-Tracker App 👻" <no-reply@jobtracker.com>',
    to: email,
    subject: subject,
    html: `
  <div style="font-family: Arial, sans-serif;">
    <h2>Reset Your Password</h2>
    <p>You requested a password reset. Click the link below to reset it:</p>
    <a href="${url}" style="background-color:#2563eb;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
      Reset Password
    </a>
    <p>This link expires in 1 hour.</p>
  </div>
`,
  });

  console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // view the email
};
