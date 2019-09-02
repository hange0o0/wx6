class M39 extends MBase{
    //黑石守卫  攻击范围大,0.5秒僵直
    constructor() {
        super();
    }

    public atkFun(){
        MTool.nearAtkFun(this,()=>{
            PKC.playerData.stopEnd = PKC.actionStep + 10
        })
    }
}