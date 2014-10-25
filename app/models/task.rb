class Task < ActiveRecord::Base
  belongs_to :list
  default_scope {order('order_in_list')}
end
