class M75 extends MBase{
    //白袍怨灵 召唤骷髅士兵
    constructor() {
        super();
    }

    public atkFun(){
        MTool.addNewMonster({mid:65,x:this.x - 30 + Math.random()*60,y:this.y - 30 + Math.random()*60})
    }
}