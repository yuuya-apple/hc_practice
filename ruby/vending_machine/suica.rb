class Suica
  attr_reader :credit

  def initialize
    @credit = 500
  end

  # Suicaには100円以上の任意の金額をチャージできる
  def charge(charge_credit)
    raise '100円以上をチャージしてください' if charge_credit < 100

    @credit += charge_credit
  end

  def payment(bill)
    p @credit

    @credit -= bill
    p @credit
    p bill
  end
end
