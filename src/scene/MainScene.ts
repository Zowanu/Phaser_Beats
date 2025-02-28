import { SD } from "./Static";
import { Frame, ItemPanel, Rectangle, Position, Panel_Exp, Panel_Atk, Panel_Dmy } from "./Utility";

export class MainScene extends Phaser.Scene {
    private Turn:integer = 0;
    private Tx_Turn!:Phaser.GameObjects.Text;
    private MySig!:Phaser.GameObjects.Text;
    private YoSig!:Phaser.GameObjects.Text;
    private BeatMY:boolean = true;
    private Cnt = 0;
    private MainFrame:Frame[] = [];
    private SubFrame:Frame[] = [];

    private MainPanel:ItemPanel[] = [];
    private SubPanel:ItemPanel[] = [];

    constructor() {
        // シーンのkeyを指定
        super('MainScene');
    }

    preload() {
        
    }


    create(){
        this.MySig = this.add.text(SD.BaseMargin,0, "0", {fontSize:SD.TurnFontSize, fontFamily:"GameFont", color:"White"});
        this.YoSig = this.add.text(50,0, "0", {fontSize:SD.TurnFontSize, fontFamily:"GameFont", color:"Gray"});

        this.Tx_Turn = this.add.text(SD.Display.Width - SD.TurnWidth, 0, "Turn:"+this.Turn.toString().padStart(3,"0"),
        {fontSize:SD.TurnFontSize,fontFamily:"GameFont"});
        for(let i=0;i<3;i++){
            this.MainFrame.push(new Frame(this, SD.MainPnl3[i], 1));
            this.MainFrame[i].setOnOffAlpha(0.8,0.2);
            this.MainFrame[i].setSelectChange(true);    
        }

        for(let i=0;i<SD.SubPnl.length;i++){
            this.SubFrame.push(new Frame(this, SD.SubPnl[i], 1));
            this.SubFrame[i].setOnOffAlpha(0.8,0.2);
            this.SubFrame[i].setSelectChange(true);
        }

        
        for(let i=0;i<10;i++){
            this.SubPanel.push(new Panel_Dmy(this, i, this.Pnldragend));
        }

        for(let i=0;i<3;i++){
            this.MainPanel.push(new Panel_Dmy(this, i, this.Pnldragend));
        }


        this.SubPanel[3] = new Panel_Exp(this, 3, this.Pnldragend);
        this.SubPanel[5] = new Panel_Atk(this, 5, this.Pnldragend);
        this.SubPanel[7] = new Panel_Exp(this, 7, this.Pnldragend);

        /*
        this.SubPanel.push(new Panel_Exp(this, 0, this.Pnldragend));
        this.SubPanel.push(new Panel_Atk(this, 1, this.Pnldragend));
        this.SubPanel.push(new Panel_Exp(this, 2, this.Pnldragend));
        this.SubPanel.push(new Panel_Atk(this, 3, this.Pnldragend));
        this.SubPanel.push(new Panel_Exp(this, 4, this.Pnldragend));
        this.SubPanel.push(new Panel_Atk(this, 5, this.Pnldragend));
        */




        //ビートの開始
        this.Beat();
    }

    update() {
        
    }

    init(){
        this.BeatMY = true;
    }

    CreateRectangle(R:Rectangle){

        this.add.rectangle(R.Pos.X, R.Pos.Y, R.Size.Width, R.Size.Height, 0xFFFFFF).setOrigin(0,0);

        this.RectangelOut(R);
    }
   
    RectangelOut(R:Rectangle){
        console.log("XY("+R.Pos.X.toString()+","+R.Pos.Y.toString()+") WH("+
            R.Size.Width.toString()+","+R.Size.Height.toString()+")");
    }

    private TurnMethod(){
        this.MySig.setText("0");
        this.YoSig.setText("0");
        if(this.BeatMY){
            //自ターン

            //次は敵ターンなので色を変える
            this.MySig.setColor("Gray");
            this.YoSig.setColor("White");
        }
        else{
            //敵ターン


            //次は自ターンなので色を変える
            this.MySig.setColor("White");
            this.YoSig.setColor("Gray");
            

            //全体のターンを経過
            this.Turn++;
            this.Tx_Turn.setText("Turn:"+this.Turn.toString().padStart(3,"0"));
        }
        this.BeatMY = !this.BeatMY;
        
    }

    private Beat(){
        this.Cnt++;
        if(this.Cnt==SD.BeetTurn){
            this.TurnMethod();
            this.Cnt = 0;
        } 

        if(this.BeatMY){
            this.MySig.setText(this.Cnt.toString());
        }
        else{
            this.YoSig.setText(this.Cnt.toString());
        }

        this.MainFrame.forEach(element => {
            element.setSelectChange(false);
        });
        if(this.Cnt<this.MainFrame.length)
            this.MainFrame[this.Cnt].setSelectChange(true);

        //次の呼び出し
        this.time.delayedCall(SD.BeetSpeed, ()=>  
        {  
            this.Beat();
        },[], this);  
    }


    Pnldragend(IP:ItemPanel, MC:MainScene){
        //console.log("XY("+pos_x.toString()+","+pos_y.toString()+")");
         IP.Image.setAlpha(1);

        let MainRect:Rectangle[];
        if(MC.MainFrame.length == 3){
            MainRect = SD.MainPnl3;
        }
        else{
            MainRect = SD.MainPnl4;
        }

        let subidx = MC.SubPanel.indexOf(IP);
        
        for(let i=0;i<MC.MainFrame.length;i++){
            if(MainScene.IsRectangleImageColision(MainRect[i],IP.Image)){
                //IP.setSelectChange(true);
                //IP.setPosition(MainRect[i].Pos);
                IP.setMainPChange(i);

                //メインパネルとサブパネル入れ替え
                MC.SubPanel[subidx] = MC.MainPanel[i];
                MC.MainPanel[i] = IP;    

                if(!MC.SubPanel[subidx].IsDummy)
                    MC.SubPanel[subidx].setSubPChange(subidx);
                return;
            }
        }

        IP.setSelectChange(false);
        IP.setPosition(SD.SubPnl[IP.SubPosition].Pos);       
    }

    static Image2Rect(Img:Phaser.GameObjects.Image):Rectangle{
        //console.log("Orig:"+Img.originX);
        if(Img.originX == 0)
            return new Rectangle(Img.x, Img.y, Img.width*Img.scaleX, Img.height*Img.scaleY);
        else
            return new Rectangle(Img.x - Img.width/2, Img.y - Img.height/2, Img.width*Img.scaleX, Img.height*Img.scaleY);
    }
    static Rect2CenterPos(R:Rectangle):Position{
        //console.log("RectToPos("+R.Pos.X+","+R.Pos.Y+","+R.Size.Width+","+R.Size.Height+")");
        return new Position(R.Pos.X + R.Size.Width/2, R.Pos.Y + R.Size.Height/2);
    }

    static IsRectangleImageColision(R:Rectangle,Img:Phaser.GameObjects.Image):boolean{
        return this.IsRectangleColision(R, this.Rect2CenterPos(this.Image2Rect(Img)));
    }

    static IsRectangleColision(R:Rectangle, P:Position):boolean{
        //console.log("Rect:("+R.Pos.X+","+R.Pos.Y+","+R.Size.Width+","+R.Size.Height+")");
        //console.log("Img:("+P.X+","+P.Y+")");
        return R.Pos.X<=P.X && P.X <= R.Pos.X+R.Size.Width && R.Pos.Y <= P.Y && P.Y <= R.Pos.Y + R.Size.Height; 
    }
}
