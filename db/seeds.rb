# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

project = Project.create(title: 'First project', user_id: 1)

list1 = List.create(title: 'Backlog', project_id: project.id, order_in_project: 1)
5.times do |i|
	Task.create(title: "Task #{i} #{list1.title}" , list_id: list1.id, order_in_list: i)
end

list2 = List.create(title: 'Doing', project_id: project.id, order_in_project: 2)

4.times do |i|
	Task.create(title: "Task #{i} #{list2.title}" , list_id: list2.id, order_in_list: i+1)
end
list3= List.create(title: 'Done', project_id: project.id, order_in_project: 3)

6.times do |i|
	Task.create(title: "Task #{i} #{list3.title}" , list_id: list3.id, order_in_list: i+1)
end
