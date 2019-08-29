class S27 extends SBase{
    constructor() {
        super();
    }

    public totalTime = 60


    public hitBack = 200


    public step = 0
    public lasPos = {x:0,y:0}
    public onCreate(){

    }

    public onUse(){
        var playerData = PKC.playerData
        playerData.isSkilling = this.sid
        playerData.isHide = true;
        playerData.wudiStep = this.totalTime;
        playerData.relateItem.alpha = 0.2
        playerData.hitEnemy = null

        this.step = this.totalTime
        this.lasPos = {x:playerData.x,y:playerData.y}

        return true;
    }


    public onStep(){
            var playerData = PKC.playerData;
            if(playerData.isSkilling != this.sid)
                return;
            this.step --;

            if(Math.abs(playerData.x - this.lasPos.x) > 5 || Math.abs(playerData.y - this.lasPos.y) > 5)
            {
                this.step = 0;
                if(playerData.wudiStep > 1)
                    playerData.wudiStep = 1;
            }
            if(this.step <= 0)
            {
                playerData.isHide  = false;
                playerData.isSkilling = 0;
                playerData.relateItem.alpha = 1
            }

        }
}