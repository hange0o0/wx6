class S5 extends SBase{
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


        var rota = item.ctrlRota/180*Math.PI;
        var rota90 = rota - Math.PI/2;
        var num = 3
        var des = 30*num
        var dStart  = -des/2
        var dAdd = 20
        for(var i=0;i<num;i++)
        {
            var len = dStart + dAdd*i
            var x = Math.cos(rota90)*len + playerData.x
            var y = Math.sin(rota90)*len + playerData.y
            var bullet = PKCodeUI.getInstance().shoot(playerData,rota,{x:x,y:y});
            bullet.setImage( 'knife_'+playerData.gunid+'_png');
            bullet.endTime = PKC.actionStep + 60
            bullet.speed = 35
            bullet.hitBack = 20
            bullet.hitPass = true
            bullet.atk = Math.ceil(this.hurt*playerData.atk)
        }





        item.roleCon.rotation = item.ctrlRota+90
        item.showShootMV();

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