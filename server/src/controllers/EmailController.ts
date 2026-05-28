import { Request, Response } from "express";
import nodemailer from "nodemailer";

export async function sendReminderEmail(req: Request, res: Response) {
    const { customerEmail, customerName, dueDate } = req.body;

    const dueDateFormatted = new Date(dueDate).toLocaleDateString("pt-BR", {
        timeZone: "America/Recife",
    });

    const transporter = nodemailer.createTransport({
        host: process.env.GMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: customerEmail,
            subject: "Lembrete de devolução",
            html: `
                <!DOCTYPE html>
                <html lang="pt-BR">
                <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial,sans-serif;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding:40px 20px;">
                        <table width="560" cellpadding="0" cellspacing="0"
                          style="background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.1);">

                          <tr>
                            <td align="center" style="background:#2ecc8b; padding:40px 24px;">
                              <div style="font-size:36px; margin-bottom:8px;">📚</div>
                              <h2 style="color:#fff; font-size:24px; font-weight:700; margin:0;">
                                Lembrete de Devolução!
                              </h2>
                            </td>
                          </tr>

                          <tr>
                            <td style="padding:32px 28px; color:#333;">
                              <p style="margin:0 0 16px; font-size:15px;">
                                Olá, <strong>${customerName}</strong>!
                              </p>
                              <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#555;">
                                Passando para lembrar que você possui um livro com devolução
                                marcada para <strong style="color:#2ecc8b;">${dueDateFormatted}</strong>.
                                Não esqueça de devolvê-lo na biblioteca para evitar multas.
                              </p>
                              <div style="text-align:center; margin:28px 0;">
                                <a href="http://localhost:3000/"
                                  style="display:inline-block; background:#2ecc8b; color:#fff;
                                         text-decoration:none; padding:14px 32px; border-radius:999px;
                                         font-weight:700; font-size:14px;">
                                  Acessar Meus Empréstimos
                                </a>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td align="center"
                              style="border-top:1px solid #eee; padding:20px; font-size:12px; color:#888;">
                              <div>© 2026 Citi</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
            `,
        });

        return res.status(200).json({ message: "Email enviado" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao enviar email" });
    }
}