class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, index: true
      t.string :password_digest
      t.string :email
      t.string :name
      t.string :auth_token
      t.string :state
      t.integer :district

      t.timestamps
    end
  end
end
