class S40 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){
        var playerData = PKC.playerData;
        var addValue = Math.ceil(playerData.maxHp * 0.5);
        playerData.maxHp += addValue
        playerData.hp += addValue
    }

}