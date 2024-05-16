class Item
  def initialize(name, price)
    @name = name
    @price = price
  end

  def name_
    @name
  end

  def price_
    @price
  end

  def to_s
    "#{@name}(#{@price}円)"
  end
end
