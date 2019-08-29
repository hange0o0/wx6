class S47 extends SBase{
    constructor() {
        super();
    }

    public rate = 0.5
    public hitBack = 200

    public onCreate(){

    }
    public onBeHit(enemy){
        if(enemy && !enemy.isDie)
        {
            enemy.addHp(-Math.ceil(enemy.atk*this.rate))
        }
    }
}