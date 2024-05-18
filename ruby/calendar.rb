# frozen_string_literal: true

require 'date'
require 'optparse'

SPACE = ' '

today = Date.today
month = today.month
OptionParser.new.on('-m [VAL]]', Integer) { |v| month = v }.parse(ARGV)

unless (1..12).cover?(month)
  puts "#{month} is neither a month number (1..12) nor a name" unless (1..12).cover?(month)
  return
end

first_date = Date.new(today.year, month, 1)
last_date = Date.new(today.year, month, -1)

puts "#{first_date.strftime('%B')}#{SPACE}#{today.year}".center(20)
puts 'Mo Tu We Th Fr Sa Su'

wday = first_date.wday.to_i
(wday.zero? ? 6 : wday - 1).times { |i| print i.zero? ? SPACE * 2 : SPACE * 3 }

(first_date..last_date).each do |date|
  print SPACE unless date.wday == 1
  print format('%2d', date.day)
  puts  if date.wday.zero? || date.day == last_date.day
end
