# frozen_string_literal: true

require 'date'
require 'optparse'

SPACE = ' '
NEW_LINE = "\n"
MONTHS = { 1 => 'January', 2 => 'February', 3 => 'March', 4 => 'April', 5 => 'May', 6 => 'June', 7 => 'July',
           8 => 'August', 9 => 'September', 10 => 'October', 11 => 'November', 12 => 'December' }.freeze
WEEKS_STRING = 'Mo Tu We Th Fr Sa Su'

def display_calendar(date)
  title = "#{MONTHS[date.month]}#{SPACE}#{date.year}".center(20)

  calendar = create_calendar(date)

  calendar.map! do |w|
    w = w.map do |d|
      d.nil? ? (SPACE * 2) : d
    end.join(SPACE)
    w
  end

  puts [title, WEEKS_STRING, calendar.join(NEW_LINE)].join(NEW_LINE)
end

def create_calendar(date)
  wday = Date.new(date.year, date.month, 1).wday
  calendar = []
  week = Array.new(7)
  last_day = Date.new(date.year, date.month, -1).day
  (1..last_day).each do |i|
    index = wday.zero? ? 6 : wday - 1
    week[index] = format('%2d', i)
    wday = wday == 6 ? 0 : wday + 1
    calendar << week if i == last_day
    next unless index == 6

    calendar << week
    week = Array.new(7)
  end
  calendar
end

today = Date.today
month = today.month
opt = OptionParser.new
opt.on('-m [VAL]]', Integer) { |v| month = v }
opt.parse(ARGV)

if (1..12).cover?(month)
  display_calendar(Date.new(today.year, month, 1))
else
  puts "#{month} is neither a month number (1..12) nor a name"
end
