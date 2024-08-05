# frozen_string_literal: true

module ApplicationHelper # rubocop:disable Style/Documentation
  def generate_light_color(index)
    colors = [
      '#FFFAF0', '#F0FFF0', '#F0FFFF', '#FFF0F5', '#FFFFF0',
      '#F5F5DC', '#E6E6FA', '#FFFACD', '#F0E68C', '#FAFAD2'
    ]
    colors[index % colors.length]
  end

  def airport_options
    airports = JSON.parse(File.read(Rails.root.join('public', 'airports.json')))
    airports['data'].map do |airport|
      ["#{airport['airport_name']} (#{airport['iata_code']})", airport['iata_code']]
    end.sort
  end
end
