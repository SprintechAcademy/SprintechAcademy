import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@sprintechacademy.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function sendAccessCode(email: string, code: string, nombre?: string) {
  const saludo = nombre ? `Hola ${nombre.split(' ')[0]},` : 'Hola,'

  await getResend().emails.send({
    from: `Sprintech Academy <${FROM}>`,
    to: email,
    subject: `Tu código de acceso: ${code}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#141414;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding:36px 40px 0;text-align:center;">
            <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
              Sprintech<span style="font-style:italic;font-weight:400;font-size:15px;color:rgba(255,255,255,0.6);">Academy</span>
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.55);font-size:14px;">${saludo}</p>
            <p style="margin:0 0 28px;color:rgba(255,255,255,0.8);font-size:15px;line-height:1.6;">
              Aquí está tu código de acceso a la plataforma. Válido por <strong style="color:#ffffff;">10 minutos</strong>.
            </p>

            <!-- Code block -->
            <div style="background:#1E1E1E;border:1px solid rgba(200,241,53,0.2);border-radius:12px;padding:28px;text-align:center;margin-bottom:28px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);font-family:'Helvetica Neue',Arial,sans-serif;">Tu código</p>
              <p style="margin:0;font-size:44px;font-weight:700;letter-spacing:0.18em;color:#C8F135;font-family:'Helvetica Neue',Arial,sans-serif;">${code}</p>
            </div>

            <p style="margin:0;color:rgba(255,255,255,0.35);font-size:13px;line-height:1.6;">
              Si no solicitaste este código, puedes ignorar este correo. Nadie más puede acceder a tu cuenta sin él.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:0 40px 32px;">
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin-bottom:24px;">
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);text-align:center;">
              © 2026 Sprintech Academy · Cali, Colombia
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}

export async function sendEnrollmentConfirmation(
  email: string,
  nombre: string,
  programNombre: string,
) {
  await getResend().emails.send({
    from: `Sprintech Academy <${FROM}>`,
    to: email,
    subject: `¡Estás inscrito/a en ${programNombre}!`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0B0B0B;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0B;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#141414;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">
        <tr>
          <td style="padding:36px 40px 0;text-align:center;">
            <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
              Sprintech<span style="font-style:italic;font-weight:400;font-size:15px;color:rgba(255,255,255,0.6);">Academy</span>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 16px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.02em;">
              ¡Bienvenido/a, ${nombre.split(' ')[0]}!
            </p>
            <p style="margin:0 0 24px;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;">
              Tu inscripción a <strong style="color:#C8F135;">${programNombre}</strong> fue exitosa. Ya puedes acceder a la plataforma.
            </p>
            <a href="${APP_URL}/login" style="display:inline-block;background:#C8F135;color:#0B0B0B;font-weight:700;font-size:15px;padding:14px 32px;border-radius:9999px;text-decoration:none;letter-spacing:-0.01em;">
              Acceder a la plataforma →
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;">
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin-bottom:24px;">
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);text-align:center;">© 2026 Sprintech Academy</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}
