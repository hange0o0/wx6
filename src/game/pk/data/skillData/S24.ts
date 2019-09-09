class S24 extends SBase{
    constructor() {
        super();
    }
    public hurt = 1.5
    public totalStep = 5
    public step = 5
    public onCreate(){
        this.hurt = this.getValue(2)/100
        this.totalStep = this.getValue(1)
    }

    public onUse(){
        var playerData = PKC.playerData;
        playerData.isSkilling = this.sid;
        playerData.isSkillingStopMove = true;

        this.step = this.totalStep;
        return true;
    }

    public onStep(){
        var playerData = PKC.playerData;
        if(playerData.isSkilling != this.sid)
            return;
        this.step --;
        var rota = Math.random()*2*Math.PI;
        playerData.relateItem.roleCon.rotation = rota/Math.PI*180+90
        playerData.relateItem.showShootMV();

        var bullet = PKCodeUI.getInstance().shoot(playerData,rota);
        bullet.setImage( 'knife_'+playerData.gunid+'_png');
        bullet.endTime = PKC.actionStep + 60
        bullet.speed = 30
        bullet.hitBack = 20
        bullet.hitSkill = true
        bullet.atk = Math.ceil(this.hurt*playerData.atk)

        if(this.step <= 0)
        {
            playerData.isSkilling = 0;
            playerData.isSkillingStopMove = false;
        }
    }
}