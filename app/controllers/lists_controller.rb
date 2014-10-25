class ListsController < ApplicationController

	def index
		lists = current_user.projects[0].lists
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

end
