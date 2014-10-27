class User < ActiveRecord::Base

	has_secure_password
	has_many :projects, :dependent => :destroy
	has_many :members, :dependent => :destroy
	validates :username, :email, presence: true
	
end
