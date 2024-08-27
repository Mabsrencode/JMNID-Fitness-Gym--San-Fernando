require("dotenv").config();
const nodemailer = require("nodemailer");

const contactEmail = (req, res) => {
  const RATE_LIMIT_INTERVAL = 60 * 60 * 1000;
  const RATE_LIMIT_COUNT = 3;
  const ipCountMap = new Map();
  const { firstName, lastName, subject, email, mobileNumber, message } =
    req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const now = Date.now();
  const ipCount = ipCountMap.get(ip) || { count: 0, timestamp: now };
  if (now - ipCount.timestamp < RATE_LIMIT_INTERVAL) {
    if (ipCount.count >= RATE_LIMIT_COUNT) {
      return res.status(429).send("Too many requests, Try again later.");
    }
    ipCount.count++;
  } else {
    ipCount.count = 1;
    ipCount.timestamp = now;
  }
  ipCountMap.set(ip, ipCount);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let messageHtml = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">
    <div style="background-color: #151516; color: #f9f9f9;">
    <center><br><br>

      <a href="mabsrencode.com"><img width="150px" src="https://mabsrencode.com/images/logo-light.png" alt="logo"></a><br>
      <p style="font-family: 'Teko', sans-serif; color: #f9f9f9; font-weight: 700;">Front-End Developer</p><br><br>
      <h1 style="font-family: 'Teko', sans-serif; color: #f9f9f9; font-weight: 400;">A Contact Request from <strong>${
        req.body.firstName
      }  ${req.body.lastName}.</strong>
      </h1>
      <br><br>
    </center></div><br><br>
    Name: ${`${req.body.firstName}  ${req.body.lastName}`}<br>Phone Number: ${
    req.body.mobileNumber
  }<br><br>Message: ${req.body.message}`;

  const mailOptions = {
    from: `Mabsrencode Notification <mabsren@mabsrencode.com>`,
    to: process.env.GMAIL_USER,
    subject: `Message from: ${req.body.email}: ${req.body.subject}`,
    html: messageHtml,
  };
  if (
    firstName == "" ||
    lastName == "" ||
    subject == "" ||
    email == "" ||
    mobileNumber == "" ||
    message == ""
  ) {
    return res.status(400).send("Please fill up all the input fields.");
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).send("Invalid Email.");
  } else if (isNaN(Number(mobileNumber))) {
    return res.status(400).send("Mobile Number must be numeric only.");
  } else {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("Something went wrong");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully.");
      }
    });
  }

  const autoResponseMessage = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet">
    <div style="background-color: #151516; color: #f9f9f9;"><center><br><br>
      <a href="mabsrencode.com"><img width="150px" src="https://mabsrencode.com/images/logo-light.png"></a><br>
      <br><br>
      <h3 style="font-family: 'Teko', sans-serif; color: #f9f9f9; font-weight: 400;"><strong>Your email has been received!</strong></h3><br><br>
    </center></div><br><br>
    Thank you for contacting us. We will get back to you soon.`;

  const autoresponseMailOptions = {
    from: `Mabsrencode <${process.env.ADMIN_USER}>`,
    to: req.body.email,
    subject: `Thank you for your email ${req.body.firstName} ${req.body.lastName}.`,
    html: autoResponseMessage,
  };

  transporter.sendMail(autoresponseMailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending autoresponse email");
    } else {
      console.log("Autoresponse email sent: " + info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
};
module.exports = contactEmail;
