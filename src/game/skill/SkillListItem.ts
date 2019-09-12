class SkillListItem extends game.BaseItem{

    private mc: eui.Image;
    private levelText: eui.Label;
    private barMC: eui.Image;
    private rateText: eui.Label;


    public constructor() {
        super();
        this.skinName = "SkillListItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = false

    }

    public dataChanged():void {
        if(this.data.isMonster)
            this.renewMonster();
        else
            this.renewSkill();
    }

    private renewMonster(){
        this.currentState = 's2'
        var vo = this.data


        if(false)
        {
            this.mc.source = 'pk_skill_unknow_png'
            this.touchChildren = this.touchEnabled = false
        }
        else
        {
            this.touchChildren = this.touchEnabled = true
            this.mc.source = vo.getThumb();
        }
    }

    private renewSkill(){
        this.currentState = 's1'
        var vo = this.data
        var SM = SkillManager.getInstance();
        var lv = SM.getSkillLevel(vo.id);
        this.mc.source = vo.getThumb();
        this.levelText.text = 'lv.' + lv


        var currentNum = SM.getSkillNum(vo.id)
        var num1 = SM.getLevelNum(lv)
        var num2 = SM.getLevelNum(lv+1)

        var v1 = currentNum - num1
        var v2 = num2 - num1
        this.rateText.text = v1 + '/' + v2;
        this.barMC.width = 100 * v1 / v2;

    }
}