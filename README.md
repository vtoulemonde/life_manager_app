# Life Manager

Life Manager allow you to manage all projects in your life. You can create project, define list in a project and add tasks on each list.
You can also reorder the task by a simple drag-and-drop.
Members can be affected to each task. That will allow each user to display an overview of all the task affected to him.


## Technologies used

* Ruby on Rails
* PostgreSQL
* Rspec
* AngularJS
* Bootstrap
* UI Bootstrap
* Restangular
* Drag-and-drop-list

## Heroku URL

https://calm-beach-3737.herokuapp.com/

## Trello/Pivotal URL

(to define)

## Deployment instructions

Download and install by running:
```
bundle install
```
Install the database by running:
```
rake db:create db:migrate
rake db:seed (to have some seed data)
```
Run the server with:
```
rails s
```
Go on the app and connect with guest@mail.com / password to see the seed data


### Run test
```
rspec
```
