class Project < ActiveRecord::Base
  belongs_to :user
  has_many :lists
  default_scope {order('updated_at DESC')}
end
