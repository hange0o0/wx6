class Player2UI extends game.BaseWindow_wx4 {

    private static _instance: Player2UI;
    public static getInstance(): Player2UI {
        if(!this._instance)
            this._instance = new Player2UI();
        return this._instance;
    }

    private cancelBtn: eui.Button;
    private desText: eui.Label;

    private cd = 0;

    private isJoin
    public constructor() {
        super();
        this.skinName = "Player2UISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('双人生存')
        this.addBtnEvent(this.cancelBtn,this.hide)
    }

    public show(isJoin?){
        this.isJoin = isJoin;
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.cd = 0;
        this.addPanelOpenEvent(GameEvent.client.timer,this.onE)
        this.onE();
        this.cancelBtn.visible = !this.isJoin;
    }

    public onE(){
        this.cd ++;
        if(this.isJoin)
        {
            this.desText.text = '正在加入好友对局...（'+this.cd+'）'
            if(this.cd > Math.random()*5 + 5)
            {
                this.hide();
                var type = Math.ceil(Math.random()*5)
                switch(type)
                {
                    case 1:
                        MyWindow.ShowTips('加入好友对局超时！');
                        break;
                    case 2:
                        MyWindow.ShowTips('无法找到好友对局！');
                        break;
                    case 3:
                        MyWindow.ShowTips('好友对局已被取消！');
                        break;
                    case 4:
                        MyWindow.ShowTips('加入好友对局错误！');
                        break;
                    case 5:
                        MyWindow.ShowTips('网络错误，请稍后再试！');
                        break;
                }

            }
        }
        else
        {
            this.desText.text = '正在等待好友加入游戏...（'+this.cd+'）'
            if(this.cd > 60)
            {
                this.hide();
                MyWindow.ShowTips('等待好友加入超时！')
            }
        }

    }

}