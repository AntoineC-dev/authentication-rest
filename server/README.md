# Authentication API with Node.js, MongoDb & Typescript

IMPORTANT: Make sure to add you ".env" file to your .gitignore before publishing your version of this project.

## How to install

- Install all dependencies with "yarn install" or "npm install"
- You'll need a Working MongoDb database (Local or Atlas/Cloud)
- Create a .env file in the root of the project and populate it with all variables missing in config/default.ts
- Start the project with "yarn dev" or "npm run dev"

[Online RSA key generator](https://travistidwell.com/jsencrypt/demo/)

### How to test

Import the **postman_collection.json** in your Postamn app to run the tests yourself.
Remember to update the environnement variables in case you changed the host or port in the API.
Use your own email also :)

### SMTP configuration

If you don't have a valid SMTP you can use this config by nodemailer:

```javascript
let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
});
```

Then include it in the sendVerificationEmail callback from mailer.utils:

```javascript
(err, _) => {
  if (err) {
    logger.error(err, "Nodemailer Error");
    return false;
  }
  logger.info(`Preview  URL: ${nodemailer.getTestMessageUrl(info)}`); // Update this line
  return true;
};
```
