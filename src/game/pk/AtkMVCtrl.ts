class AtkMVCtrl_wx3 {
    private static instance:AtkMVCtrl_wx3;

    public static getInstance() {
        if (!this.instance) this.instance = new AtkMVCtrl_wx3();
        return this.instance;
    }

    public preLoadMV(id){
        AniManager_wx3.getInstance().preLoadMV(id)
    }
    public preLoadPNG(url){
        //RES.loadGroup([Config.localResRoot +url])
    }
    public preLoadPNGLocal(url){
        //RES.loadGroup([url])
    }
    public playAniOn(id,mvid){
        return PKCode_wx4.getInstance().playAniOn(id,mvid)
    }

    public mAtkMV(mid,user,endTime){
        if(this['atkMV' + mid + '_wx3'])
        {
            var currentStep = PKCode_wx4.getInstance().actionStep;
            this['atkMV' + mid + '_wx3'](user,user.target,currentStep,currentStep + endTime)
        }
    }






    ////////////////////////////////////////////////////////////////
    //private atkMV1_wx3(user,target,actionTime,endTime){
    //   this.playAniOn(target.id,MonsterVO.getObject(1).mvid)
    //}
    //
    //
    //private atkMV3_wx3(user,target,actionTime,endTime){
    //    var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
    //    var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
    //    var item = PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime)
    //    var mc = item.mc;
    //    mc.source = 'enemy3_attack_png'
    //    mc.anchorOffsetX = 55/2
    //    mc.anchorOffsetY = 30/2
    //    var tw = egret.Tween.get(mc,{loop:true});
    //    tw.to({rotation:360},300)
    //}

    private atkMV38_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createBullet(userItem,targetItem,actionTime,endTime,9)
    }
    private atkMV43_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        var mc:BulletAniMC_wx3 = <BulletAniMC_wx3>(PKBulletManager_wx3.getInstance().createBulletAni(userItem,targetItem,actionTime,endTime,MonsterVO.getObject(43).mvid))
        mc.needRota = false
        mc.targetOffsetY = target.vo.height/2
        mc.mc.scaleX = mc.mc.scaleY = 0.6          //@ani scale
    }

    private atkMV44_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        var mc:BulletAniMC_wx3 = <BulletAniMC_wx3>(PKBulletManager_wx3.getInstance().createBulletAni(userItem,targetItem,actionTime,endTime,MonsterVO.getObject(44).mvid))
        mc.needRota = false
        mc.targetOffsetY = target.vo.height/2
        mc.mc.scaleX = mc.mc.scaleY = 0.6          //@ani scale
    }

    private atkMV45_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        var mc:BulletAniMC_wx3 = <BulletAniMC_wx3>(PKBulletManager_wx3.getInstance().createBulletAni(userItem,targetItem,actionTime,endTime,MonsterVO.getObject(45).mvid))
        mc.needRota = false
        mc.targetOffsetY = target.vo.height/2
        mc.mc.scaleX = mc.mc.scaleY = 0.6          //@ani scale
    }

    private atkMV46_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        var mc:BulletAniMC_wx3 = <BulletAniMC_wx3>(PKBulletManager_wx3.getInstance().createBulletAni(userItem,targetItem,actionTime,endTime,MonsterVO.getObject(46).mvid))
        mc.needRota = false
        mc.targetOffsetY = target.vo.height/2
        mc.mc.scaleX = mc.mc.scaleY = 0.6          //@ani scale
    }

    private atkMV47_wx3(user,target,actionTime,endTime){
        this.playAniOn(target.id,MonsterVO.getObject(47).mvid)
    }

    private atkMV48_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        var mc = this.playAniOn(user.id,MonsterVO.getObject(48).mvid)
        if(mc)
        {
            mc.scaleY = 1;
            if(userItem.x > targetItem.x)
            {
                mc.scaleX = -1
                mc.x -= 30
            }
            else
            {
                mc.scaleX = 1
                mc.x += 30
            }
            mc.y -= 70
        }
    }



    public atkMV61_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + -1*50},300)
    }

    public atkMV62_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + -1*50},300)
    }

    public atkMV63_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + -1*50},300)
    }

    public atkMV64_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        PKBulletManager_wx3.getInstance().createArrow(userItem,targetItem,actionTime,endTime)
    }

    public atkMV68_wx3(user,target,actionTime,endTime){
        var AM = AniManager_wx3.getInstance();
        var mc = AM.getImg( 'enemy68_attack_png');
        mc.anchorOffsetX = 65/2
        mc.anchorOffsetY = 60/2
        var tw = egret.Tween.get(mc);
        tw.to({rotation:720},200).set({rotation:0}).to({rotation:720,scaleX:0.1,scaleY:0.1},100).call(()=>{
            AM.removeImg(mc);
        })
        var atker = PKCode_wx4.getInstance().getItemByID(user.id)
        mc.x = atker.x + -1 * 20
        mc.y = atker.y - 40
        atker.parent.addChildAt(mc,atker.parent.getChildIndex(atker) + 1);
        //PKVideoCon.getInstance().addMCOn(user.id,mc)
    }

    public atkMV70_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + -1*50},300)
    }

    public atkMV72_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        var mc:BulletAniMC2_wx3 = <BulletAniMC2_wx3>(PKBulletManager_wx3.getInstance().createBulletAni2(userItem,targetItem,actionTime,endTime))
        mc.mc.anchorOffsetX = 560/4/2
        mc.mc.anchorOffsetY = 90
        mc.targetOffsetY = target.vo.height/2
        if(userItem.x > targetItem.x)
            mc.mc.scaleX = 1
        else
            mc.mc.scaleX = -1
        mc.mc.load('enemy72_attack_png',0,560,90)
        mc.mc.play()
    }

    public atkMV74_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        var mc:BulletAniMC2_wx3 = <BulletAniMC2_wx3>(PKBulletManager_wx3.getInstance().createBulletAni2(userItem,targetItem,actionTime,endTime))
        mc.mc.anchorOffsetX = 560/4/2
        mc.mc.anchorOffsetY = 90
        mc.targetOffsetY = target.vo.height/2
        if(userItem.x > targetItem.x)
            mc.mc.scaleX = 1
        else
            mc.mc.scaleX = -1
        mc.mc.load('enemy72_attack_png',0,560,90)
        mc.mc.play()
    }

    public atkMV75_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = {
            x: user.x + -1 * user.getSkillValue(1),
            y:user.y
        }
        PKBulletManager_wx3.getInstance().createBulletLine(userItem,targetItem,actionTime,endTime,'pk_arrow_1_png')
    }

    public atkMV76_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        egret.Tween.get(userItem).to({x:userItem.x + -1*50},300)
    }

    public atkMV103_wx3(user,target,actionTime,endTime){
        var userItem = PKCode_wx4.getInstance().getItemByID(user.id);
        var targetItem = PKCode_wx4.getInstance().getItemByID(target.id);
        var mc = this.playAniOn(user.id,MonsterVO.getObject(103).mvid)
        if(mc)
        {
            mc.scaleY = 1;
            if(userItem.x > targetItem.x)
            {
                mc.scaleX = -1
                mc.x -= MonsterVO.getObject(103).atkx
            }
            else
            {
                mc.scaleX = 1
                mc.x += MonsterVO.getObject(103).atkx
            }
            mc.y -= MonsterVO.getObject(103).atky
        }
    }

}