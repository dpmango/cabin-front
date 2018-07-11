require('dotenv').config()
var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
	user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
	host: "cabin.com.sg",
	port: 21,
	localRoot: __dirname + '/build',
	remoteRoot: '/home/cabixiza/public_html',
	include: ['*', '**/*'],      // this would upload everything except dot files
	// include: ['*.php', 'dist/*'],
  exclude: ['build/**/*.map'],     // e.g. exclude sourcemaps
  deleteRemote: true              // delete existing files at destination before uploading
}

// use with promises
ftpDeploy.deploy(config)
	.then(res => {
    console.log('Deploy is ok')
  })
	.catch(err => {
    console.log(err)
  })

ftpDeploy.on('uploaded', function(data) {
	console.log(data);         // same data as uploading event
});
ftpDeploy.on('upload-error', function (data) {
	console.log(data.err); // data will also include filename, relativePath, and other goodies
});
