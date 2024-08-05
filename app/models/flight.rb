class Flight < ApplicationRecord
  belongs_to :user
  belongs_to :itinerary

  validates :flight_number, presence: true
  validates :departure_time, presence: true
  validates :arrival_time, presence: true
  validates :origin, presence: true
  validates :destination, presence: true

  validates :departure_latitude, :departure_longitude, presence: true
  validates :arrival_latitude, :arrival_longitude, presence: true

  after_save :update_itinerary_dates
  after_destroy :update_itinerary_dates

  private

  def update_itinerary_dates
    return unless itinerary

    itinerary_start_date = itinerary.flights.minimum(:departure_time)
    itinerary_end_date = itinerary.flights.maximum(:arrival_time)

    itinerary.update(start_date: itinerary_start_date, end_date: itinerary_end_date)
  end
end
