json.extract! flight, :id, :flight_number, :departure_time, :arrival_time, :origin, :destination, :created_at,
              :updated_at
json.url flight_url(flight, format: :json)
