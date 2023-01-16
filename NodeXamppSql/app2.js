
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'shaarvi@123';
const someOtherPlaintextPassword = 'not_bacon';
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        const value =hash
        console.log(value)
        bcrypt.compare(myPlaintextPassword , '$2b$10$s9SySlh0rfOpopJG4nkzv.L0BZlIZ/ZzPK.exMPZ0P.2caKvBQ6Ny', function(err, result) {
            console.log(result)
        });
    });
   
});

