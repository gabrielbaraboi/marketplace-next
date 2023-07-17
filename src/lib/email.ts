import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

export class Emailer {
    private readonly transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });
    }

    public sendEmail(mailOptions: MailOptions) {
        return this.transporter.sendMail(mailOptions);
    }

    public notifyUserForPasswordReset(
        email: string,
        name: string,
        resetToken: string
    ) {
        this.sendEmail(newUserPasswordResetTemplate(email, name, resetToken));
    }

    public notifyUserForEmailVerification(
        email: string,
        name: string,
        verifyToken: string
    ) {
        this.sendEmail(newUserEmailVerifyTemplate(email, name, verifyToken));
    }
}

export const emailer = new Emailer();

export const newUserEmailVerifyTemplate = (
    email: string,
    name: string,
    verifyToken: string
) => {
    return {
        from: process.env.GMAIL_FROM,
        to: email,
        subject: 'Welcome to the Marketplace app! Confirm your email',
        text: `Welcome to the Marketplace app! Confirm your email`,
        html: `
        <h1>Welcome to the Marketplace app!</h1>
        <p>Hi ${name},</p>
        <p>Thanks for signing up for the Marketplace app! We're excited to have you as an early user.</p>
        <p>Before you can start using the app, you need to confirm your email address by clicking the link below:</p>
        <a href="${process.env.APP_URL}/verify-email/${verifyToken}">Confirm your email</a>
        <p>Thanks,</p>
        <p>The Marketplace app team</p>
        `,
    } as MailOptions;
};

export const newUserPasswordResetTemplate = (
    email: string,
    name: string,
    resetToken: string
) => {
    return {
        from: process.env.GMAIL_FROM,
        to: email,
        subject: 'Reset your password for the Marketplace app',
        text: `Reset your password for the Marketplace app`,
        html: `
        <h1>Reset your password for the Marketplace app</h1>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password for the Marketplace app. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link:</p>
        <a href="${process.env.APP_URL}/reset-password/${resetToken}">Reset your password</a>
        <p>Thanks,</p>
        <p>The Marketplace app team</p>
        `,
    } as MailOptions;
};
