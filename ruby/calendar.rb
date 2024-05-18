# frozen_string_literal: true

require 'date'
require 'optparse'

SPACE = ' '
MONTHS = { 1 => 'January', 2 => 'February', 3 => 'March', 4 => 'April', 5 => 'May', 6 => 'June', 7 => 'July',
           8 => 'August', 9 => 'September', 10 => 'October', 11 => 'November', 12 => 'December' }.freeze

today = Date.today
month = today.month
OptionParser.new.on('-m [VAL]]', Integer) { |v| month = v }.parse(ARGV)

unless (1..12).cover?(month)
  puts "#{month} is neither a month number (1..12) nor a name" unless (1..12).cover?(month)
  return
end

puts "#{MONTHS[month]}#{SPACE}#{today.year}".center(20)
puts 'Mo Tu We Th Fr Sa Su'

first_date = Date.new(today.year, month, 1)
last_date = Date.new(today.year, month, -1)

wday = first_date.wday.to_i
(wday.zero? ? 6 : wday - 1).times { |i| print i.zero? ? SPACE * 2 : SPACE * 3 }

(first_date..last_date).each do |date|
  print SPACE unless date.wday == 1
  print format('%2d', date.day)
  puts  if date.wday.zero? || date.day == last_date.day
end
