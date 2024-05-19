class Pokemon
  attr_accessor :type1, :type2, :hp

  include NameService

  def initialize(name, type1, type2, hp)
    @name = name
    @type1 = type1
    @type2 = type2
    @hp = hp
  end

  def change_name(newname)
    # 不適切な名前はエラー
    if @name == 'うんこ'
      print('不適切な名前です')
      return
    end
    @name = newname
  end

  def attack; end
end
