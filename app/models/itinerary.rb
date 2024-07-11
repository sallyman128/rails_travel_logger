class Itinerary < ApplicationRecord
  belongs_to :user
  has_many :flights, dependent: :destroy

  validates :start_date, presence: true, if: -> { flights.any? }
  validates :end_date, presence: true, if: -> { flights.any? }
end
