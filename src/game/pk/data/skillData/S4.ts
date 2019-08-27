class S4 extends SBase{
    constructor() {
        super();
    }

    public onUse(){
        var playerData =  PKC.playerData;
        playerData.isFar = !playerData.isFar;
        playerData.isSkilling = playerData.isFar?this.sid:0
        playerData.isSkillingStopMove = playerData.isSkilling > 0
        if(playerData.isFar)
            playerData.relateItem.showShootMV()
        else
            playerData.relateItem.showStandMV()
        return true;
    }
}