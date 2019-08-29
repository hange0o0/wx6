class S1 extends SBase{
    constructor() {
        super();
    }

    public totalTime = 60

    public step = 0
    public onCreate(){

    }

    public onUse(){
        var playerData = PKC.playerData
        playerData.isSkilling = this.sid
        playerData.isHide = true;
        playerData.relateItem.alpha = 0.5
        playerData.hitEnemy = null

        this.step = this.totalTime

        //playerData.addBuff({
        //    sid:this.sid,
        //    endTime:PKC.actionStep + this.totalTime,
        //    onEnd:()=>{
        //
        //    }
        //});
        return true;
    }


    public onStep(){
        var playerData = PKC.playerData;
        if(playerData.isSkilling != this.sid)
            return;
        this.step --;
        if(this.step <= 0)
        {
            playerData.isHide  = false;
            playerData.isSkilling = 0;
            playerData.relateItem.alpha = 1
        }

    }
}