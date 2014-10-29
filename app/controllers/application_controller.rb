class ApplicationController < ActionController::Base
  	# Prevent CSRF attacks by raising an exception.
  	# For APIs, you may want to use :null_session instead.
  	protect_from_forgery with: :exception
  	# Prevent exception when call with ajax/restangular
  	skip_before_action :verify_authenticity_token do
	    request.content_type == 'application/json'
	end

	# This allows us to invoke the current_user() method in views!
	helper_method :current_user, :logged_in?, :get_current_user_id

	def current_user
	    if session[:current_user_id]
	        User.find session[:current_user_id]
	    else
	        nil
	    end
	end

	def get_current_user_id
	    if session[:current_user_id]
	        session[:current_user_id]
	    else
	        nil
	    end
	end

	def logged_in?
	    current_user != nil
	end
end
