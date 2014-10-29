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

end