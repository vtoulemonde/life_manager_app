class List < ActiveRecord::Base
  belongs_to :project
  has_many :tasks
  default_scope {order('order_in_project')}
end
