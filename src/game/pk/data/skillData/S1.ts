class S1 extends SBase{
    constructor() {
        super();
    }

    public totalTime = 60
    public onCreate(){

    }

    public onUse(){
        var playerData = PKC.playerData
        playerData.isSkilling = this.sid
        playerData.isHide = true;
        playerData.relateItem.alpha = 0.5
        playerData.hitEnemy = null
        playerData.addBuff({
            sid:this.sid,
            endTime:PKC.actionStep + this.totalTime,
            onEnd:()=>{
                playerData.isHide  = false;
                playerData.isSkilling = 0;
                if(!playerData.isHide)
                    playerData.relateItem.alpha = 1
            }
        });
        return true;
    }
}