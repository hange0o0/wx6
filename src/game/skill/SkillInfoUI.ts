class SkillInfoUI extends game.BaseWindow_wx4 {

    private static _instance: SkillInfoUI;
    public static getInstance(): SkillInfoUI {
        if(!this._instance)
            this._instance = new SkillInfoUI();
        return this._instance;
    }

    private nameText: eui.Label;
    private skillCDText: eui.Label;
    private atkText: eui.Label;
    private rateText: eui.Label;
    private closeBtn: eui.Button;



    public skillID;
    public constructor() {
        super();
        this.skinName = "SkillInfoUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('问题与建议')

    }

    public show(skillID?){
        this.skillID = skillID;
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        var svo = SkillVO.getObject(this.skillID);
        this.atkText.text = svo.name
        var cd = svo.getCD();
        if(cd)
            this.setHtml(this.rateText,'技能间隔:' + this.createHtml(MyTool.toFixed(cd/1000,1) + '秒',0xFFFF00))
        else
            this.setHtml(this.rateText,this.createHtml('被动技能',0xECAEF9))
        this.setHtml(this.atkText, svo.getDes())
    }

}