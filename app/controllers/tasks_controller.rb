class TasksController < ApplicationController

	def create
		task = Task.new task_params
		if task.save
			render json: task
		else
			render json: {}
		end
	end

	private

	def task_params
		params.require(:task).permit(:title, :list_id, :order_in_list, :description)
	end
end
