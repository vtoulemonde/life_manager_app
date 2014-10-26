class ProjectsController < ApplicationController

	def index
		if current_user
			projects = current_user.projects
			render json: projects
		else 
			render json: {}
		end
	end
end
