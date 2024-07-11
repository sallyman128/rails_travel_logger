module ApplicationHelper
  def generate_light_color(index)
    colors = [
      '#FFFAF0', '#F0FFF0', '#F0FFFF', '#FFF0F5', '#FFFFF0',
      '#F5F5DC', '#E6E6FA', '#FFFACD', '#F0E68C', '#FAFAD2'
    ]
    colors[index % colors.length]
  end
end
