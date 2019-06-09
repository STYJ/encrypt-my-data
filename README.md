# encrypt-my-data
[日本語]()
## Project Description
### Inspiration
The need for password managers is because we have too many accounts! We have too many accounts! Even taking a small subcategory of accounts, we still have too many, we don’t want to use the same password because if one account gets compromised, then all the accounts get compromised, so we need password managers to keep track of all the different passwords. However, centralization leaves databases vulnerable to attack. We need to trust the databases and companies. Malicious Employee may also be a problem...<br/>
### What it does
To solve this problem, we developed a password manager utilizing blockchain technology. Anyone can put their encrypted account password to the blockchain using this software, and retreive the decrypted plain text account password when as they need it.<br/>
### How we built it
The software encrypts passwords using the private key derived from a personal wallet (AES Encryption). The software uploads encrypted passwords as a transaction to a public blockchain. The software pulls the encrypted password from the blockchain and decrypt with private key to get the passwords for external use.<br/>
### Accomplishments that we're proud of
This project greatly enhance the security for people in storing their password. <br/>

### Built with
Vuejs, Javascript.<br/>

### Future work
* Use ECIES as the encryption scheme<br/>
* Implement an edit password function<br/>
* Allow also images and text to be encrypted and saved to the blockchain<br/>

### Authors
This work is done by Qiming He, Laige Peng, Simon Tan, Chang Yu, and Poming Lee.<br/>
This is for the world, Enjoy!<br/>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
