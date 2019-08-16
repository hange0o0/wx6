class SBase {
    public static getClass(id){
        switch (Math.floor(id)){
            case 1:return S1;
        }
    }

    public static getItem(id):SBase{
        var cls = this.getClass(id);
        var item = new cls();
        item.sid = id;
        return item;
    }


    public sid;




    public onMove(){

    }

    public onAtk(){

    }

    public onDie(){

    }

    public onHit(){

    }

    public onKill(){

    }

    public onUse(){

    }

    public onCreate(){

    }
}