class PlayerData{
    public isPlayer = true
    public onlyID = 'PlayerData'

    public x;
    public y;

    public atk = 40
    public hp = 1000;
    public maxHp = 1000;
    public speed = 12
    public atkSpeed = PKTool.getStepByTime(600);
    public hitBack = 100;
    public atkDis = 100;
    public lastAtkTime = 0;

    public knife = 1;
    public buff = [];
    public skills = {}
    public skillsList = []

    public hitEnemy
    public relateItem//

    public isSkilling = 0//正在使用的技能
    public isSkillingStopMove = false//正在使用技能,并且不能移动

    public getAtk(){
        var hpStep = Math.ceil(8*this.hp/this.maxHp)
        return Math.ceil(this.atk * (1 + (8-hpStep)/10))
    }

    public initData(){
        this.maxHp = this.hp = 1000;



        var skill = [1,2,3]
        this.skills = {}
        this.skillsList = []
        for(var i=0;i<skill.length;i++)
        {
            var sItem = SBase.getItem(skill[i])
            this.skillsList.push(sItem)
            this.skills[sItem.sid] = sItem
            sItem.onCreate();
        }
    }

    public onStep(){
        for(var s in this.skills)
        {
            this.skills[s].onStep();
        }
    }


    public useSkill(id){
        this.skills[id] && this.skills[id].onUse();
    }

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
        EM_wx4.dispatchEventWith(GameEvent.client.HP_CHANGE)
    }

    public canAtk(){
        return PKC.actionStep > this.lastAtkTime + this.atkSpeed
    }


}