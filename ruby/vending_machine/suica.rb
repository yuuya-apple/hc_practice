class Suica
  def initialize
    @credit = 500
  end

  # Suicaは現在のチャージ残高を取得できる
  def credit_
    @credit
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
