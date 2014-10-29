class Task < ActiveRecord::Base
  belongs_to :list
  default_scope {order('order_in_list')}
  validates :title, :list_id, presence: true

  def to_hash
    hash = {}; self.attributes.each { |k,v| hash[k] = v }
    return hash
  end
  
end
