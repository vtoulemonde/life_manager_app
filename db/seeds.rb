# If you want to create a new project on an other user, just put the email of that user in variable email
email = "guest@mail.com"
username = "guest"

user = User.find_by(email: email)
if !user
	user = User.create(username: username, email: email, password: 'password', password_confirmation: 'password')
end

project = Project.create(title: 'First project', user_id: user.id)
Member.create(user_id: user.id, project_id: project.id)

list1 = List.create(title: 'Backlog', project_id: project.id, order_in_project: 1)
5.times do |i|
	Task.create(title: "Task #{i} #{list1.title}" , list_id: list1.id, order_in_list: i+1)
end

list2 = List.create(title: 'Doing', project_id: project.id, order_in_project: 2)

4.times do |i|
	Task.create(title: "Task #{i} #{list2.title}" , list_id: list2.id, order_in_list: i+1)
end
list3= List.create(title: 'Done', project_id: project.id, order_in_project: 3)

6.times do |i|
	Task.create(title: "Task #{i} #{list3.title}" , list_id: list3.id, order_in_list: i+1)
end
