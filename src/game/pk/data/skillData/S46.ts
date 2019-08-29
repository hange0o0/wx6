class S46 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){
        PKC.playerData.atkBuff['yun'] = {
            step:30,
            rate:0.1
        };
    }
}