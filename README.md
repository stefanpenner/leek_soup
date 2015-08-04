# Smhw-frontend

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## In order to run your server locally

You will need to create a doorkeeper application from the rails console, who's `client_id` and `secret` correspond that one specified by your ember environment. Here's a sample, from your rails project directory:

`$ bundle exec rails console`

```ruby
app = Doorkeeper::Application.new(name: "ember", redirect_uri: "http://localhost:4000/",
                                  uid: "ec1f8f758294ef3838d5e178cc7c45454dd9fa75843dda5a131179c42accdca3",
                                  secret: "e460aac4c862e5452ec34f230c12dbacd15284a2fab3e5eeb4b6a6f73289ae65")
app.save
#=> true
```

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`


## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

If you want to forward the API calls to another server in your machine, you can use the `--proxy`
option.

* `ember server --proxy=http://localhost:3000`

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Edit the configuration present in `config/deploy.js`. You'll need to setup the configuration for
the AWS bucket where the compiled assets (js/css/fonts etc...) will be uploaded and the endpoint, 
port and secret of the redis server where the `index.html` will be uploaded.

Once it's done, you can deploy to production with the following command:

```
$ ember deploy -e production
```

After this command the current code is deployed and you can access it using a query string in the 
url: `smhw-admin.herokuapp.com?index_key=206e2be`

If you want to make the just uploaded version the default version for all users, you can promote
it with this command:

```
$ ember deploy:activate --revision smhw-frontend:206e2be -e production
```

### Deploying to AWS

To deploy to AWS you will first need to open up an ssh session to the host. 

```
ssh -L 6380:node01.redis.qa.smhw:6379 rails@qa-bastion.smhwdev.co.uk
```

This is only temporary as the ember-cli-deploy team are working on a solution for tunneling.

You will also need to add a env variable for the AWS Secret. Please ask Michael for the secret. 

To deploy to production:

```
$ ember deploy -e production
```

To deploy to beta:

```
$ DESTINATION=beta ember deploy -e beta
```

To deploy to qa:

```
$ DESTINATION=qa ember deploy -e qa
```

After this command the current code is deployed and you can access it using a query string in the 
url: `http://ember.smhwdev.co.uk/?index_key=206e2be`

If you want to make the just uploaded version the default version for all users, you can promote
it with this command:

```
$ ember deploy:activate --revision smhw-frontend:206e2be -e ENVIRONMENT

