class PlayerData{
    public isPlayer = true
    public onlyID = 'PlayerData'

    public x;
    public y;

    public size = 40//体积

    public atk = 40
    public hp = 1000;
    public maxHp = 1000;
    public speed = 12
    public atkSpeed = PKTool.getStepByTime(600);  //上限300
    public hitBack = 100;
    public atkDis = 100;
    public lastAtkTime = 0;
    public bulletSpeed = 10;

    public doubleRate = 0.2
    public doubleValue = 1.5
    public missRate = 1.5

    public gunid = 1;
    public buffArr = [];
    public skills = {}
    public skillsList = []

    public hitEnemy
    public relateItem//

    public isSkilling = 0//正在使用的技能
    public isSkillingStopMove = false//正在使用技能,并且不能移动


    public isHide = false; //隐身

    public isFar = false; //远程形态
    public farAtkSpeedRate = 0.3; //远程形态
    public farAtkRate = 0.5; //远程形态

    public getAtk(){
        //var hpStep = Math.ceil(8*this.hp/this.maxHp)
        return Math.ceil(this.atk * (2 - this.hp/this.maxHp))
    }

    public getHitPos(){
        return {
            x:this.x,
            y:this.y
        }
    }

    public initData(){
       this.isHide = false;

        this.gunid = GunManager.getInstance().gunid
        var gunVO = GunVO.getObject(this.gunid)

        var playerData = PKManager.getInstance().getPlayerValue();
        this.atk = Math.ceil(playerData.atk * gunVO.atk/100);
        this.hp = playerData.hp
        this.speed = gunVO.sp
        this.hp = playerData.hp
        this.hp = playerData.hp
        this.hp = playerData.hp
        this.hp = playerData.hp
        this.hp = playerData.hp
        this.hp = playerData.hp
        this.hp = playerData.hp


    public atk = 40
    public hp = 1000;
    public maxHp = 1000;
    public speed = 12
    public atkSpeed = PKTool.getStepByTime(600);  //上限300
    public hitBack = 100;
    public atkDis = 100;
    public lastAtkTime = 0;
    public bulletSpeed = 10;

    public doubleRate = 0.2
    public doubleValue = 1.5
    public missRate = 1.5





        this.maxHp = this.hp
        this.buffArr.length = 0;



        var skill = _get['skill']?_get['skill'].split(','):[]
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

    public addBuff(buff){
          this.buffArr.push(buff);
    }

    public onStep(){
        var actionStep = PKC.actionStep
        for(var s in this.skills)
        {
            this.skills[s].onStep();
        }


        var len = this.buffArr.length;
        for(var i=0;i<len;i++)
        {
             var buff = this.buffArr[i];
            if(buff.endTime < actionStep)
            {
                buff.onEnd && buff.onEnd();
                this.buffArr.splice(i,1);
                len--;
                i--;
                continue;
            }
            buff.onStep && buff.onStep();
        }
    }


    public useSkill(id){
        this.skills[id] && this.skills[id].onUse();
    }

    public addHp(v,isBuff?){
        if(v<0)
        {
            //if(this.isHide && !isBuff)
            //    return;
        }


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
        if(this.isHide)
            return;
        var atkSpeed = this.atkSpeed;
        if(this.isFar)
            atkSpeed *= this.farAtkSpeedRate;
        return PKC.actionStep > this.lastAtkTime + atkSpeed
    }


}