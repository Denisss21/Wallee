import { MailSlurp } from 'mailslurp-client';
import * as dotenv from 'dotenv';
dotenv.config();

export const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY! });