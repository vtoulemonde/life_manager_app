class List < ActiveRecord::Base
  belongs_to :project
  has_many :tasks, :dependent => :destroy
  default_scope {order('order_in_project')}
  validates :title, :project_id, presence: true

  def to_hash
    hash = {}; self.attributes.each { |k,v| hash[k] = v }
    return hash
  end
  
end
