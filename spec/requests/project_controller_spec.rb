require 'rails_helper'

describe "Project Controller" do 

    describe 'get the list of projects for the user login' do

        it 'renders json array of projects creating by the user' do
        	user = User.create(username: 'guest2', email: 'guest2@mail.com', password: 'password', password_confirmation: 'password')
        
        	post "sessions" , {:email => "guest2@mail.com", password: "password"}

        	Project.create(title: 'My new project', user_id: user.id)
        	Project.create(title: 'My second new project', user_id: user.id)
        	
          	get "/projects"

    		expect(response.body).to include("My new project")
    		expect(response.body).to include("My second new project")
        end

        it 'renders json array of projects not containing other user projects' do
        	user1 = User.create(username: 'guest', email: 'guest@mail.com', password: 'password', password_confirmation: 'password')
        	user2 = User.create(username: 'guest2', email: 'guest2@mail.com', password: 'password', password_confirmation: 'password')
        
        	post "sessions" , {:email => "guest@mail.com", password: "password"}

        	Project.create(title: 'My new project', user_id: user1.id)
        	Project.create(title: 'My second new project', user_id: user1.id)
        	Project.create(title: 'My other project', user_id: user2.id)
        	
          	get "/projects"

    		expect(response.body).not_to include("My other project")
        end

    end

    describe 'create a project' do

        it 'renders the json object created' do
            user = User.create(username: 'guest2', email: 'guest2@mail.com', password: 'password', password_confirmation: 'password')
        
            post "sessions" , {:email => "guest2@mail.com", password: "password"}
            post "projects", project: {title: "My creation project"}

            expect(response.body).to include("My creation project")
        end

        it 'renders empty object if no title specified' do
            user = User.create(username: 'guest2', email: 'guest2@mail.com', password: 'password', password_confirmation: 'password')
        
            post "sessions" , {:email => "guest2@mail.com", password: "password"}
            post "projects", project: {title: ""}

            expect(response.body).to eql("{}")
        end

        it 'create a member with the user connected' do
            user = User.create(username: 'guest2', email: 'guest2@mail.com', password: 'password', password_confirmation: 'password')
        
            post "sessions" , {:email => "guest2@mail.com", password: "password"}
            post "projects", project: {title: "My creation project"}
            id = JSON.parse(response.body)["id"]
            get "projects/#{id}/members"

            expect(response.body).to include("guest2")
        end

    end

    describe 'update a project' do

        it 'renders the json object updated' do
            user = User.create(username: 'guest2', email: 'guest2@mail.com', password: 'password', password_confirmation: 'password')
        
            post "sessions" , {:email => "guest2@mail.com", password: "password"}
            post "projects", project: {title: "My new project"}
            id = JSON.parse(response.body)["id"]
            put "projects/#{id}", project: {id: id, title: "My project updated"}

            expect(response.body).to include("My project updated")
        end

        it 'renders empty object if no title specified' do
            user = User.create(username: 'guest2', email: 'guest2@mail.com', password: 'password', password_confirmation: 'password')
        
            post "sessions" , {:email => "guest2@mail.com", password: "password"}
            post "projects", project: {title: "My new project"}
            id = JSON.parse(response.body)["id"]
            put "projects/#{id}", project: {id: id, title: ""}

            expect(response.body).to eql("{}")
        end

    end

    describe 'delete a project and render nothing' do

        it 'should delete the project' do
            user = User.create(username: 'guest2', email: 'guest2@mail.com', password: 'password', password_confirmation: 'password')
        
            post "sessions" , {:email => "guest2@mail.com", password: "password"}
            post "projects", project: {title: "My new project"}
            id = JSON.parse(response.body)["id"]
            delete "projects/#{id}"

            expect(response.body).to eql("{}")
        end

    end

end