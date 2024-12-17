const reportCreationEmail = (name, report, post) => `<html>
<body>
  <h1>Your Report Has Been Created</h1>
  <p>Dear ${name},</p>
  <p>Your report has been successfully created. Here are the details:</p>
  <h2>Report Details</h2>
    <ul>
        <li><strong>Reason:</strong> ${report.reason}</li>
        <li><strong>Description:</strong> ${report.description}</li>
    </ul>
    <h2>Post Details</h2>
    <ul>
        <li><strong>Title:</strong> ${post.title}</li>
        <li><strong>Description:</strong> ${post.description}</li>
    </ul>
    <h2>Post Photos</h2>
    <ul>
        ${post.photos
          .map((photo) => `<li><img src="${photo.url}" alt="Post photo" /></li>`)
          .join('')}
    </ul>
  <br>
  <p>Feel free to reach out to us if you have any questions or need assistance.</p>
  <p>Best regards,<br> The Roomy Team</p>
</body>
</html>`;

// Function to render the email template with dynamic data
export const renderReportCreationEmail = (username, report, post) => {
  return reportCreationEmail(username, report, post);
};
