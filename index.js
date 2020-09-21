const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

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
	<p>Packleader team call</p>
    <h3>Join meeting</h3>
    <ul>  
			<li>Daily standup call 10:30 am URL: ${req.body.standupCall}</li>
			<li>6:30 pm call URL: ${req.body.secondCall}</li>
      <li>7.00 pm Client call URL: ${req.body.clientCall}</li>
    </ul>
	`;

	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,

		//for your gmail setup
		//write your email and password 
		//Go to you google account and goto security > Less secure app access: on
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
		to: 'abhibhavsar1998@gmail.com', //you can send email to the multiple gmail account
		//	to: 'viren.gediya@bacancytechnology.com,sachin.patel,  shivam.pande@bacancytechnology.com, amit.chhatbar@bacancytechnology.com, abhishek.bhavsar@bacancytechnology.com, avani.j.patel@bacancytechnology.com, hardik.thakar@bacancytechnology.com, hiren.panchal@bacancytechnology.com, meet.patel@bacancytechnology.com, mokshit.shah@bacancytechnology.com, riddhi.pujara@bacancytechnology.com, tushar.hirpara@bacancytechnology.com', //you can send email to the multiple gmail account

		subject: 'Daily standup call 10.30 ',
		text: 'Join the call',
		html: output,
	};

	// cron.schedule('00 30 11 * * 1-5') mon-fri at 10:28 am, 
	// Used 24 Hours clock format and mail sent mon-fri
	// For the first daily standup call @10.30 am

	const callOne = cron.schedule('00 28 10 * * *', () => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			console.log("email sent successfully work!!")
			res.send("Your email is sent!!")
		});
	})

	// For the Second call @6.30 pm
	const callSecond = cron.schedule('00 58 17 * * *', () => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			console.log("email sent successfully work!!")
			res.send("Your email is sent!!")
		});
	})

	// For the Second call @7.00 pm
	const callThird = cron.schedule('00 58 18 * * *', () => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			console.log("email sent successfully work!!")
			res.send("Your email is sent!!")
		});
	})

	callOne.start();
	callSecond.start();
	callThird.start();
});

app.listen(3000, () => console.log('Server started...'));