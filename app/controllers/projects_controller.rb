class ProjectsController < ApplicationController

	def index
		if current_user
			projects = current_user.projects
			render json: projects
		else 
			render json: []
		end
	end

	def create
		project = Project.new project_params
		project.user_id = current_user.id
		if project.save
			render json: project
		else
			render json: {}
		end
	end

	def destroy
		project = Project.find params[:id]
		project.destroy
		render json: {}
	end

	private

	def project_params
		params.require(:project).permit(:title)
	end
end
