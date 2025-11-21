const sendgridMailProvider = {
  async send({ to, subject, text }) {
    console.log('[sendgrid] Email envoyé à', to, 'Sujet:', subject);
    console.log(text);
  },
};

const fakeMailProvider = {
  sentEmails: [],
  async send({ to, subject, text }) {
    this.sentEmails.push({ to, subject, text });
    console.log('[fake] Email enregistré en mémoire');
  },
};

class EmailService {
  constructor(mailProvider) {
    this.mailProvider = mailProvider;
  }

  async sendWelcomeEmail(user) {
    const subject = 'Bienvenue sur notre plateforme';
    const text = `Bonjour ${user.firstName},

Merci pour votre inscription.

À bientôt !`;

    await this.mailProvider.send({
      to: user.email,
      subject,
      text,
    });
  }
}

const user = { firstName: 'Kenan', email: 'kenan@example.com' };
const emailService = new EmailService(sendgridMailProvider);
emailService.sendWelcomeEmail(user);

const testUser = { firstName: 'Test', email: 'test@example.com' };
const testEmailService = new EmailService(fakeMailProvider);
testEmailService.sendWelcomeEmail(testUser).then(() => {
  console.log(fakeMailProvider.sentEmails);
});
