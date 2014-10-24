class User < ActiveRecord::Base

	has_secure_password
	has_many :projects
	validates :username, :email, presence: true
	
end
