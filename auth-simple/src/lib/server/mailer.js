import nodemailer from 'nodemailer';
import 'dotenv/config';

const SMTP_HOST = process.env['SMTP_HOST'];
const SMTP_PORT = process.env['SMTP_PORT'];
const SMTP_USER = process.env['SMTP_USER'];
const SMTP_PASS = process.env['SMTP_PASS'];
const SMTP_FROM_EMAIL = process.env['SMTP_FROM_EMAIL'];

const transporterOptions = {
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: false
};

if (SMTP_USER && SMTP_PASS) {
	transporterOptions.auth = {
		user: SMTP_USER,
		pass: SMTP_PASS
	};
}

const transporter = nodemailer.createTransport(transporterOptions);

export const sendMail = async (to, subject, html) => {
	if (!SMTP_HOST || !SMTP_PORT || !SMTP_FROM_EMAIL) {
		return { error: true, message: "❗️ SMTP credentials not provided. Can't send email." };
	}
	const options = {
		from: SMTP_FROM_EMAIL,
		to,
		subject,
		html
	};
	await transporter.sendMail(options);

	return { error: false, message: '✅ Email sent.' };
};
