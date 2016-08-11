# [rbytr.co] (http://rbytr.co)
<div>
		<!-- Gitter -->
		<a href="https://gitter.im/rbytr/rbytr">
		  <img src="https://badges.gitter.im/rbytr/rbytr.svg" alt="Gitter" />
		</a>

		<!-- Twitter -->
		<a href="http://twitter.com/rbytrapp">
		  <img src="https://img.shields.io/twitter/follow/shields_io.svg?style=social&label=Follow&maxAge=2592000" alt="Twitter" />
		</a>
		
		<!-- Backers -->
		<a href="https://opencollective.com/rbytr">
		  <img src="https://opencollective.com/rbytr/backers/badge.svg" alt="Backers" />
		</a>
		
		<!-- Sponsors -->
		<a href="https://opencollective.com/rbytr">
		  <img src="https://opencollective.com/react-boilerplate/sponsors/badge.svg" alt="Sponsors" />
		</a>
</div>
![rbytr screenshot](https://s3.eu-central-1.amazonaws.com/rbytr-test/github-screen-1.jpg)

## How to contribute?
- Visit [rbytr.co](http://rbytr.co) to get an invite for early accessing the app.
- Join us on [mattermost.rbytr.co](http://mattermost.rbytr.co).
- Take a look at [CONTRIBUTING](https://github.com/rbytr/rbytr/blob/master/CONTRIBUTING.md).

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```


* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process.

```bash
$ npm install -g grunt-cli
```

## Downloading Rbytr
The recommended way to get Rbytr is to use git to directly clone the Rbytr repository:

```bash
$ git clone https://github.com/rbytr/rbytr.git rbytr
```

This will clone the latest version of the Rbytr repository to an **rbytr** folder.

## Quick Install
Once you've downloaded Rbytr and installed all the prerequisites, you're just a few steps away from starting to develop on Rbytr.

The first thing you should do is install the Node.js dependencies. Rbytr comes pre-bundled with a package.json file that contains the list of modules that are required by Rbytr. To learn more about the modules installed visit the npm & Package.json section.

To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

```bash
$ npm install
```

This command will install the dependencies needed for the Rbytr to run.
Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules required by Rbytr. Propably you need to run the bower install command on your own (front-end modules will be located at **public/lib**):

```bash
$ bower install
```

## Running Rbytr

* Make sure mongodb is running
* Copy conf/env/test.js to conf/env/development.js:

```bash
$ scp conf/env/test.js conf/env/development.js 
```

* Run Rbytr using Grunt:

```bash
$ grunt
```
