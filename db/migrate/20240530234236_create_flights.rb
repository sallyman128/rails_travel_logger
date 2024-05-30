class CreateFlights < ActiveRecord::Migration[7.1]
  def change
    create_table :flights do |t|
      t.string :flight_number
      t.datetime :departure_time
      t.datetime :arrival_time
      t.string :origin
      t.string :destination

      t.timestamps
    end
  end
end
