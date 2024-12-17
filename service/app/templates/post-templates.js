const postCreationTemplate = (name) => `<html>
<body>
  <h1>Your Post Has Been Created!</h1>
  <p>Dear ${name},</p>
  <p>Your post has been successfully created and will be reviewed by our team.</p>
  <p>You will receive an email once your post has been approved.</p>
  <br>
  <p>Feel free to reach out to us if you have any questions or need assistance.</p>
  <p>Best regards,<br> The Roomy Team</p>
</body>
</html>`;

// Function to render the email template with dynamic data
export const renderPostCreationEmail = (name) => {
  return postCreationTemplate(name);
};

// post approval email template
const postApprovalTemplate = (name, title) => `<html>
<body>
  <h1>Your Post Has Been Approved!</h1>
  <p>Dear ${name},</p>
  <p>Your post titled "${title}" has been approved and is now live on our platform.</p>
  <br>
  <p>Feel free to reach out to us if you have any questions or need assistance.</p>
  <p>Best regards,<br> The Roomy Team</p>
</body>
</html>`;
// Function to render the email template with dynamic data
export const renderPostApprovalEmail = (name, title) => {
  return postApprovalTemplate(name, title);
};

const postDeactivationTemplate = (name, title) => `<html>
<body>
  <h1>Your Post Has Been Deactivated!</h1>
  <p>Dear ${name},</p>
  <p>Your post titled "${title}" has been deactivated due to a violation of our community guidelines.</p>
  <br>
  <p>Feel free to reach out to us if you have any questions or need assistance.</p>
  <p>Best regards,<br> The Roomy Team</p>
</body>
</html>`;
// Function to render the email template with dynamic data
export const renderPostDeactivationEmail = (name, title) => {
  return postDeactivationTemplate(name, title);
};
