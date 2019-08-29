class S39 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){

    }
    public onUse(){
        var playerData = PKC.playerData;
        var addValue = Math.ceil(playerData.hitBack * 0.5);
        playerData.hitBack += addValue
    }
}