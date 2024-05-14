# frozen_string_literal: true

parson = %w[A B C D E F]

rand_nuum = rand(1..2)

parson.shuffle!

p parson[0..rand_nuum]
p parson[rand_nuum + 1..5]

# メモ マジックナンバー排除
# rand_nuum = rand(2..3)
# parson.shuffle!
# p parson.first(rand_nuum)
# p parson.last(parson.length - rand_nuum)
