class SkillChooseUI extends game.BaseWindow_wx4 {

    private static _instance: SkillChooseUI;
    public static getInstance(): SkillChooseUI {
        if(!this._instance)
            this._instance = new SkillChooseUI();
        return this._instance;
    }

    private sendBtn: eui.Button;
    private inputText: eui.EditableText;



    public data;
    public constructor() {
        super();
        this.skinName = "SkillChooseUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('问题与建议')
        this.addBtnEvent(this.sendBtn,()=>{
            if(this.inputText.text)
            {
                sendFeedBack(this.inputText.text);
                MyWindow.ShowTips('感谢你的反馈，我们会努力做得更好的！')
                this.hide();
            }

        })
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.inputText.text = ''
    }

}