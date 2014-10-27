class List < ActiveRecord::Base
  belongs_to :project
  has_many :tasks, :dependent => :destroy
  default_scope {order('order_in_project')}
end
