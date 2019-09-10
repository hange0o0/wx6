class S42 extends SBase{
    constructor() {
        super();
    }

    public reBornTime = 200
    public totalTime = 200

    public onCreate(){
        PKC.playerData.rebornDec = PKTool.getStepByTime(this.getValue(1)*1000)
    }

}