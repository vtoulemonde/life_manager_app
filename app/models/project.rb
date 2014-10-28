class Project < ActiveRecord::Base
  belongs_to :user
  has_many :lists, :dependent => :destroy
  has_many :members, :dependent => :destroy
  default_scope {order('updated_at DESC')}

  def to_hash
    hash = {}; self.attributes.each { |k,v| hash[k] = v }
    return hash
  end
  
end
