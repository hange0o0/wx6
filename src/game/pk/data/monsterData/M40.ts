class M40 extends MBase{
    //橙石守卫  攻击范围大
    constructor() {
        super();
    }
    public atkFun(){
        MTool.nearAtkFun(this,()=>{
            PKC.playerData.stopEnd = PKC.actionStep + 10
        })
    }
}