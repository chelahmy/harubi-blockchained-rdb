# Harubi Blockchained Relational Database Framework
This Harubi Blockchained Relational Database (BRDB) Framework extends [Harubi](https://github.com/chelahmy/harubi) and [Harubi Front](https://github.com/chelahmy/harubi-front) with BRDB methodology.

The BRDB methodology and framework were originally designed by [Abdullah Daud](https://github.com/chelahmy) who was also the designer of Harubi and Harubi Front. He was hit by the Bitcoin blockchain which employs hashing to its fullest advantage. With BRDB, he wanted to take blockchain away from the controversial cryptocurrency field, even though he himself trades cryptocurrencies. He wrote [The Essence of Blockchain](https://chelahmy.blogspot.com/2020/03/the-essence-of-blockchain.html), [Everything has a Signature](https://chelahmy.blogspot.com/2020/03/everything-has-signature.html), and [The Eternal Wall of Grafittis](https://chelahmy.blogspot.com/2020/02/the-eternal-wall-of-grafittis.html).

## What is Blockchained Relational Database?
A blockchained relational database (BRDB) is an immutable relational database. It is immutable because any unintentional changes to the database will be expensive, or can be easily detected. Immutability is a deterrence to any mal-activity. A BRDB framework is a foundation for making any relational database immutable by hashing all activities on the database into a proof-of-work (PoW) blockchain. A PoW is an expensive hashing technique yet cheap to verify. Any changes to a data will always require the expensive PoW rehashing, so expensive as a deterrence to any mal-activity. A hash of a data can be taken as a valid representation of the data because a hash is almost always unique. In turn, a data may contain a hash of yet another data. Hence, a hash may represent a complex hashing structure of a large data set. A blockchain is a list of inclusive PoW hashes. An inclusive hash is a hash of a data that includes a hash of a previous data in the list, and so on. Altering an earlier data in the list will require rehashing the data and the next data one after the other in chronological order up to the latest data. An inclusive PoW is very expensive. Hence, everything a PoW blockchain represents is immutable. In a BRDB, all create-read-update-delete (CRUD) activities on the database will be represented in a blockchain. No data will ever be removed. All changes to any data will be kept in revisions. All users will be held accountable since every activity will be user signed. The relational nature of a dabase remains as is. All these short and concise description will be known as the BRDB methodology.

## Why do you need BRDB?
**Blockchain makes Bitcoin secured.** Since its inception in 2009 Bitcoin remains immutable even though it is an open database with no central control. The Bitcoin blockchain keeps the database immutable. The Bitcoin database keeps all token spending contracts which explicitly declares all token ownerships. If a blockchain can make the Bitcoin open financial database immutable then it can make any database immutable. There is no standard in making a database immutable. Blockchain can be the standard. Immutability is a security feature in enhancing a database confidentiality and integrity.

**Relational database is not secured.** A relational database has no security feature. A relational database system such as MySQL may implement access control but once a person has access to a database he has a control of the database. He can manipulate the database. If an impersonator has access to a database he can exert damage on to the database without a trace. A blockchain can help in detecting mal-activity. The compromised account can be identified.

**Trusting database and system administrators.** A team you trust may have its own agenda. Mal-activity on a database can be covered up. The team may bring your business down. Instead of trusting your team you should trust a blockchain. A database can easily be audited if it has a blockchain. A blockchain watchdog can trigger an alarm when a mal-activity took place. A blockchain can give you a peace of mind. CEOs and CTOs must take notes so that not to be a part of a suspicious team.

**Improving business valuation.** A database with high confidentiality and integrity is an important business foundation. Business owners must enforce a blockchain into every database since it reflects the businesses confidentiality and integrity. A blockchain can give shareholders values for money.

**This is A Work-In-Progress**


## Prerequisites
The tool-chain requires [npm](https://www.npmjs.com/) which comes together with [nodejs](https://nodejs.org/en/). However, they are not required for deployment. Npm will be used to download all other dependencies for the build tool-chain. [Git](https://git-scm.com/) is used to clone this repository, or it can just be downloaded here. The harubi back-end requires [PHP](https://www.php.net/) and [MySQL](https://www.mysql.com/), both during development and deployment. 

## Installation
Clone this repository into a folder
```
$ git clone https://github.com/chelahmy/harubi-blockchained-rdb.git my-project
$ cd my-project
```
and run the following command to download all dependencies.
```
$ npm i
```

### Database setup
Create a MySQL database and update the `src/backend/settings.inc` file with the new database settings. Then create the `user` table using the `src/backend/user.install.sql` script. Please refer to [harubi](https://github.com/chelahmy/harubi) for more details.

## How-to
Start the project.
```
$ npm start
```
The tool-chain will build the project into the `dist` folder and run it in a browser. Any changes made in the `src` folder will trigger the tool-chain to rebuild the project and push the changes to the browser in real time. Remove the `dist` folder to rebuild the project.

Begin with the `src/index.html`, `src/js/app.js`, `src/scss/app.scss` and `src/backend/serve.php` files. The resulting `dist` is standalone and can be deployed to a PHP and MySQL web server.

For building the project without watching the changes in the source files and triggering the browser
```
$ npm run build
```
