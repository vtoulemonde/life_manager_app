class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.references :list, index: true
      t.integer :order
      t.text :description

      t.timestamps
    end
  end
end
