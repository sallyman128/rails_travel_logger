# frozen_string_literal: true

class AddCoordinatesToFlights < ActiveRecord::Migration[7.1] # rubocop:disable Style/Documentation
  def change
    add_column :flights, :departure_latitude, :float
    add_column :flights, :departure_longitude, :float
    add_column :flights, :arrival_latitude, :float
    add_column :flights, :arrival_longitude, :float
  end
end
