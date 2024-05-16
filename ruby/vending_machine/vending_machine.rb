require './item'
require './suica'

class VendingMachine
  def initialize
    @stock = { 'ペプシ' => (1..5).map { Item.new('ペプシ', 150) },
               'モンスター' => (1..5).map { Item.new('モンスター', 230) },
               'いろはす' => (1..5).map { Item.new('いろはす', 120) } }
    @sale = 0
  end

  def stock_
    @stock
  end

  def stock_=(stock)
    @stock = stock
  end

  def sale_
    @sale
  end

  def sale_=(sale)
    @sale = sale
  end

  # 自動販売機は在庫を取得
  def check_stock(name)
    @stock[name].length
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
    value.times { @stock[name] << Item.new(name, price_map[name]) }
  end

  # 購入可能なドリンクのリストを取得
  def canbuy_itemlist
    @stock.keys.select { |key| canbuy?(key) }
  end

  # 購入処理
  def buy(name, suica)
    raise '在庫がありません' unless canbuy?(name)

    item = @stock[name][0]
    raise '残高が足りません' if suica.credit_ < item.price_

    @stock[name].shift
    addsale(item.price_)
    suica.payment(item.price_)
  end
end
