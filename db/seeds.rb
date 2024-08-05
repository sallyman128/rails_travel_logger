# db/seeds.rb

require 'faker'

# Clear existing data
Flight.destroy_all
Itinerary.destroy_all
User.destroy_all

# Create Users
users = []
5.times do
  users << User.create!(
    email: Faker::Internet.unique.email,
    password: 'password',
    password_confirmation: 'password'
  )
end

# Create Itineraries
itineraries = []
users.each do |user|
  2.times do
    itineraries << Itinerary.create!(
      name: Faker::Lorem.words(number: 3).join(' '),
      user: user,
      start_date: Faker::Date.backward(days: 30),
      end_date: Faker::Date.forward(days: 30)
    )
  end
end

# Example Airports Data
airports = [
  { code: 'JFK', name: 'John F. Kennedy International Airport', latitude: 40.6413, longitude: -73.7781 },
  { code: 'LAX', name: 'Los Angeles International Airport', latitude: 33.9416, longitude: -118.4085 },
  { code: 'ORD', name: 'O\'Hare International Airport', latitude: 41.9742, longitude: -87.9073 },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', latitude: 33.6407, longitude: -84.4277 },
  { code: 'LHR', name: 'Heathrow Airport', latitude: 51.4700, longitude: -0.4543 }
]

# Create Flights
itineraries.each do |itinerary|
  3.times do
    origin = airports.sample
    destination = nil
    loop do
      destination = airports.sample
      break if destination != origin
    end

    Flight.create!(
      flight_number: Faker::Number.number(digits: 5),
      departure_time: Faker::Time.backward(days: 14, period: :morning),
      arrival_time: Faker::Time.forward(days: 14, period: :evening),
      origin: origin[:code],
      destination: destination[:code],
      departure_latitude: origin[:latitude],
      departure_longitude: origin[:longitude],
      arrival_latitude: destination[:latitude],
      arrival_longitude: destination[:longitude],
      user: itinerary.user,
      itinerary: itinerary
    )
  end
end

puts "Seed data created successfully!"
