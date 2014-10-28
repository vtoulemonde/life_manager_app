class AddStatusAndUserToTasks < ActiveRecord::Migration
  def change
  	add_column :tasks, :status, :string
  	add_reference :tasks, :user, index: true
  end
end
