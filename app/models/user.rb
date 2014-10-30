class User < ActiveRecord::Base

	has_secure_password
	has_many :projects, :dependent => :destroy
	has_many :members, :dependent => :destroy
	validates :username, :email, presence: true

	# has_many :projects, as: :projects_member, through: :members

	def projects_member
    	Project.joins(:members).where(:members => {:user_id => id})
	end
	
end
