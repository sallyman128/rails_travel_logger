class Itinerary < ApplicationRecord
  belongs_to :user
  has_many :flights
end
