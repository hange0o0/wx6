class S7 extends SBase{
    constructor() {
        super();
    }

    public hurt = 1.5
    public step = 5
    public onCreate(){

    }

    public onUse(){
        var playerData = PKC.playerData;
        var item = playerData.relateItem;
        playerData.isSkilling = this.sid;



        this.step = 10;


        item.roleCon.rotation = item.ctrlRota+90
        item.showShootMV();

        return true;
    }

    public onStep(){
        var playerData = PKC.playerData;
        if(playerData.isSkilling != this.sid)
            return;
        this.step --;

        var bullet = PKCodeUI.getInstance().shoot(playerData,(playerData.relateItem.ctrlRota - 5 + Math.random()*10)/180*Math.PI);
        bullet.setImage( 'knife_'+playerData.gunid+'_png');
        bullet.endTime = PKC.actionStep + 60
        bullet.speed = 30
        bullet.hitBack = 20
        bullet.atk = Math.ceil(this.hurt*playerData.atk)

        if(this.step <= 0)
        {
            playerData.isSkilling = 0;
        }
    }
}