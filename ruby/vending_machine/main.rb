require './vending_machine'
require './suica'

suica = Suica.new
machine = VendingMachine.new

p machine.canbuy_itemlist
p machine.check_stock('モンスター')
machine.buy('モンスター', suica)
p machine.check_stock('モンスター')
p suica.credit
machine.buy('モンスター', suica)
p machine.check_stock('モンスター')
p suica.credit
begin
  machine.buy('モンスター', suica)
rescue StandardError => e
  p e.message
end
suica.charge(1000)
machine.buy('モンスター', suica)
p machine.check_stock('モンスター')
machine.buy('モンスター', suica)
p machine.check_stock('モンスター')
p machine.sale
machine.buy('モンスター', suica)
p machine.sale
p machine.check_stock('モンスター')
begin
  machine.buy('モンスター', suica)
rescue StandardError => e
  p e.message
end
p machine.canbuy_itemlist
machine.replenishment('モンスター', 2)
p machine.check_stock('モンスター')
p machine.canbuy_itemlist
p machine.sale
