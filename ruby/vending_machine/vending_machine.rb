require './item'
require './suica'

class VendingMachine
  attr_reader :stock, :sale

  def initialize
    @stock = []
    5.times { @stock << Item.new('ペプシ', 150) }
    5.times { @stock << Item.new('モンスター', 230) }
    5.times { @stock << Item.new('いろはす', 120) }
    @sale = 0
  end

  # 自動販売機は在庫を取得
  def check_stock(name)
    @stock.count { |s| s.name == name }
  end

  # ペプシが購入できるかどうかを取得
  def canbuy?(name)
    !check_stock(name).zero?
  end

  def addsale(bill)
    @sale += bill
  end

  # 自動販売機に在庫を補充
  def replenishment(name, value)
    price_map = { 'ペプシ' => 150, 'モンスター' => 230, 'いろはす' => 120 }
    value.times { @stock << Item.new(name, price_map[name]) }
  end

  # 購入可能なドリンクのリストを取得
  def canbuy_itemlist
    @stock.group_by(&:name).keys
  end

  # 購入処理
  def buy(name, suica)
    raise '在庫がありません' unless canbuy?(name)

    item = @stock.find { |s| s.name.eql?(name) }
    raise '残高が足りません' if suica.credit < item.price

    @stock.delete_at(@stock.index { |s| s.name.eql?(name) })
    addsale(item.price)
    suica.payment(item.price)
  end
end
