class TasksController < ApplicationController

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

	private

	def task_params
		params.require(:task).permit(:title, :list_id, :order_in_list, :description, :status, :user_id)
	end
end
