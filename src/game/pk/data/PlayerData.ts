class PlayerData{
    public isPlayer = true
    public onlyID = 'PlayerData'

    public x;
    public y;

    public atk = 10
    public hp = 100;
    public maxHp = 100
    public speed = 12
    public atkSpeed = PKTool.getStepByTime(600);
    public hitBack = 100;
    public atkDis = 100;
    public lastAtkTime = 0;

    public knife = 1;
    public buff = [];
    public skills = {}

    public hitEnemy
    public relateItem//

    public addHp(v){
        this.hp += v;
        if(this.hp > this.maxHp)
        {
            this.hp = this.maxHp
        }
        else if(this.hp <= 0)
        {
            this.hp = 0;
        }

        PKTool.showHpChange(this,v)
    }

    public canAtk(){
        return PKC.actionStep > this.lastAtkTime + this.atkSpeed
    }


}