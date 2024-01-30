exports.contactTeamEmail = (
    name,
    email,
    message
) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Contact Form Confirmation</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }
  
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }
  
          .logo {
              max-width: 200px;
              margin-bottom: 20px;
          }
  
          .message {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
          }
  
          .body {
              font-size: 16px;
              margin-bottom: 20px;
          }
  
          .cta {
              display: inline-block;
              padding: 10px 20px;
              background-color: #FFD60A;
              color: #000000;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
          }
  
          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
          }
  
          .highlight {
              font-weight: bold;
          }
      </style>
  
  </head>
  
  <body>
      <div class="container">
          <img class="logo"
                  src="https://res.cloudinary.com/dnpkmocgf/image/upload/v1706551748/logo_j5v7dg.png" alt="Pizzeria Logo">
          <div class="message">Contact Form Confirmation</div>
          <div class="body">
              <p>Dear Contact handle Team please handle this message and respond to customer</p>
             
              <p>Here are the details and concern of user:</p>
              <p>Name: ${name}</p>
              <p>Email: ${email}</p>
              <p>Message: ${message}</p>
          </div>
      </div>
  </body>
  
  </html>`
}