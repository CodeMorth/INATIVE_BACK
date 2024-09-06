import transporter from "./mailer";

const loggo =
  "https://res.cloudinary.com/dt40q4sna/image/upload/v1719793540/logo_lsoshl.png"; // Ruta relativa a la imagen, asegúrate de que sea accesible

export const sendMail = (email: any, subject: any, username: any) => {
  transporter.sendMail({
    to: email,
    subject,
    html: `<div style="background:#2B3146; padding: 10px; width: 90%; max-width: 650px; margin: 0 auto;border-radius: 5px; font-family: 'Black Ops One', Arial, sans-serif;">
      <div style="width: 100%; display: grid; place-items: center;">        
        <h4 style="color: #94849C; font-size: 18px; text-align: center;">
          <span style="color: #F969AA; font-size: 22px;">${username}</span> Bienvenido  a Inative, donde podrás aprender nuevos idiomas con personas reales.
        </h4>        
      </div>
    </div>`,
  });
};
