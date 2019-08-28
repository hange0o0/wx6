class S22 extends SBase{
    constructor() {
        super();
    }
    public hurt = 200

    public onCreate(){

    }

    public onUse(){
        var playerData = PKC.playerData;
        var item = playerData.relateItem;



        var rota = item.ctrlRota/180*Math.PI;

        var x = playerData.x
        var y = playerData.y
        var bullet = PKCodeUI.getInstance().shoot(playerData,rota,{x:x,y:y});
        bullet.setImage( 'skill22_png',90);
        bullet.endTime = PKC.actionStep + 6
        bullet.speed = 50
        bullet.hitBack = 0
        bullet.hitPass = true
        bullet.atk =  this.hurt
        bullet.atkR = 60


        item.roleCon.rotation = item.ctrlRota+90
        item.showDoubleMV();

        return true;
    }
}