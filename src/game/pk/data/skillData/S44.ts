class S44 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){
        PKC.playerData.atkBuff['fire'] = {
            step:30*5,
            hurt:10
        };
    }

}