class S45 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){

        PKC.playerData.atkBuff['bomb'] = {
            dis:100,
            hurt:50
        };
    }

}