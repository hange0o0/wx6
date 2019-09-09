class S51 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){
        PKC.playerData.atkBuff['yun'] = {
            step:PKTool.getStepByTime(this.getValue(2)),
            rate:this.getValue(1)/100
        };
    }

}