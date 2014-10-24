class ApplicationController < ActionController::Base
  	# Prevent CSRF attacks by raising an exception.
  	# For APIs, you may want to use :null_session instead.
  	protect_from_forgery with: :exception

	# This allows us to invoke the current_user() method in views!
	helper_method :current_user, :logged_in?

	def current_user
	    if session[:current_user_id]
	        User.find session[:current_user_id]
	    else
	        nil
	    end
	end

	def logged_in?
	    current_user != nil
	end
end
