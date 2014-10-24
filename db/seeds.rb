# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

project = Project.create(title: 'First project', user_id: 1)

List.create(title: 'Backlog', project_id: project.id, order: 1)
List.create(title: 'Doing', project_id: project.id, order: 2)
List.create(title: 'Done', project_id: project.id, order: 3)
