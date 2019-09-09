class S4 extends SBase{
    constructor() {
        super();
    }

    public changeSkillTime
    public farAtkSpeedRate
    public farAtkRate

    public onCreate(){
        this.farAtkSpeedRate = this.getValue(1)/100
        this.farAtkRate = this.getValue(2)/100
    }



    public onUse(){
        var playerData =  PKC.playerData;
        playerData.isFar = !playerData.isFar;

        playerData.farAtkSpeedRate = this.farAtkSpeedRate //远程形态
        playerData.farAtkRate = this.farAtkRate; //远程形态


        playerData.isSkilling = playerData.isFar?this.sid:0
        playerData.isSkillingStopMove = playerData.isSkilling > 0
        if(playerData.isFar)
            playerData.relateItem.showShootMV()
        else
            playerData.relateItem.showStandMV()
        this.changeSkillTime = PKC.actionStep;
        return true;
    }
}