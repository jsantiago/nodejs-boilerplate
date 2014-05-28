### Initial setup

    vagrant up
    vagrant ssh
    cd /vagrant
    npm install
    bower install
    cp config.json.example config.json

### Configuring authentication

* [Twitter][twitter-dev]
* [Facebook][facebook-dev]
* [Google][google-dev]

### Building

Grunt vs Gulp? Why not both? After building, running `./app.js` starts Express. Static content is served by [Nginx][].

### Further Reading

* [Vagrant][]
* [ExpressJS][]
* [Nginx][]
* [Passport][]
* [Bootstrap][]
* [Font Awesome][fontawesome]
* [Grunt][]
* [Gulp][]
* [Mongoose][]
* [MongoDB][]
* [Bower][]
* [Consolidate][]
* [Swig][]

[vagrant]: http://vagrantup.com/
[twitter-dev]: https://apps.twitter.com/
[facebook-dev]: https://developers.facebook.com/apps/
[google-dev]: https://console.developers.google.com/project
[expressjs]: http://expressjs.com/
[passport]: http://passportjs.org/
[bootstrap]: http://getbootstrap.com/
[fontawesome]: http://fortawesome.github.io/Font-Awesome/
[grunt]: http://gruntjs.com/
[gulp]: http://gulpjs.com/
[mongoose]: http://mongoosejs.com/
[mongodb]: http://www.mongodb.org/
[bower]: http://bower.io/
[consolidate]: https://github.com/visionmedia/consolidate.js/
[swig]: http://paularmstrong.github.io/swig/
[nginx]: http://wiki.nginx.org/Main
