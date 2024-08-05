# frozen_string_literal: true

namespace :fetch_airports do
  desc 'Fetch airport data from Aviationstack API and save to a JSON file'
  task fetch: :environment do
    require 'net/http'
    require 'json'

    url = "http://api.aviationstack.com/v1/airports?access_key=#{AVIATIONSTACK_API_KEY}&limit=10000"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)

    File.open('public/airports.json', 'w') do |f|
      f.write(data.to_json)
    end

    puts 'Fetched and saved airport data to public/airports.json'
  end
end
