class S6 extends SBase{
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


        var num = 10;
        var step = 10;
        var startRota = (item.ctrlRota - num/2*step + step*0.5)/180*Math.PI

        var addRota = step/180*Math.PI
        for(var i=0;i<num;i++)
        {
            var bullet = PKCodeUI.getInstance().shoot(playerData,startRota + addRota*i);
            bullet.setImage( 'knife_'+playerData.gunid+'_png');
            bullet.endTime = PKC.actionStep + 60
            bullet.speed = 30
            bullet.hitBack = 20
            bullet.hitSkill = true
            bullet.atk = Math.ceil(this.hurt*playerData.atk)
        }



        item.roleCon.rotation = item.ctrlRota+90
        item.showDoubleMV();

        return true;
    }

    public onStep(){
        var playerData = PKC.playerData;
        if(playerData.isSkilling != this.sid)
            return;
        this.step --;
        if(this.step <= 0)
        {
            playerData.isSkilling = 0;
        }
    }
}