class M32 extends MBase{
    constructor() {
        super();
    }

    public atkFun(){
        var playerData = PKC.playerData
        var hitPoint = this.getHitPos();
        var rota = Math.atan2(playerData.y - hitPoint.y,playerData.x-hitPoint.x)



        var bullet = PKCodeUI.getInstance().shoot(this,rota);
        bullet.setImage( 'bullet9_png');
        bullet.endTime = PKC.actionStep + 60
        bullet.speed = 10
        bullet.atk = this.atk
    }
}