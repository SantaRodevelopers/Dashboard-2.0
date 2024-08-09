const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'springboot.developers@gmail.com', // Replace with your email
    pass: 'vzhv chsm xydx gtgt' // Replace with your generated app password
  }
});

app.post('/send-email', (req, res) => {
  const { subject, body } = req.body;

  const mailOptions = {
    from: 'springboot.developers@gmail.com', // Replace with your email
    to: 'sk2088458@gmail.com', // Replace with recipient email or make it dynamic sk2088458@gmail.com;rohitrk21122000@gmail.com
    subject: subject,
    html: body
   //;rohitrk21122000@gmail.com
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
