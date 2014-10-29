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
		project.user_id = get_current_user_id
		if project.save
			# Create a default member with the current user
			member = Member.new
			member.user_id = get_current_user_id
			member.project_id = project.id
			member.save
			render json: project
		else
			render json: {}
		end
	end

	def update
		project = Project.find params[:id]
		if project.update project_params
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
