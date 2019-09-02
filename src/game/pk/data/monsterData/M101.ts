class M101 extends MBase{
    //幽魂    死后分裂，３次
    constructor() {
        super();
    }


    public step = 3
    public onCreate(){

    }


    public atkFun(){
        MTool.nearAtkFun(this)
    }

    public onDie(){
        if(this.step>1)
        {
            var mData = MTool.addNewMonster({mid:101,x:this.x,y:this.y})

            mData.step = this.step - 1;
            mData.scale = this.step/4
            mData.relateItem.resetHpBarY()
        }

    }

}