class ListsController < ApplicationController

	def index
		lists = List.where(project_id: params[:project_id])
		render json: lists.to_json(include: :tasks)
	end

	#Update order of the tasks in the list
	def update_order
		params[:tasks].each_with_index do |task, index|
			task = Task.find(task[:id])
			task.order_in_list = index+1
			task.list_id = params[:id]
			task.save
		end
		render json: {}
	end

	def create
		list = List.new list_params
		if list.save
			render json: list
		else
			render json: {}
		end
	end

	def destroy
		list = List.find params[:id]
		list.destroy
		render json: {}
	end


	private

	def list_params
		params.require(:list).permit(:title, :project_id, :order_in_project)
	end
end
