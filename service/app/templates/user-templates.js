// Define the email template as a template string
const welcomeEmailTemplate = (name) => `<html>
<body>
  <h1>Welcome to Our Platform!</h1>
  <p>Dear ${name},</p>
  <p>Thank you for joining our platform. We are thrilled to have you on board!</p>
  <p>Here are a few things you can do:</p>
  <ul>
      <li>Explore our wide range of products/services.</li>
      <li>Customize your profile settings.</li>
  </ul>
  <p>Feel free to reach out to us if you have any questions or need assistance.</p>
  <p>Best regards,<br> The Roomy Team</p>
</body>
</html>`;

// Function to render the email template with dynamic data
export const renderWelcomeEmail = (name) => {
  return welcomeEmailTemplate(name);
};
