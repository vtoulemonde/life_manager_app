class TasksController < ApplicationController

	def index
		tasks = Task.where(user_id: get_current_user_id)
		lists = tasks.map{ |t| t.list}
		lists.uniq!
		projects = lists.map{ |l| l.project}
		projects.uniq!
		
		hash_tasks = {}
		tasks.each do |task|
			if !hash_tasks.has_key? task.list_id
				hash_tasks[task.list_id] = []
			end
			hash_tasks[task.list_id] << task.to_hash
		end

		hash_lists = {}
		lists.each do |list|
			if !hash_lists.has_key? list.project_id
				hash_lists[list.project_id] = []
			end
			my_list_as_hash = list.to_hash
			my_list_as_hash["tasks"] = hash_tasks[list.id]
			hash_lists[list.project_id] << my_list_as_hash
		end

		result_hash = []
		projects.each do |project|
			puts project
			my_project_as_hash = project.to_hash
			my_project_as_hash["lists"] = hash_lists[project.id]
			result_hash << my_project_as_hash
		end

		render json: result_hash.to_json

	end

	def create
		task = Task.new task_params
		if task.save
			render json: task
		else
			render json: {}
		end
	end

	def destroy
		task = Task.find params[:id]
		task.destroy
		render json: {}
	end

	def update
		task = Task.find params[:id]
		if task.update task_params
			render json: task
		else
			render json: {}
		end
	end

	# def get_all_tags_project
	# 	# Task.find(params[:project_id])
	# end

	private

	def task_params
		params.require(:task).permit(:title, :list_id, :order_in_list, :description, :status, :user_id, :tag)
	end
end
