require 'rails_helper'

# require 'spec_helper'

describe 'title' do
  it 'should not be empty' do
    user = User.create(username: 'guest', email: 'guest@mail.com', password: 'password', password_confirmation: 'password')
    project = Project.create(user_id: user.id)
    project.should_not be_valid
    project.errors[:title].should include("can't be blank")
  end
end

describe 'user_id' do
  it 'should not be empty' do
    project = Project.create(title: 'My first project')
    project.should_not be_valid
    project.errors[:user_id].should include("can't be blank")
  end
end

describe 'to_hash' do
  it 'should be equal to' do
    project = Project.new(title: 'My first project', user_id: 1)
    expected = {
        "id" => project.id,
        "title" => "My first project",
        "user_id" => project.user_id,
        "created_at" => project.created_at.to_s,
        "updated_at" => project.updated_at.to_s
      }
    project.to_hash["id"].should == expected["id"]
    project.to_hash["title"].should == expected["title"]
    project.to_hash["user_id"].should == expected["user_id"]
  end
end

