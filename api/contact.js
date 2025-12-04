import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const { nome, email, mensagem } = req.body;

  // Validação do lado do servidor
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  // Validação de formato de email
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'O formato do email é inválido.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: 'desacork@gmail.com',
      subject: `Nova mensagem de contacto de ${nome}`,
      html: `<p>Olá, acabaste de receber uma nova mensagem do site!</p><br>
             <p><strong>Nome:</strong> ${nome}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensagem:</strong> ${mensagem}</p>`,
    });

    console.log('Mensagem enviada:', mail.messageId);

    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
    res.status(500).json({ message: 'Erro ao enviar a mensagem.' });
  }
}