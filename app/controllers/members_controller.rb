class MembersController < ApplicationController
	def index
        members = Member.where(project_id: params[:project_id])
		render json: members.to_json(include: :user)
    end

    def create
		member = Member.new member_param
		if member.save
			render json: member.to_json(include: :user)
		else
			render json: {}
		end
	end

	def destroy
		member = Member.find params[:id]
		member.destroy
		render json: {}
	end

	private

	def member_param
		params.require(:member).permit(:user_id, :project_id)
	end
end
