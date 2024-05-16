# frozen_string_literal: true

require 'date'
require 'optparse'

SPACE = ' '
NEW_LINE = "\n"
MONTHS = { 1 => 'January', 2 => 'February', 3 => 'March', 4 => 'April', 5 => 'May', 6 => 'June', 7 => 'July',
           8 => 'August', 9 => 'September', 10 => 'October', 11 => 'November', 12 => 'December' }.freeze
WEEKS_STRING = 'Mo Tu We Th Fr Sa Su'

today = Date.today
month = today.month
opt = OptionParser.new
opt.on('-m [VAL]]', Integer) { |v| month = v }
opt.parse(ARGV)

unless (1..12).cover?(month)
  puts "#{month} is neither a month number (1..12) nor a name" unless (1..12).cover?(month)
  return
end
puts "#{MONTHS[month]}#{SPACE}#{today.year}".center(20)
puts WEEKS_STRING

first_date = Date.new(today.year, month, 1)
wday = first_date.wday.to_i
index = wday.zero? ? 6 : wday - 1

week = []
last_date = Date.new(today.year, month, -1)
(first_date..last_date).each do |date|
  index = date.wday.zero? ? 6 : date.wday - 1
  week[index] = format('%2d', date.day)

  next unless date.wday.zero? || date == last_date

  puts (week.map do |w|
    w.nil? ? SPACE * 2 : w.to_s
  end).join(SPACE)
  week = Array(7)
end
