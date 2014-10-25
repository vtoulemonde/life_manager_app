class FixOrderColumnName < ActiveRecord::Migration
  def change
  	rename_column :lists, :order, :order_in_project
  	rename_column :tasks, :order, :order_in_list
  end
end
