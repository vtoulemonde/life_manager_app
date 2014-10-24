

class SessionsController < ApplicationController

	def index

	end

    def create
        @user = User.find_by email: params[:email]

        if @user.nil?
            flash[:danger] = "No such user."

        elsif @user.authenticate params[:password]
            session[:current_user_id] = @user.id
            flash[:info] = "Thank you for logging in, #{@user.username}."

        else
            flash[:danger] = "Incorrect password."
        end

        redirect_to root_path
    end

    def destroy
        session[:current_user_id] = nil
        flash[:info] = "You have been logged out."

        redirect_to root_path
    end

end
