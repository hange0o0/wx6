class S35 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){
        var playerData = PKC.playerData;
        var addSpeed = Math.ceil(playerData.speed * 0.5);
        playerData.speed += addSpeed
    }

}