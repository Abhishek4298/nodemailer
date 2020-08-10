const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, './views'));
app.engine('handlebars', expressHandlebars({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.render('contact', { layout: false });
});

app.post('/send', (req, res) => {
	const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: 'absfake1998@gmail.com',
			pass: 'abs19@ks'
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	let mailOptions = {
		from: ' <absfake1998@gmail.com>',
		to: 'hiren.panchal@bacancytechnology.com,abhishek.bhavsar@bacancytechnology.com', //you can send email to the multiple gmail account
		subject: 'nodeMailer demo successful ', 
		text: 'nodemailer', 
		html: output, 
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		console.log("email sent successfully work!!")
		res.send("Your email is sent!!")
	});
});

app.listen(3000, () => console.log('Server started...'));