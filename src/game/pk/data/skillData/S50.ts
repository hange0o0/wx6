class S50 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){
        PKC.playerData.atkBuff['gun'] = {
            num:5,
            hurt:0.3
        };
    }

}