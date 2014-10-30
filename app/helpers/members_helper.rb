module MembersHelper

	def sendEmail(member)

		my_url = "#{request.protocol}#{request.host_with_port}"

        domain = ENV['MAILGUN_DOMAIN']
        mailgun_password = ENV['MAILGUN_API_KEY']
        mailgun_username = 'api'
        mailgun_url = "https://api.mailgun.net/v2/#{domain}/messages"

        user = member.user
        project = member.project

        params = {
            :from => "Mailgun Sandbox <postmaster@#{domain}>",
            :to => "#{user.email}",
            :subject => "New member of the project #{project.title}",
            :html => "Hello #{user.username},<br><br> 
            You have been had as member of the project #{project.title}.<br>
            In order to view this project and the task that could be affected to you, please log into your Life Manager account at:<br>
            #{my_url}
            Thank you,<br><br>
            Life Manager Team"
        }

        options = {
            method: :post,
            params: params,
            userpwd: "#{mailgun_username}:#{mailgun_password}"
        }

        request = Typhoeus::Request.new(mailgun_url, options)
        response = request.run()
	end

end