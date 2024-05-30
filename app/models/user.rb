class User < ApplicationRecord
  has_many :flights
  has_many :itineraries
end
