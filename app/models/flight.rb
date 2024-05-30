class Flight < ApplicationRecord
  belongs_to :user
  belongs_to :itinerary

  validates :flight_number, presence: true
  validates :departure_time, presence: true
  validates :arrival_time, presence: true
  validates :origin, presence: true
  validates :destination, presence: true
end
