# frozen_string_literal: true

SCORE_MAP = { 1 => 'ボギー', 0 => 'パー', -1 => 'バーディ', -2 => 'イーグル', -3 => 'アルバトロス', -4 => 'コンドル' }.freeze

regulation_num_list = gets.chop.split(',').map(&:to_i)
result_list = gets.chomp.split(',').map(&:to_i)

puts(regulation_num_list.zip(result_list).map do |reg, res|
  score = res - reg
  case score
  when (2..)
    "#{score}ボギー"
  else
    if res == 1 && score != -4
      'ホールインワン'
    else
      SCORE_MAP[score]
    end
  end
end.join(','))
